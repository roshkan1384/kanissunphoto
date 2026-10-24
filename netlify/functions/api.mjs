import { getStore, connectLambda } from "@netlify/blobs";
import crypto from "node:crypto";

// Netlify function request/response bodies are limited to ~6 MB.
// Images are sent as base64 (+33%), so the decoded limit is kept at 4 MB.
const MAX_BYTES = 4 * 1024 * 1024;
const ID_RE = /^[a-f0-9]{16}$/;
const SUB_ID_RE = /^[a-z0-9]{1,40}$/i;
const MAIN_IDS = ["nature", "portrait", "social", "children"];
const TOKEN_HOURS = 12;

const DEFAULT_SETTINGS = {
  lang: "fa",
  about: { bio: "", background: "", approach: "", email: "photokanissun@gmail.com" },
  categories: {
    main: [
      { id: "nature", fa: "طبیعت", en: "Nature" },
      { id: "portrait", fa: "پرتره", en: "Portrait" },
      { id: "social", fa: "اجتماعی و مستند", en: "Social & Documentary" },
      { id: "children", fa: "کودک", en: "Children" }
    ],
    subs: {
      nature: [
        { id: "flowers", fa: "گل و گیاه", en: "Flowers & Plants" },
        { id: "landscape", fa: "چشم‌انداز", en: "Landscapes" },
        { id: "environment", fa: "محیط زیست", en: "Environment" },
        { id: "stilllife", fa: "طبیعت بی‌جان", en: "Still Life" },
        { id: "wildlife", fa: "حیات وحش", en: "Wildlife" }
      ],
      portrait: [
        { id: "individual", fa: "پرتره فردی", en: "Individual Portraits" },
        { id: "environmental", fa: "پرتره محیطی", en: "Environmental Portraits" },
        { id: "fineart", fa: "پرتره هنری", en: "Fine Art Portraits" },
        { id: "faces", fa: "چهره و احساسات", en: "Faces & Emotions" }
      ],
      social: [
        { id: "daily", fa: "زندگی روزمره", en: "Everyday Life" },
        { id: "culture", fa: "فرهنگ و آداب‌ورسوم", en: "Culture & Traditions" },
        { id: "rural", fa: "زندگی روستایی", en: "Rural Life" },
        { id: "urban", fa: "زندگی شهری", en: "Urban Life" },
        { id: "issues", fa: "مسائل اجتماعی", en: "Social Issues" },
        { id: "people", fa: "مشاغل و انسان‌ها", en: "People & Occupations" }
      ],
      children: [
        { id: "kidportrait", fa: "پرتره کودک", en: "Children's Portraits" },
        { id: "play", fa: "بازی و شادی", en: "Play & Joy" },
        { id: "kiddaily", fa: "زندگی روزمره کودک", en: "Children's Daily Life" },
        { id: "kidnature", fa: "کودکان و طبیعت", en: "Children & Nature" }
      ]
    }
  }
};

const store = () => getStore({ name: "kanissun", consistency: "strong" });

const reply = (statusCode, body, extraHeaders = {}) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...extraHeaders
  },
  body: JSON.stringify(body)
});

const str = (v, max = 2000) => (typeof v === "string" ? v.slice(0, max) : "");
const sanitizeStyle = st => ({
  bold: !!(st && st.bold),
  size: ["sm", "md", "lg"].includes(st && st.size) ? st.size : "md",
  align: ["start", "center", "end", "justify"].includes(st && st.align) ? st.align : "start",
  bg: /^#[0-9a-f]{6}$/i.test((st && st.bg) || "") ? st.bg : ""
});
const cleanContact = c => {
  const o = c && typeof c === "object" ? c : {};
  return Object.fromEntries(["address", "phone", "whatsapp", "instagram", "telegram", "hours"].map(k => [k, str(o[k], 300)]));
};
const cleanNews = arr => (Array.isArray(arr) ? arr : []).slice(0, 60).map(n => ({
  id: /^[a-z0-9]{4,20}$/i.test(String(n && n.id)) ? String(n.id) : crypto.randomBytes(6).toString("hex"),
  date: /^\d{4}-\d{2}-\d{2}$/.test(String(n && n.date)) ? String(n.date) : "",
  title: str(n && n.title, 200),
  place: str(n && n.place, 200),
  text: str(n && n.text, 2000),
  link: /^https?:\/\//i.test(String(n && n.link || "")) ? String(n.link).slice(0, 300) : "",
  photoId: n && ID_RE.test(String(n.photoId || "")) ? n.photoId : ""
})).filter(n => n.date && n.title);
const cleanSeries = arr => (Array.isArray(arr) ? arr : []).slice(0, 40).map(x => ({
  id: /^[a-z0-9]{3,20}$/i.test(String(x && x.id)) ? String(x.id) : crypto.randomBytes(5).toString("hex"),
  fa: str(x && x.fa, 120),
  en: str(x && x.en, 120),
  intro: str(x && x.intro, 1200)
})).filter(x => x.fa || x.en);
const onlyNums = obj => Object.fromEntries(
  Object.entries(obj && typeof obj === "object" ? obj : {})
    .filter(([, v]) => Number.isFinite(Number(v)) && Number(v) >= 60 && Number(v) <= 400)
    .map(([k, v]) => [k, Number(v)])
);
const onlyColors = obj => Object.fromEntries(
  Object.entries(obj && typeof obj === "object" ? obj : {}).filter(([, v]) => /^#[0-9a-f]{6}$/i.test(String(v)))
);
const numOr = (v, min, max) => {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : null;
};
const clamp = v => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 50;
};

/* ---------- Auth (HMAC token signed with ADMIN_PASSWORD) ---------- */
function adminSecret() {
  return process.env.ADMIN_PASSWORD || "";
}
function sign(msg) {
  return crypto.createHmac("sha256", adminSecret()).update(msg).digest("hex");
}
function safeEqual(a, b) {
  const A = Buffer.from(String(a));
  const B = Buffer.from(String(b));
  return A.length === B.length && crypto.timingSafeEqual(A, B);
}
function makeToken() {
  const exp = String(Date.now() + TOKEN_HOURS * 3600 * 1000);
  return `${exp}.${sign("admin:" + exp)}`;
}
function validToken(tok) {
  if (!tok || !adminSecret()) return false;
  const i = tok.lastIndexOf(".");
  if (i < 0) return false;
  const exp = tok.slice(0, i);
  const sig = tok.slice(i + 1);
  if (Number(exp) < Date.now()) return false;
  return safeEqual(sig, sign("admin:" + exp));
}
function isAdmin(event) {
  const h = event.headers || {};
  const auth = h.authorization || h.Authorization || "";
  return validToken(auth.replace(/^Bearer\s+/i, ""));
}
function parseBody(event) {
  try {
    return JSON.parse(event.body || "{}");
  } catch {
    return null;
  }
}

/* ---------- Data helpers ---------- */
async function getSettings() {
  const s = await store().get("settings", { type: "json" });
  if (!s) return structuredClone(DEFAULT_SETTINGS);
  return {
    ...structuredClone(DEFAULT_SETTINGS),
    ...s,
    about: { ...DEFAULT_SETTINGS.about, ...(s.about || {}) },
    categories: s.categories || structuredClone(DEFAULT_SETTINGS.categories)
  };
}

function sanitizeMeta(m) {
  const pair = v => ({ fa: str(v?.fa, 300), en: str(v?.en, 300) });
  return {
    id: m.id,
    title: pair(m.title),
    desc: { fa: str(m.desc?.fa, 3000), en: str(m.desc?.en, 3000) },
    keywords: str(m.keywords, 500),
    mainId: MAIN_IDS.includes(m.mainId) ? m.mainId : "nature",
    subId: m.subId && SUB_ID_RE.test(String(m.subId)) ? String(m.subId) : null,
    featured: !!m.featured,
    crop: { x: clamp(m.crop?.x), y: clamp(m.crop?.y) },
    license: str(m.license, 500),
    shape: m.type === "text" ? "text" : (m.shape === "portrait" ? "portrait" : "landscape"),
    type: m.type === "text" ? "text" : "photo",
    text: str(m.text, 5000),
    caption: str(m.caption, 300),
    hidden: !!m.hidden,
    name: str(m.name, 200),
    release: !!m.release,
    series: /^[a-z0-9]{1,20}$/i.test(String(m.series || "")) ? String(m.series) : "",
    keywordsEn: str(m.keywordsEn, 500),
    page: Math.max(1, Math.min(200, Math.round(Number(m.page) || 1))),
    hash: str(m.hash, 100),
    style: sanitizeStyle(m.style),
    x: numOr(m.x, 0, 100),
    y: numOr(m.y, 0, 100000),
    w: numOr(m.w, 5, 100),
    ratio: numOr(m.ratio, 0.2, 5),
    createdAt: Number(m.createdAt) || Date.now(),
    order: Number.isFinite(Number(m.order)) ? Number(m.order) : (Number(m.createdAt) || Date.now())
  };
}

function sanitizeCategories(c) {
  const main = MAIN_IDS.map(id => {
    const found = (c.main || []).find(m => m.id === id) || {};
    return { id, fa: str(found.fa, 120) || id, en: str(found.en, 120) || id };
  });
  const subs = {};
  for (const id of MAIN_IDS) {
    const list = Array.isArray(c.subs?.[id]) ? c.subs[id] : [];
    subs[id] = list
      .filter(s => s && SUB_ID_RE.test(String(s.id)))
      .map(s => ({ id: String(s.id), fa: str(s.fa, 120) || s.id, en: str(s.en, 120) || s.id }));
  }
  return { main, subs };
}

/* ---------- Actions ---------- */
async function publicData(admin) {
  const settings = await getSettings();
  const list = await store().list({ prefix: "meta/" });
  const photos = (
    await Promise.all(list.blobs.map(b => store().get(b.key, { type: "json" })))
  ).filter(Boolean).filter(p => admin || !p.hidden);
  return reply(200, { settings, photos });
}

async function getImage(id, trash = false, admin = false, thumb = false) {
  if (!ID_RE.test(id || "")) return reply(400, { error: "bad id" });
  if (trash && !admin) return reply(404, { error: "not found" });
  if (!admin) {
    const meta = await store().get(`meta/${id}`, { type: "json" });
    if (meta && meta.hidden) return reply(404, { error: "not found" });
  }
  let r = thumb && !trash ? await store().getWithMetadata(`thumb/${id}`, { type: "arrayBuffer" }) : null;
  if (!r) r = await store().getWithMetadata(`${trash ? "trash-img" : "img"}/${id}`, { type: "arrayBuffer" });
  if (!r) return reply(404, { error: "not found" });
  return {
    statusCode: 200,
    headers: {
      "Content-Type": r.metadata?.mime || "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable"
    },
    body: Buffer.from(r.data).toString("base64"),
    isBase64Encoded: true
  };
}

function login(body) {
  if (!adminSecret()) return reply(500, { error: "ADMIN_PASSWORD is not configured" });
  if (!body || typeof body.password !== "string") return reply(400, { error: "bad request" });
  if (!safeEqual(body.password, adminSecret())) return reply(401, { error: "wrong password" });
  return reply(200, { token: makeToken() });
}

async function saveSettings(body) {
  const s = body && body.settings;
  if (!s || typeof s !== "object") return reply(400, { error: "bad settings" });
  const clean = {
    lang: s.lang === "en" ? "en" : "fa",
    about: {
      bio: str(s.about?.bio, 20000),
      background: str(s.about?.background, 20000),
      approach: str(s.about?.approach, 20000),
      email: str(s.about?.email, 200) || "photokanissun@gmail.com",
      photoId: ID_RE.test(s.about?.photoId || "") ? s.about.photoId : "",
      align: ["start", "center", "end", "justify"].includes(s.about?.align) ? s.about.align : "start",
      stats: (Array.isArray(s.about && s.about.stats) ? s.about.stats : []).slice(0, 4).map(x => ({ value: str(x && x.value, 20), label: str(x && x.label, 80), text: str(x && x.text, 300) })).filter(x => x.value || x.label)
    },
    categories: sanitizeCategories(s.categories || {}),
    layouts: s.layouts && typeof s.layouts === "object" ? s.layouts : {},
    hidden: s.hidden && typeof s.hidden === "object" ? Object.fromEntries(Object.entries(s.hidden).filter(([, v]) => v === true)) : {},
    bgs: onlyColors(s.bgs),
    contact: cleanContact(s.contact),
    news: cleanNews(s.news),
    series: cleanSeries(s.series),
    tilePhotos: Object.fromEntries(Object.entries(s.tilePhotos && typeof s.tilePhotos === "object" ? s.tilePhotos : {}).filter(([k, v]) => /^[a-z]+$/.test(k) && ID_RE.test(String(v)))),
    tiles: Array.isArray(s.tiles) ? s.tiles.filter(x => ["nature", "portrait", "social", "children", "home", "about"].includes(x)).slice(0, 12) : undefined,
    pageH: onlyNums(s.pageH),
    watermark: s.watermark !== false,
    pagesN: Object.fromEntries(Object.entries(s.pagesN && typeof s.pagesN === "object" ? s.pagesN : {}).filter(([, v]) => Number.isInteger(v) && v >= 1 && v <= 50)),
    hero: {
      eyebrow: str(s.hero && s.hero.eyebrow, 200),
      title: str(s.hero && s.hero.title, 200),
      text: str(s.hero && s.hero.text, 1000),
      photoIds: Array.isArray(s.hero && s.hero.photoIds) ? s.hero.photoIds.filter(x => ID_RE.test(String(x))).slice(0, 4) : [],
      align: ["start", "center", "end"].includes(s.hero && s.hero.align) ? s.hero.align : "start"
    }
  };
  await store().set("settings", JSON.stringify(clean));
  return reply(200, { ok: true, settings: clean });
}

async function uploadPhoto(body) {
  if (
    !body ||
    !ID_RE.test(body.id || "") ||
    typeof body.data !== "string" ||
    typeof body.mime !== "string" ||
    !body.mime.startsWith("image/") ||
    !body.meta
  ) {
    return reply(400, { error: "bad request" });
  }
  const buf = Buffer.from(body.data, "base64");
  if (buf.length === 0) return reply(400, { error: "empty file" });
  if (buf.length > MAX_BYTES) return reply(413, { error: "file too large (max 4 MB after resize)" });
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  await store().set(`img/${body.id}`, ab, { metadata: { mime: body.mime } });
  if (typeof body.thumb === "string" && body.thumb) {
    const tb = Buffer.from(body.thumb, "base64");
    const tab = tb.buffer.slice(tb.byteOffset, tb.byteOffset + tb.byteLength);
    await store().set(`thumb/${body.id}`, tab, { metadata: { mime: body.thumbMime || "image/webp" } });
  }
  const meta = sanitizeMeta({ ...body.meta, id: body.id });
  await store().set(`meta/${body.id}`, JSON.stringify(meta));
  return reply(200, { ok: true, photo: meta });
}

async function updatePhoto(body) {
  if (!body || !ID_RE.test(body.id || "")) return reply(400, { error: "bad request" });
  const cur = await store().get(`meta/${body.id}`, { type: "json" });
  if (!cur) return reply(404, { error: "photo not found" });
  const meta = sanitizeMeta({
    ...cur,
    ...(body.meta || {}),
    id: body.id,
    createdAt: cur.createdAt,
    shape: cur.shape
  });
  await store().set(`meta/${body.id}`, JSON.stringify(meta));
  return reply(200, { ok: true, photo: meta });
}

async function deletePhoto(body) {
  if (!body || !ID_RE.test(body.id || "")) return reply(400, { error: "bad request" });
  const id = body.id;
  const meta = await store().get(`meta/${id}`, { type: "json" });
  if (meta) {
    const img = await store().getWithMetadata(`img/${id}`, { type: "arrayBuffer" });
    await store().set(`trash-meta/${id}`, JSON.stringify({ ...meta, deletedAt: Date.now() }));
    if (img) await store().set(`trash-img/${id}`, img.data, { metadata: img.metadata || {} });
  }
  await store().delete(`img/${id}`);
  await store().delete(`thumb/${id}`);
  await store().delete(`meta/${id}`);
  return reply(200, { ok: true });
}

async function listTrash() {
  const l = await store().list({ prefix: "trash-meta/" });
  const items = (await Promise.all(l.blobs.map(b => store().get(b.key, { type: "json" }))))
    .filter(Boolean)
    .sort((x, y) => (y.deletedAt || 0) - (x.deletedAt || 0));
  return reply(200, { items });
}

async function restoreTrash(body) {
  if (!body || !ID_RE.test(body.id || "")) return reply(400, { error: "bad request" });
  const id = body.id;
  const meta = await store().get(`trash-meta/${id}`, { type: "json" });
  if (!meta) return reply(404, { error: "not in trash" });
  const img = await store().getWithMetadata(`trash-img/${id}`, { type: "arrayBuffer" });
  const clean = { ...meta };
  delete clean.deletedAt;
  if (img) await store().set(`img/${id}`, img.data, { metadata: img.metadata || {} });
  await store().set(`meta/${id}`, JSON.stringify(clean));
  await store().delete(`trash-img/${id}`);
  await store().delete(`trash-meta/${id}`);
  return reply(200, { ok: true, photo: clean });
}

async function purgeTrash(body) {
  if (!body || !ID_RE.test(body.id || "")) return reply(400, { error: "bad request" });
  await store().delete(`trash-img/${body.id}`);
  await store().delete(`trash-meta/${body.id}`);
  return reply(200, { ok: true });
}

async function emptyTrash() {
  const l = await store().list({ prefix: "trash-meta/" });
  for (const b of l.blobs) {
    const id = b.key.replace("trash-meta/", "");
    await store().delete(`trash-img/${id}`);
    await store().delete(`trash-meta/${id}`);
  }
  return reply(200, { ok: true });
}

async function loginLimited(body, event) {
  const h = event.headers || {};
  const ip = String(h["x-nf-client-connection-ip"] || h["x-forwarded-for"] || "unknown").split(",")[0].trim();
  const key = `attempts/${crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32)}`;
  const WINDOW = 15 * 60 * 1000;
  let rec = (await store().get(key, { type: "json" })) || { n: 0, t: Date.now() };
  if (Date.now() - rec.t > WINDOW) rec = { n: 0, t: Date.now() };
  if (rec.n >= 5) return reply(429, { error: "too many attempts, try again later" });
  const res = login(body);
  if (res.statusCode === 200) await store().delete(key);
  else await store().set(key, JSON.stringify(rec.n === 0 ? { n: 1, t: rec.t } : { n: rec.n + 1, t: rec.t }));
  return res;
}

async function translateText(body) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return reply(503, { error: "translation is not configured on the server" });
  const text = str(body && body.text, 2000);
  if (!text) return reply(400, { error: "empty text" });
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-haiku-5-5",
      max_tokens: 600,
      system: "Translate the user's Persian text into natural, poetic English. Keep the first-person voice and the meaning. Return only the translation, nothing else.",
      messages: [{ role: "user", content: text }]
    })
  });
  if (!r.ok) return reply(502, { error: "translation failed" });
  const j = await r.json();
  const out = (j.content || []).filter(x => x.type === "text").map(x => x.text).join("").trim();
  return reply(200, { text: out });
}

/* ---------- Router ---------- */
 connectLambda(event);
  const q = event.queryStringParameters || {};
  const action = q.action;
  const method = event.httpMethod;
  try {
    if (method === "GET" && action === "public") return await publicData(isAdmin(event));
    if (method === "GET" && action === "image") return await getImage(q.id, q.trash === "1", isAdmin(event), q.size === "thumb");
    if (method !== "POST") return reply(405, { error: "method not allowed" });

    const body = parseBody(event);
    if (body === null) return reply(400, { error: "invalid json" });

    if (action === "login") return await loginLimited(body, event);
    if (action === "translate") return isAdmin(event) ? await translateText(body) : reply(401, { error: "unauthorized" });

    if (!isAdmin(event)) return reply(401, { error: "unauthorized" });

    switch (action) {
      case "saveSettings": return await saveSettings(body);
      case "uploadPhoto": return await uploadPhoto(body);
      case "createText": return await createText(body);
      case "listTrash": return await listTrash();
      case "restoreTrash": return await restoreTrash(body);
      case "purgeTrash": return await purgeTrash(body);
      case "emptyTrash": return await emptyTrash();
      case "updatePhoto": return await updatePhoto(body);
      case "deletePhoto": return await deletePhoto(body);
      default: return reply(404, { error: "unknown action" });
    }
  } catch (e) {
    console.error("API ERROR", action, e && e.stack ? e.stack : e);
    return reply(500, { error: "server error", action, detail: String(e && e.message ? e.message : e).slice(0, 300) });
  }
};
