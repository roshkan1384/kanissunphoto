(() => {
"use strict";

const API = "/.netlify/functions/api";
const MAIN_IDS = ["nature", "portrait", "social", "children", "latest"];
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- UI strings ---------- */
const UI = {
  fa: {
    home: "خانه", about: "درباره من", contact: "استعلام لایسنس", admin: "مدیریت", langBtn: "English",
    eyebrow: "عکاسی حرفه‌ای",
    heroText: "نور، طبیعت، انسان و احساسی که جان می‌گیرد، و عکسی که خاطره‌انگیز می‌شود.",
    explore: "مشاهده آثار", license: "استعلام لایسنس", featured: "آثار منتخب", categories: "دسته‌بندی‌ها",
    subs: "زیرمجموعه", viewAll: "همه آثار", noPhotos: "هنوز عکسی منتشر نشده است.",
    noPhotosHere: "در این بخش هنوز عکسی وجود ندارد.", featuredTag: "شاخص", untitled: "بدون عنوان",
    aboutShort: "درباره من", aboutShortText: "من عکاسی هستم که با نگاهی مستند و هنری، لحظه‌های واقعی انسان و طبیعت را ثبت می‌کنم.",
    aboutEmpty: "متن معرفی را از بخش مدیریت بنویسید.", background: "پیشینه عکاسی", approach: "رویکرد هنری", email: "ایمیل",
    inquire: "استعلام این عکس", contactTitle: "استعلام و لایسنس عکس",
    contactIntro: "برای خرید، لایسنس شخصی، رسانه‌ای یا تجاری، فرم زیر را کامل کنید.",
    fName: "نام و نام خانوادگی", fEmail: "ایمیل", fUse: "نوع استفاده", fPhoto: "عکس مورد نظر", fMsg: "پیام",
    send: "ارسال از طریق ایمیل", inqNote: "این فرم پیام را در برنامه ایمیل شما آماده می‌کند. سایت پیامی را ذخیره یا ارسال نمی‌کند.",
    useNone: "انتخاب کنید", usePersonal: "شخصی", useCommercial: "تجاری", usePress: "رسانه و انتشار", useCustom: "لایسنس اختصاصی",
    noPhotoOpt: "— انتخاب نشده —", reqErr: "این فیلد الزامی است.", emailErr: "ایمیل معتبر وارد کنید.", msgErr: "پیام باید حداقل ۱۰ کاراکتر باشد.",
    mailOpened: "برنامه ایمیل شما باز شد. اگر باز نشد، مستقیم به آدرس ایمیل سایت پیام بدهید.",
    password: "رمز ورود مدیر", login: "ورود", wrongPw: "رمز ورود اشتباه است یا خطایی رخ داده است.", logout: "خروج",
    tabPhotos: "عکس‌ها", tabCats: "دسته‌ها و متن‌ها",
    uploadTitle: "آپلود عکس", upHint: "عکس‌ها در همین دسته و زیرمجموعه ثبت می‌شوند. بزرگ‌تر از ۲۴۰۰ پیکسل به‌طور خودکار کوچک می‌شوند.",
    upTarget: "دسته مقصد", upSub: "زیرمجموعه مقصد", noSub: "بدون زیرمجموعه", uploading: "در حال آپلود", uploadOk: "عکس‌ها ذخیره شدند.",
    filter: "نمایش", allCats: "همه دسته‌ها", photosCount: "عکس",
    titleFa: "عنوان (فارسی)", titleEn: "Title (English)", descFa: "توضیح (فارسی)", keywords: "کلیدواژه‌ها (با کاما)",
    featuredLbl: "عکس شاخص", cropX: "موقعیت افقی", cropY: "موقعیت عمودی", licensePh: "شرایط لایسنس",
    save: "ذخیره", replace: "جایگزینی", remove: "حذف", confirmDel: "این عکس حذف شود؟", saved: "ذخیره شد.", err: "خطا رخ داد.",
    catHead: "دسته‌ها و زیرمجموعه‌ها", addSub: "افزودن زیرمجموعه", addBtn: "افزودن", up: "بالا", down: "پایین",
    rename: "تغییر نام", del: "حذف", noSubs: "زیرمجموعه‌ای تعریف نشده است.",
    confirmSub: "این زیرمجموعه حذف شود؟ عکس‌های داخل آن بدون زیرمجموعه می‌شوند.",
    nameFa: "نام فارسی:", nameEn: "English name:", nsFa: "نام فارسی", nsEn: "English name",
    textsHead: "متن‌های سایت", bio: "زندگی‌نامه کوتاه", bgLabel: "پیشینه عکاسی", apLabel: "رویکرد هنری", emLabel: "ایمیل تماس",
    saveTexts: "ذخیره متن‌ها", loadErr: "بارگذاری سایت ممکن نشد. اتصال اینترنت یا تنظیمات Netlify را بررسی کنید.",
    footer: "© KanissunPhoto — تمامی حقوق محفوظ است.",
    intro_nature: "طبیعت را با آرامش و دقت ثبت می‌کنم؛ از گل‌های کوچک تا چشم‌اندازهای بزرگ.",
    intro_portrait: "چهره‌ها و شخصیت‌ها، در نور طبیعی و فضایی که به آن‌ها تعلق دارد.",
    intro_social: "لحظه‌های واقعی زندگی مردم، با نگاهی مستند و بی‌تکلف.",
    intro_children: "کودکی، بازی و شادی؛ لحظه‌هایی که زود می‌گذرند.",
    reorderStart: "ویرایش ترتیب عکس‌ها", reorderDone: "پایان ویرایش ترتیب", reorderHint: "عکس‌ها را بکشید و روی عکسی از همان زیرمجموعه رها کنید.",
    sure: "تأیید حذف؟", trBtn: "ترجمه خودکار", trFail: "ترجمه انجام نشد. کلید ترجمه روی سرور تنظیم نشده یا اتصال برقرار نیست.", csvShown: "فهرست ساخته شد. اگر فایل دانلود نشد، متن زیر را کپی کنید.", csvCopyHint: "متن زیر را انتخاب و کپی کنید، در Notepad بچسبانید و با پسوند csv ذخیره کنید.", csvHead: "عنوان و کپشن گروهی", csvExport: "خروجی فهرست عکس‌ها (CSV)", csvImport: "ورود فهرست (CSV)", csvDone: "فهرست وارد شد", csvBad: "فایل CSV معتبر نیست", csvHint: "فهرست را دانلود کنید، عنوان و کپشن را در Excel یا Google Sheets تکمیل کنید و دوباره وارد کنید. ستون id را تغییر ندهید.", descEn: "توضیح انگلیسی", keywordsEn: "کلیدواژه‌های انگلیسی (با کاما)", releaseLbl: "رضایت‌نامه (model/guardian release) دارد", relNote: "عکس‌هایی که چهره‌ی کودکان یا افراد را نشان می‌دهند، فقط با رضایت‌نامه‌ی کتبی برای استفاده‌ی تجاری و رسانه‌ای عرضه می‌شوند.", relMissing: "برای این عکس رضایت‌نامه ثبت نشده است؛ استفاده‌ی تجاری یا رسانه‌ای ممکن نیست.", seriesHead: "مجموعه‌ها", seriesAdd: "افزودن مجموعه", seriesIntroLbl: "متن معرفی مجموعه", seriesNone: "بدون مجموعه", copyLink: "کپی لینک عکس", copied: "لینک کپی شد", moreTiles: "بخش‌های دیگر", autoLbl: "خودکار", tilePhotoLbl: "عکس کاشی", statsHead: "ارقام و کارنامه", statValPh: "مثلاً ۵۰۰۰+", statLabelPh: "عنوان کوتاه", statTextPh: "توضیح کوتاه (اختیاری)", newsTitle: "تازه‌ها", newsIntro: "رویدادها، کارگاه‌ها و نمایشگاه‌های پیش‌رو.", newsEmpty: "فعلاً رویدادی برای نمایش نیست.", newsPast: "گذشته", newsPastHead: "رویدادهای گذشته", newsMore: "جزئیات بیشتر", newsAdd: "افزودن رویداد", newsHead: "تازه‌ها و رویدادها", newsTitleLbl: "عنوان رویداد", newsPlace: "مکان", newsText: "شرح رویداد", newsLink: "لینک جزئیات (با https://)", tileNewsSub: "رویدادهای پیش‌رو", hiddenLbl: "مخفی از بازدیدکنندگان", subFilter: "زیرمجموعه", allSubs: "همه زیرمجموعه‌ها", tileHead: "کاشی‌های صفحه اصلی", tileNote: "کاشی‌ها در بخش دسته‌بندی صفحه اصلی نمایش داده می‌شوند. هر کاشی را می‌توانید به یک دسته یا صفحه تغییر دهید.", tileAdd: "افزودن کاشی", tileHomeSub: "نگاهی کلی به کارها", tileAboutSub: "معرفی و زندگی‌نامه", ctaTitle: "آماده همکاری هستید؟", ctaSub: "از طبیعت تا لحظه‌های انسانی، هر جا که نور و احساس باشد.", ctaBtn: "تماس با من", contactHead: "ارتباط با ما", addrHead: "آدرس", hoursHead: "ساعات تماس", socialHead: "شبکه‌ها", phoneLbl: "تلفن", whatsLbl: "واتساپ (شماره با کد کشور، مثل 98912...)", instaLbl: "لینک اینستاگرام", teleLbl: "لینک تلگرام", contactFieldsLbl: "اطلاعات تماس (در پایین همه صفحه‌ها نمایش داده می‌شود)", readMore: "بیشتر درباره من", alignLbl: "تراز متن", align_justify: "دو طرفه", aboutPhotoLbl: "عکس صفحه درباره من", mobileHint: "روی گوشی: با دکمه‌های ↑ ↓ ترتیب را عوض کنید و برای ویرایش عنوان و توضیح، روی عکس بزنید.", trashHead: "سطل بازیافت", trashShow: "نمایش سطل بازیافت", trashEmpty: "سطل بازیافت خالی است.", restoreItem: "بازیابی", purgeItem: "حذف برای همیشه", emptyTrash: "خالی کردن سطل", textLbl: "متن", trashDone: "به عکس‌ها برگشت", backupHead: "پشتیبان‌گیری و بازیابی", backupBtn: "دانلود پشتیبان", chooseBackup: "انتخاب فایل پشتیبان", restoreHint: "بازیابی همه داده‌های فعلی (عکس‌ها، متن‌ها و تنظیمات) را با محتوای فایل پشتیبان جایگزین می‌کند.", restoreGo: "تأیید بازیابی (جایگزینی همه داده‌ها)", restoreDone: "بازیابی انجام شد", backupMade: "فایل پشتیبان ساخته شد", backupBad: "فایل پشتیبان معتبر نیست", close: "بستن", wmLbl: "نمایش واترمارک شیشه‌ای کم‌رنگ وسط عکس‌ها", smartLayout: "چیدمان هوشمند", smartDone: "چیدمان هوشمند اعمال شد", rowsLbl: "ردیف", pageLbl: "صفحه", applyTpl: "اعمال قالب", addPage: "افزودن صفحه", tpl_single: "یک عکس بزرگ", tpl_two: "دو عکس", tpl_three: "سه عکس", tpl_four: "چهار عکس (دو ردیف)", tpl_bigTwo: "یک بزرگ و دو کوچک", tpl_textPhoto: "متن و عکس", pageHLbl: "ارتفاع صفحه (٪ از عرض)", pageHOn: "محدودیت ارتفاع فعال", pageWarn: "{n} مورد بیرون از صفحه است", deleteSub: "حذف این زیرمجموعه", deleteAll: "حذف همه عکس‌ها", deletedAll: "همه عکس‌ها حذف شدند", dupLbl: "تکراری (نادیده گرفته شد)", folderTitle: "آپلود فولدر اصلی", folderHint: "فولدر اصلی را انتخاب کنید. زیرفولدرها باید با نام دسته‌ها یا زیرمجموعه‌ها (فارسی یا انگلیسی) یکی باشند. هر نامی که تطبیق نشود، در پیام نهایی نشان داده می‌شود.", noImages: "هیچ عکسی در این فولدر پیدا نشد.", folderDone: "آپلود فولدر تمام شد", unknownFolders: "نام‌های تطبیق‌نشده", heroEyebrowLbl: "عنوان کوچک بالای هیرو", heroTitleLbl: "عنوان اصلی", heroTextLbl: "متن معرفی", heroPhotoLbl: "عکس‌های اسلایدشو (حداکثر ۴ عکس افقی)",
    undo: "بازگشت", undone: "تغییر برگشت داده شد.", nothingUndo: "چیزی برای بازگشت نیست.", bgColor: "رنگ پس‌زمینه",
    hidePublic: "پنهان از بازدیدکنندگان", showPublic: "نمایش به بازدیدکنندگان", comingSoon: "این بخش به زودی منتشر می‌شود.",
    captionPh: "کپشن زیر عکس", size_sm: "کوچک", size_md: "متوسط", size_lg: "بزرگ", align_start: "شروع", align_center: "وسط", align_end: "پایان",
    boxColor: "رنگ کادر", linkHint: "برای لینک بنویسید: [متن](https://...)", freeHint: "برای نوشتن در هر جا، روی فضای خالی صفحه کلیک کنید.",
    layoutFree: "چیدمان آزاد", layoutGrid: "چیدمان شبکه‌ای",
    editStart: "ویرایش صفحه", editDone: "پایان ویرایش", addPhotos: "افزودن عکس", dragLabel: "جابه‌جایی",
    editHint: "متن‌ها را مستقیم بنویسید. با گرفتن ⠿ یا عکس، ترتیب را عوض کنید.",
    addText: "افزودن متن", addTextHint: "متن بین عکس‌ها قرار می‌گیرد و مثل عکس قابل جابه‌جایی است.", textPh: "نوشته را اینجا بنویسید…",
    position: "موقعیت", dragHint: "برای تغییر ترتیب، تصویر عکس را بگیرید و روی عکس دیگری از همان زیرمجموعه رها کنید. در موبایل از دکمه‌های ↑ ↓ استفاده کنید."
  },
  en: {
    home: "Home", about: "About Me", contact: "Licensing", admin: "Manage", langBtn: "فارسی",
    eyebrow: "Professional Photography",
    heroText: "Light, nature, people, and a feeling that comes alive, and a photograph that becomes a memory.",
    explore: "View Work", license: "Request a License", featured: "Selected Work", categories: "Categories",
    subs: "subcategories", viewAll: "All work", noPhotos: "No photos published yet.",
    noPhotosHere: "There are no photos in this section yet.", featuredTag: "Featured", untitled: "Untitled",
    aboutShort: "About Me", aboutShortText: "I am a photographer working with a documentary and artistic eye, capturing real human and natural moments.",
    aboutEmpty: "Write your introduction in the Manage section.", background: "Photography Background", approach: "Artistic Approach", email: "Email",
    inquire: "Inquire about this photo", contactTitle: "Photo Licensing & Inquiries",
    contactIntro: "To purchase or license a photograph for personal, commercial, or media use, complete the form below.",
    fName: "Full name", fEmail: "Email", fUse: "Intended use", fPhoto: "Photograph of interest", fMsg: "Message",
    send: "Open in Email", inqNote: "This form prepares your message in your email app. The website does not store or send it.",
    useNone: "Select an option", usePersonal: "Personal", useCommercial: "Commercial", usePress: "Publication & media", useCustom: "Custom license",
    noPhotoOpt: "— none selected —", reqErr: "This field is required.", emailErr: "Enter a valid email address.", msgErr: "Message must be at least 10 characters.",
    mailOpened: "Your email app was opened. If it did not open, please write to the email address shown on this site.",
    password: "Manager password", login: "Log in", wrongPw: "Wrong password or a server error occurred.", logout: "Log out",
    tabPhotos: "Photos", tabCats: "Categories & Text",
    uploadTitle: "Upload Photos", upHint: "Photos are saved to the selected category and subcategory. Images larger than 2400 px are resized automatically.",
    upTarget: "Target category", upSub: "Target subcategory", noSub: "No subcategory", uploading: "Uploading", uploadOk: "Photos saved.",
    filter: "Show", allCats: "All categories", photosCount: "photos",
    titleFa: "Persian title", titleEn: "Title (English)", descFa: "Description (Persian)", keywords: "Keywords (comma separated)",
    featuredLbl: "Featured photo", cropX: "Horizontal position", cropY: "Vertical position", licensePh: "License terms",
    save: "Save", replace: "Replace", remove: "Remove", confirmDel: "Remove this photo?", saved: "Saved.", err: "Something went wrong.",
    catHead: "Categories & Subcategories", addSub: "Add subcategory", addBtn: "Add", up: "Up", down: "Down",
    rename: "Rename", del: "Delete", noSubs: "No subcategories defined.",
    confirmSub: "Delete this subcategory? Photos inside it will become unassigned.",
    nameFa: "Persian name:", nameEn: "English name:", nsFa: "Persian name", nsEn: "English name",
    textsHead: "Website text", bio: "Short biography", bgLabel: "Photography background", apLabel: "Artistic approach", emLabel: "Contact email",
    saveTexts: "Save text", loadErr: "The site could not be loaded. Check your internet connection or the Netlify settings.",
    footer: "© KanissunPhoto — All rights reserved.",
    intro_nature: "I photograph nature with patience and care, from small blossoms to wide landscapes.",
    intro_portrait: "Faces and personalities, in natural light and in the spaces that belong to them.",
    intro_social: "Real moments of everyday life, seen with a documentary and unpretentious eye.",
    intro_children: "Childhood, play and joy: moments that pass quickly.",
    reorderStart: "Reorder photos", reorderDone: "Finish reordering", reorderHint: "Drag a photo onto another photo in the same subcategory.",
    sure: "Confirm delete?", trBtn: "Translate automatically", trFail: "Translation failed. Check that the translation key is set on the server.", csvShown: "The list is ready. If the file did not download, copy the text below.", csvCopyHint: "Select and copy the text below, paste it into Notepad and save it with the .csv extension.", csvHead: "Bulk titles and captions", csvExport: "Export photo list (CSV)", csvImport: "Import list (CSV)", csvDone: "List imported", csvBad: "The CSV file is not valid", csvHint: "Download the list, fill in titles and captions in Excel or Google Sheets, then import it again. Do not change the id column.", descEn: "English description", keywordsEn: "English keywords (comma separated)", releaseLbl: "Model / guardian release on file", relNote: "Photos showing children or identifiable people are offered for commercial and media use only with a signed release.", relMissing: "No release is on file for this photo; commercial or media use is not possible.", seriesHead: "Series", seriesAdd: "Add series", seriesIntroLbl: "Series introduction", seriesNone: "No series", copyLink: "Copy photo link", copied: "Link copied", moreTiles: "More sections", autoLbl: "Automatic", tilePhotoLbl: "Tile photo", statsHead: "Figures and track record", statValPh: "e.g. 5000+", statLabelPh: "Short title", statTextPh: "Short description (optional)", newsTitle: "Events", newsIntro: "Upcoming events, workshops and exhibitions.", newsEmpty: "There are no events to show yet.", newsPast: "Past", newsPastHead: "Past events", newsMore: "More details", newsAdd: "Add event", newsHead: "Events and news", newsTitleLbl: "Event title", newsPlace: "Place", newsText: "Description", newsLink: "Details link (with https://)", tileNewsSub: "Upcoming events", hiddenLbl: "Hidden from visitors", subFilter: "Subcategory", allSubs: "All subcategories", tileHead: "Home page tiles", tileNote: "Tiles appear in the categories section of the home page. Each tile can point to a category or a page.", tileAdd: "Add tile", tileHomeSub: "An overview of the work", tileAboutSub: "About and biography", ctaTitle: "Ready to work together?", ctaSub: "Nature, people and moments, wherever light and feeling are.", ctaBtn: "Contact me", contactHead: "Contact", addrHead: "Address", hoursHead: "Hours", socialHead: "Follow", phoneLbl: "Phone", whatsLbl: "WhatsApp (number with country code)", instaLbl: "Instagram link", teleLbl: "Telegram link", contactFieldsLbl: "Contact details (shown at the bottom of every page)", readMore: "More about me", alignLbl: "Text alignment", align_justify: "Justified", aboutPhotoLbl: "Photo for the About page", mobileHint: "On phones: use ↑ ↓ to reorder, and tap a photo to edit its title and description.", trashHead: "Recycle bin", trashShow: "Show recycle bin", trashEmpty: "The recycle bin is empty.", restoreItem: "Restore", purgeItem: "Delete forever", emptyTrash: "Empty bin", textLbl: "Text", trashDone: "Restored", backupHead: "Backup and restore", backupBtn: "Download backup", chooseBackup: "Choose backup file", restoreHint: "Restoring replaces all current data (photos, texts and settings) with the backup file.", restoreGo: "Confirm restore (replace all data)", restoreDone: "Restore finished", backupMade: "Backup file created", backupBad: "The backup file is not valid", close: "Close", wmLbl: "Show a faint glass watermark in the middle of photos", smartLayout: "Smart layout", smartDone: "Smart layout applied", rowsLbl: "rows", pageLbl: "Page", applyTpl: "Apply layout", addPage: "Add page", tpl_single: "One large photo", tpl_two: "Two photos", tpl_three: "Three photos", tpl_four: "Four photos (2 rows)", tpl_bigTwo: "One large and two small", tpl_textPhoto: "Text and photo", pageHLbl: "Page height (% of width)", pageHOn: "Limit page height", pageWarn: "{n} item(s) outside the page", deleteSub: "Delete this subcategory", deleteAll: "Delete all photos", deletedAll: "All photos were deleted", dupLbl: "duplicate (skipped)", folderTitle: "Upload main folder", folderHint: "Choose the main folder. Sub-folders must match category or subcategory names (Persian or English). Any unmatched name is listed after the upload.", noImages: "No images found in this folder.", folderDone: "Folder upload finished", unknownFolders: "Unmatched names", heroEyebrowLbl: "Small title above hero", heroTitleLbl: "Main title", heroTextLbl: "Intro text", heroPhotoLbl: "Slideshow photos (up to 4 landscape)",
    undo: "Undo", undone: "Change undone.", nothingUndo: "Nothing to undo.", bgColor: "Background color",
    hidePublic: "Hide from visitors", showPublic: "Show to visitors", comingSoon: "This section is coming soon.",
    captionPh: "Caption under photo", size_sm: "Small", size_md: "Medium", size_lg: "Large", align_start: "Start", align_center: "Center", align_end: "End",
    boxColor: "Box color", linkHint: "For a link write: [text](https://...)", freeHint: "To write anywhere, click an empty spot on the page.",
    layoutFree: "Free layout", layoutGrid: "Grid layout",
    editStart: "Edit page", editDone: "Finish editing", addPhotos: "Add photos", dragLabel: "Move",
    editHint: "Write text directly. Drag ⠿ or a photo to change the order.",
    addText: "Add text", addTextHint: "Text appears between photos and can be moved like a photo.", textPh: "Write your text here…",
    position: "Position", dragHint: "To reorder, drag a photo's image onto another photo in the same subcategory. On mobile, use the ↑ ↓ buttons."
  }
};

/* ---------- State ---------- */
let S = null;                       // settings
let P = [];                         // photos (meta)
let lang = localStorage.getItem("kp-lang") || "fa";
let token = sessionStorage.getItem("kp-token") || "";
let route = { name: "home" };
let pendingPhoto = "";
let reorderMode = false;
let focusId = null;
let armed = null, armTimer = null, renaming = null;
const delLabel = key => (armed === key ? t("sure") : t("remove"));
const undoStack = [];
function recordUndo(body) {
  const p = P.find(x => x.id === body.id);
  if (!p || !body.meta) return;
  const before = {};
  Object.keys(body.meta).forEach(k => { before[k] = JSON.parse(JSON.stringify(p[k] === undefined ? null : p[k])); });
  undoStack.push({ id: body.id, before });
  if (undoStack.length > 40) undoStack.shift();
}
async function undo() {
  const u = undoStack.pop();
  if (!u) { ad.msg = t("nothingUndo"); ad.kind = "bad"; render(); return; }
  const r = await api("updatePhoto", { method: "POST", body: { id: u.id, meta: u.before }, noUndo: true });
  const idx = P.findIndex(x => x.id === u.id);
  if (idx >= 0) P[idx] = r.photo;
  ad.msg = t("undone"); ad.kind = "ok";
  render();
}
function pageBar(extra = "") {
  if (!token) return "";
  const msg = ad.msg ? `<span class="notice ${ad.kind}" style="margin:0">${esc(ad.msg)}</span>` : "";
  ad.msg = "";
  return `<div class="edit-bar"><button class="btn ${reorderMode ? "solid" : ""}" data-act="toggleReorder">${reorderMode ? t("editDone") : t("editStart")}</button><button class="btn" data-act="undo">${t("undo")}</button>${extra}${msg}</div>`;
}
const isFreeView = () => isFree() && window.innerWidth >= 700;
function richText(text) {
  return esc(text).replace(/\n/g, "<br>").replace(
    /\[([^\]]{1,80})\]\((https?:\/\/[^\s)]+|#[^\s)]*|\/[^\s)]*)\)/g,
    (m, label, url) => `<a href="${url}" target="_blank" rel="noopener" style="color:var(--accent)">${label}</a>`
  );
}
function textStyleCSS(p) {
  const st = p.style || {};
  const size = { sm: ".92rem", md: "1.02rem", lg: "1.35rem" }[st.size || "md"];
  const align = { start: "start", center: "center", end: "end", justify: "justify" }[st.align || "start"];
  return {
    box: st.bg ? `background:${st.bg};` : "",
    text: `font-size:${size};font-weight:${st.bold ? 700 : 400};text-align:${align};`
  };
}
function textToolbar(p) {
  const st = p.style || {};
  return `<div class="ttb">
    <select data-tsize="${p.id}">${["sm", "md", "lg"].map(k => `<option value="${k}" ${(st.size || "md") === k ? "selected" : ""}>${esc(t("size_" + k))}</option>`).join("")}</select>
    <button class="mini ${st.bold ? "on" : ""}" data-act="tBold" data-id="${p.id}" style="font-weight:700">B</button>
    <select data-talign="${p.id}">${["start", "center", "end", "justify"].map(k => `<option value="${k}" ${(st.align || "start") === k ? "selected" : ""}>${esc(t("align_" + k))}</option>`).join("")}</select>
    <input type="color" data-tbg="${p.id}" value="${/^#[0-9a-f]{6}$/i.test(st.bg || "") ? st.bg : "#151515"}" title="${esc(t("boxColor"))}">
  </div>`;
}
const sizesOf = p => reorderMode
  ? `<div class="sz">${[20, 30, 44].map(v => `<button class="mini ${Math.round(itemW(p)) === v ? "on" : ""}" data-act="sizeItem" data-id="${p.id}" data-w="${v}">${v === 20 ? "S" : v === 30 ? "M" : "L"}</button>`).join("")}</div>`
  : "";
async function saveMetaField(id, meta) {
  const r = await api("updatePhoto", { method: "POST", body: { id, meta } });
  const idx = P.findIndex(x => x.id === id);
  if (idx >= 0) P[idx] = r.photo;
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}
function saveStyle(id, patch) {
  const p = P.find(x => x.id === id);
  if (!p) return Promise.resolve();
  return saveMetaField(id, { style: { ...(p.style || {}), ...patch } });
}

async function saveHero() {
  const picks = [...document.querySelectorAll("[data-hpick]")].filter(c => c.checked).map(c => c.dataset.hpick).slice(0, 4);
  S.hero = {
    title: ($("#hTitle") ? $("#hTitle").value : "").trim(),
    text: ($("#hText") ? $("#hText").value : "").trim(),
    photoIds: picks,
    align: $("#hAlign") ? $("#hAlign").value : (S.hero && S.hero.align) || "start"
  };
  await persistSettings();
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}

async function saveName() {
  const o = route.sub ? subObj(route.main, route.sub) : S.categories.main.find(m => m.id === route.main);
  if (!o) return;
  o.fa = $("#nmFa").value.trim() || o.fa;
  o.en = $("#nmEn").value.trim() || o.en;
  await persistSettings();
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}
async function toggleHidden() {
  S.hidden = S.hidden || {};
  const k = layoutKey();
  if (S.hidden[k]) delete S.hidden[k]; else S.hidden[k] = true;
  await persistSettings();
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}
async function saveResize(st) {
  const p = P.find(x => x.id === st.id);
  if (!p) return;
  const w = Math.round(st.newW * 10) / 10;
  await api("updatePhoto", { method: "POST", body: { id: p.id, meta: { w } } });
  p.w = w;
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}
let pendingRestore = null;
let trashItems = null;
let trashOpen = false;
function trashPanelHTML() {
  if (!trashOpen) {
    return `<div class="panel" style="margin-bottom:16px"><h3>${t("trashHead")}</h3><button class="btn" data-act="trashOpen">${t("trashShow")}</button></div>`;
  }
  const items = trashItems || [];
  const rows = items.length ? items.map(it => `<div class="trashrow">
      ${it.type === "text" ? `<div class="tt">${esc((it.text || "").slice(0, 140)) || "—"}</div>` : `<img class="tthumb" src="${imgUrl(it.id, true)}" alt="">`}
      <span class="muted" style="font-size:.85rem">${it.type === "text" ? esc(t("textLbl")) : esc(photoTitle(it))}</span>
      <span class="acts">
        <button class="mini" data-act="trashRestore" data-id="${it.id}">${esc(t("restoreItem"))}</button>
        <button class="mini danger" data-act="trashPurge" data-id="${it.id}">${esc(armed === "tp:" + it.id ? t("sure") : t("purgeItem"))}</button>
      </span></div>`).join("") : `<p class="muted">${esc(t("trashEmpty"))}</p>`;
  return `<div class="panel" style="margin-bottom:16px"><h3>${t("trashHead")} (${items.length})</h3>
    <div class="row" style="margin-bottom:10px"><button class="mini" data-act="trashClose">${esc(t("close"))}</button>${items.length ? `<button class="mini danger" data-act="trashEmpty">${esc(armed === "te" ? t("sure") : t("emptyTrash"))}</button>` : ""}</div>
    ${rows}</div>`;
}
async function trashRestoreOne(id) {
  const r = await api("restoreTrash", { method: "POST", body: { id } });
  P.push(r.photo);
  trashItems = (trashItems || []).filter(x => x.id !== id);
  ad.msg = t("trashDone"); ad.kind = "ok";
  render();
}
async function trashPurgeOne(id) {
  await api("purgeTrash", { method: "POST", body: { id } });
  trashItems = (trashItems || []).filter(x => x.id !== id);
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}
async function trashEmptyAll() {
  await api("emptyTrash", { method: "POST", body: {} });
  trashItems = [];
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}
const blobToDataURL = blob => new Promise((res, rej) => {
  const r = new FileReader();
  r.onload = () => res(String(r.result));
  r.onerror = () => rej(r.error);
  r.readAsDataURL(blob);
});
async function backupDownload() {
  const images = {};
  for (const p of P) {
    if (p.type === "text") continue;
    const r = await fetch(imgUrl(p.id, false, true));
    if (r.ok) images[p.id] = await blobToDataURL(await r.blob());
  }
  const data = { app: "KanissunPhoto", version: 1, exportedAt: new Date().toISOString(), settings: S, items: P, images };
  const url = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `kanissunphoto-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  ad.msg = t("backupMade"); ad.kind = "ok";
  render();
}
async function restoreGo() {
  const file = pendingRestore;
  pendingRestore = null;
  if (!file) return;
  let data = null;
  try { data = JSON.parse(await file.text()); } catch (e) { data = null; }
  if (!data || data.app !== "KanissunPhoto" || !Array.isArray(data.items) || !data.settings) throw new Error(t("backupBad"));
  for (const p of P) await api("deletePhoto", { method: "POST", body: { id: p.id } });
  P = [];
  await api("saveSettings", { method: "POST", body: { settings: data.settings } });
  S = data.settings;
  let photos = 0;
  for (const item of data.items) {
    if (item.type === "text") {
      const r = await api("createText", { method: "POST", body: { id: item.id, meta: item } });
      P.push(r.photo);
    } else {
      const src = data.images && data.images[item.id];
      if (!src || src.indexOf(";base64,") < 0) continue;
      const mime = src.slice(5, src.indexOf(";"));
      const b64 = src.slice(src.indexOf(";base64,") + 8);
      const r = await api("uploadPhoto", { method: "POST", body: { id: item.id, mime, data: b64, meta: item } });
      P.push(r.photo);
      photos++;
    }
  }
  undoStack.length = 0;
  ad.msg = `${t("restoreDone")}: ${photos}`; ad.kind = "ok";
  render();
}

/* Categories on large screens: the first tile stays in the centre and the others gather
   around it on a half circle, then return to the centre, in a loop */
let arcResizeTimer = null;
let arcObs = null;
function setupArc() {
  if (arcObs) { arcObs.disconnect(); arcObs = null; }
  const box = document.querySelector("#app .cat-cards.stack");
  if (!box) return;
  const cards = [...box.children];
  const desktop = window.matchMedia("(min-width:900px) and (hover:hover)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!desktop || reduce || cards.length < 2) {
    box.classList.remove("arc", "play");
    cards.forEach(c => { c.style.cssText = ""; });
    return;
  }
  const W = box.clientWidth;
  const H = box.clientHeight || window.innerHeight * 0.82;
  const cx = W / 2, cy = H * 0.64;
  const cw = Math.min(W * 0.24, H * 0.4);
  const base = Math.min(W * 0.17, H * 0.28);
  const R = Math.max(Math.min(W * 0.36, H * 0.52), cw * 0.95);
  const M = cards.length - 1;
  cards.forEach((c, i) => {
    if (i === 0) {
      c.style.cssText = `width:${cw}px;height:${cw}px;left:${cx - cw / 2}px;top:${cy - cw / 2}px;z-index:3;opacity:0;--dx:0px;--dy:0px;`;
      c.dataset.anim = "arcIn 1.4s cubic-bezier(.2,.7,.2,1) .3s both";
      return;
    }
    const sw = base * (1 + (i - 1) * 0.06);
    const a = (200 + ((i - 1) * 140) / Math.max(M - 1, 1)) * Math.PI / 180;
    const tx = cx + R * Math.cos(a) - sw / 2;
    const ty = cy + R * Math.sin(a) - sw / 2;
    const dx = cx - sw / 2 - tx;
    const dy = cy - sw / 2 - ty;
    const delay = 1.7 + (i - 1) * 1.1;
    c.style.cssText = `width:${sw}px;height:${sw}px;left:${tx}px;top:${ty}px;z-index:2;opacity:0;--dx:${dx}px;--dy:${dy}px;`;
    c.dataset.anim = `arcIn 1.5s cubic-bezier(.2,.7,.2,1) ${delay.toFixed(2)}s both`;
  });
  box.classList.add("arc");
  box.classList.remove("play");
  // already shown in this visit (e.g. coming back from a category): show the tiles in place, no empty state
  if (sessionStorage.getItem("kp-arc") === "1") {
    cards.forEach(c => { c.style.opacity = "1"; c.style.animation = "none"; });
    box.classList.add("play");
    return;
  }
  // the sequence starts when the section comes into view. A scroll check and a timer make sure it never stays empty.
  const play = () => {
    if (box.classList.contains("play")) return;
    cards.forEach(c => { c.style.animation = c.dataset.anim; });
    box.classList.add("play");
    sessionStorage.setItem("kp-arc", "1");
    if (arcObs) { arcObs.disconnect(); arcObs = null; }
    window.removeEventListener("scroll", onScrollArc);
  };
  const onScrollArc = () => {
    const r = box.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.85 && r.bottom > 0) play();
  };
  arcObs = new IntersectionObserver(entries => {
    if (entries.some(en => en.isIntersecting)) play();
  }, { threshold: 0.05 });
  arcObs.observe(box);
  window.addEventListener("scroll", onScrollArc, { passive: true });
  setTimeout(play, 20000);
}

let heroTimer = null;
function showSlide(i) {
  document.querySelectorAll(".hero-slide").forEach((el, k) => el.classList.toggle("on", k === i));
  document.querySelectorAll(".hero-dot").forEach((el, k) => el.classList.toggle("on", k === i));
}
function startHero() {
  clearInterval(heroTimer);
  heroTimer = null;
  const n = document.querySelectorAll(".hero-slide").length;
  if (n < 2) return;
  heroTimer = setInterval(() => {
    const cur = [...document.querySelectorAll(".hero-slide")].findIndex(el => el.classList.contains("on"));
    showSlide((cur + 1) % n);
  }, 7000);
}
function arm(key) {
  armed = key;
  clearTimeout(armTimer);
  armTimer = setTimeout(() => { if (armed === key) { armed = null; render(); } }, 4000);
  render();
}
let vIds = [], vI = 0;
const ad = { tab: "photos", upMain: "nature", upSub: "", filter: "", msg: "", kind: "" };

/* ---------- Helpers ---------- */
const t = k => (UI[lang] && UI[lang][k]) || UI.fa[k] || k;
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const name = o => (lang === "fa" ? o.fa : (o.en || o.fa));
const mainObj = id => S.categories.main.find(m => m.id === id) || { id, fa: id, en: id };
const subsOf = id => (S.categories.subs[id] || []);
const subObj = (m, s) => subsOf(m).find(x => x.id === s);
const imgUrl = (id, trash, full) => `${API}?action=image&id=${encodeURIComponent(id)}${trash ? "&trash=1" : ""}${full || trash ? "" : "&size=thumb"}`;
const posOf = p => `${p.crop?.x ?? 50}% ${p.crop?.y ?? 50}%`;
const photoTitle = p => (p.title && (p.title[lang] || p.title.fa || p.title.en)) || t("untitled");
const photoDesc = p => (p.desc && (p.desc[lang] || p.desc.fa)) || "";
const byNew = (a, b) => b.createdAt - a.createdAt;
const byOrder = (a, b) => (a.order ?? a.createdAt) - (b.order ?? b.createdAt);
const groupKeyOf = p => `${p.mainId}/${p.subId || ""}`;
const groupOf = p => P.filter(x => groupKeyOf(x) === groupKeyOf(p)).sort(byOrder);
const randomId = () => Array.from(crypto.getRandomValues(new Uint8Array(8))).map(b => b.toString(16).padStart(2, "0")).join("");

function parseHash() {
  const h = location.hash.replace(/^#\/?/, "").split("/");
  if (h[0] === "series" && h[1]) return { name: "series", id: h[1] };
  if (h[0] === "photo" && h[1]) {
    const ph = P.find(x => x.id === h[1]);
    if (ph) return { name: "cat", main: ph.mainId, sub: ph.subId || null, openPhoto: ph.id };
  }
  if (h[0] === "cat" && MAIN_IDS.includes(h[1])) return { name: "cat", main: h[1], sub: h[2] || null };
  if (["about", "contact", "admin", "news"].includes(h[0])) return { name: h[0] };
  return { name: "home" };
}
function navigate(hash) {
  kwFilter = null;
  if (location.hash === hash) render();
  else location.hash = hash;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- API ---------- */
async function api(action, opts = {}) {
  const { method = "GET", body } = opts;
  if (action === "updatePhoto" && body && !opts.noUndo) recordUndo(body);
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = "Bearer " + token;
  const res = await fetch(`${API}?action=${action}`, {
    method, headers, body: body ? JSON.stringify(body) : undefined
  });
  let data = {};
  try { data = await res.json(); } catch { data = {}; }
  if (res.status === 401 && action !== "login") {
    token = "";
    sessionStorage.removeItem("kp-token");
  }
  if (!res.ok) throw new Error(data.error || ("HTTP " + res.status));
  return data;
}
async function loadPublic() {
  const d = await api("public");
  S = d.settings;
  P = d.photos;
}
async function persistSettings() {
  await api("saveSettings", { method: "POST", body: { settings: S } });
}

/* ---------- Navigation ---------- */
function buildNav() {
  const items = [
    `<button data-nav="#home">${t("home")}</button>`,
    `<button data-nav="#about">${t("about")}</button>`
  ];
  MAIN_IDS.forEach(id => {
    const subs = subsOf(id);
    items.push(`<div class="dropdown">
      <button data-nav="#cat/${id}" aria-haspopup="true">${esc(name(mainObj(id)))}</button>
      <div class="menu">${subs.map(s => `<button data-nav="#cat/${id}/${s.id}">${esc(name(s))}</button>`).join("")}</div>
    </div>`);
  });
if (token) items.push(`<button data-nav="#admin">${t("admin")}</button>`);
  if (token) items.push(`<button data-nav="#admin">${t("admin")}</button>`); // visible to the admin only
  $("#mainNav").innerHTML = items.join("");
}
function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  document.body.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
  $("#langToggle").textContent = t("langBtn");
  $("#footer").innerHTML = esc(t("footer"));
  $("#vInquire").textContent = t("inquire");
}

/* ---------- Shared pieces ---------- */
const TEMPLATES = {
  single: [[{ x: 10, w: 80 }]],
  two: [[{ x: 2, w: 45 }, { x: 53, w: 45 }]],
  three: [[{ x: 2, w: 29 }, { x: 36, w: 29 }, { x: 70, w: 29 }]],
  four: [[{ x: 2, w: 45 }, { x: 53, w: 45 }], [{ x: 2, w: 45 }, { x: 53, w: 45 }]],
  bigTwo: [[{ x: 10, w: 80 }], [{ x: 2, w: 45 }, { x: 53, w: 45 }]],
  textPhoto: [[{ x: 2, w: 40 }, { x: 46, w: 52 }]]
};
const pagesCount = () => Math.max(1, ...pageItems().map(p => p.page || 1), (S.pagesN || {})[layoutKey()] || 1);
async function applyTemplate(name) {
  const tpl = TEMPLATES[name];
  if (!tpl) return;
  const list = pageItems();
  const touched = [];
  let idx = 0, pageNo = 1;
  while (idx < list.length) {
    let rowTop = 2;
    for (const row of tpl) {
      let rowH = 0;
      for (const slot of row) {
        if (idx >= list.length) break;
        const p = list[idx++];
        p.page = pageNo; p.w = slot.w; p.x = slot.x; p.y = rowTop;
        rowH = Math.max(rowH, estH(p));
        touched.push(p);
      }
      if (idx >= list.length) break;
      rowTop += rowH + 7;
    }
    pageNo++;
  }
  for (const p of touched) {
    await api("updatePhoto", { method: "POST", body: { id: p.id, meta: { page: p.page, x: p.x, y: p.y, w: p.w } } });
  }
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}
async function smartLayout() {
  const items = pageItems();
  if (!items.length) { ad.msg = t("noPhotosHere"); ad.kind = "bad"; render(); return; }
  const H = (S.pageH || {})[layoutKey()] || 150;
  const kind = p => p.type === "text" ? "text" : (ratioOf(p) >= 1.2 ? "portrait" : "landscape");
  const rows = [];
  let i = 0;
  while (i < items.length) {
    const a = items[i], b = items[i + 1], c = items[i + 2];
    const ka = kind(a), kb = b ? kind(b) : null, kc = c ? kind(c) : null;
    if (ka === "text") {
      if (b && kb !== "text") { rows.push([{ p: a, x: 2, w: 40 }, { p: b, x: 46, w: 52 }]); i += 2; }
      else { rows.push([{ p: a, x: 2, w: 70 }]); i += 1; }
    } else if (ka === "portrait") {
      if (kb === "portrait" && kc === "portrait") { rows.push([{ p: a, x: 2, w: 29 }, { p: b, x: 36, w: 29 }, { p: c, x: 70, w: 29 }]); i += 3; }
      else if (kb === "portrait") { rows.push([{ p: a, x: 10, w: 36 }, { p: b, x: 54, w: 36 }]); i += 2; }
      else if (kb === "landscape") { rows.push([{ p: a, x: 2, w: 32 }, { p: b, x: 38, w: 60 }]); i += 2; }
      else { rows.push([{ p: a, x: 32, w: 36 }]); i += 1; }
    } else {
      if (kb === "landscape") { rows.push([{ p: a, x: 2, w: 45 }, { p: b, x: 53, w: 45 }]); i += 2; }
      else if (kb === "portrait") { rows.push([{ p: a, x: 2, w: 58 }, { p: b, x: 64, w: 32 }]); i += 2; }
      else { rows.push([{ p: a, x: 10, w: 80 }]); i += 1; }
    }
  }
  const est = s => (s.p.type === "text" ? 16 : s.w * ratioOf(s.p));
  const touched = [];
  let page = 1, top = 2;
  rows.forEach(row => {
    const rowH = Math.max(...row.map(est));
    if (top + rowH > H && top > 2) { page++; top = 2; }
    row.forEach(s => {
      s.p.page = page; s.p.x = s.x; s.p.w = s.w; s.p.y = top;
      touched.push(s.p);
    });
    top += rowH + 7;
  });
  for (const p of touched) {
    await api("updatePhoto", { method: "POST", body: { id: p.id, meta: { page: p.page, x: p.x, y: p.y, w: p.w } } });
  }
  S.pagesN = S.pagesN || {};
  S.pagesN[layoutKey()] = Math.max(S.pagesN[layoutKey()] || 1, page);
  await persistSettings();
  ad.msg = `${t("smartDone")}: ${rows.length} ${t("rowsLbl")} · ${page} ${t("pageLbl")}`;
  ad.kind = "ok";
  render();
}

async function addPage() {
  S.pagesN = S.pagesN || {};
  S.pagesN[layoutKey()] = pagesCount() + 1;
  await persistSettings();
  render();
}
async function movePageOf(id, n) {
  const p = P.find(x => x.id === id);
  if (!p) return;
  const others = pageItems().filter(x => x.id !== id && (x.page || 1) === n);
  const bottom = others.reduce((m, x) => Math.max(m, (x.y || 0) + estH(x)), 0);
  p.page = n; p.x = 2; p.y = others.length ? Math.round((bottom + 2) * 10) / 10 : 0;
  await api("updatePhoto", { method: "POST", body: { id, meta: { page: p.page, x: p.x, y: p.y } } });
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}
const pageSel = p => (reorderMode
  ? `<select class="pgsel" data-pgsel="${p.id}" aria-label="${esc(t("pageLbl"))}">${Array.from({ length: pagesCount() }, (_, i) => `<option value="${i + 1}" ${(p.page || 1) === i + 1 ? "selected" : ""}>${esc(t("pageLbl"))} ${i + 1}</option>`).join("")}</select>`
  : "");
const mvHTML = p => `<div class="mvbtns"><button class="mini" data-act="photoUp" data-id="${p.id}" aria-label="↑">↑</button><button class="mini" data-act="photoDown" data-id="${p.id}" aria-label="↓">↓</button></div>`;
const contactFieldsHTML = () => {
  const c = S.contact || {};
  return `<div class="contact-fields"><h3>${esc(t("contactFieldsLbl"))}</h3>
    <div><label for="cAddr">${esc(t("addrHead"))}</label><textarea id="cAddr" rows="2">${esc(c.address || "")}</textarea></div>
    <div><label for="cPhone">${esc(t("phoneLbl"))}</label><input type="text" id="cPhone" dir="ltr" value="${esc(c.phone || "")}"></div>
    <div><label for="cWhats">${esc(t("whatsLbl"))}</label><input type="text" id="cWhats" dir="ltr" value="${esc(c.whatsapp || "")}"></div>
    <div><label for="cInsta">${esc(t("instaLbl"))}</label><input type="text" id="cInsta" dir="ltr" value="${esc(c.instagram || "")}"></div>
    <div><label for="cTele">${esc(t("teleLbl"))}</label><input type="text" id="cTele" dir="ltr" value="${esc(c.telegram || "")}"></div>
    <div><label for="cHours">${esc(t("hoursHead"))}</label><input type="text" id="cHours" value="${esc(c.hours || "")}"></div>
  </div>`;
};
const safeHref = u => (/^https?:\/\//i.test(u || "") ? u : "");
const ICON_IG = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
const ICON_TG = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M2.5 11.3 20.6 4.4c.8-.3 1.6.2 1.3 1.4l-3.1 14.6c-.2 1-.9 1.2-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.4-4.9 8.8-8c.4-.4-.1-.6-.6-.2L7 14 2.4 12.5c-1-.3-1-1 .1-1.2z"/></svg>';
const ICON_WA = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8.3 18.7z"/></svg>';
const ICON_PHONE = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>';
const ICON_MAIL = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';
function siteContactHTML() {
  const c = S.contact || {};
  const email = S.about.email || "";
  const waDigits = (c.whatsapp || "").replace(/\D/g, "");
  const phoneDigits = (c.phone || "").replace(/[^\d+]/g, "");
  const recent = P.filter(p => p.type !== "text").sort(byNew).slice(0, 9);
  const strip = recent.length
    ? `<div class="sc-strip">${recent.map(p => `<img src="${imgUrl(p.id)}" alt="" loading="lazy">`).join("")}</div>`
    : "";
  const details = [email, c.phone, c.address, c.hours].filter(Boolean).map(v => esc(v)).join(" · ");
  const icons = [
    phoneDigits && { href: `tel:${phoneDigits}`, label: "Phone", svg: ICON_PHONE },
    waDigits && { href: `https://wa.me/${waDigits}`, label: "WhatsApp", svg: ICON_WA },
    safeHref(c.telegram) && { href: c.telegram, label: "Telegram", svg: ICON_TG },
    safeHref(c.instagram) && { href: c.instagram, label: "Instagram", svg: ICON_IG },
    safeHref(c.telegram) && { href: c.telegram, label: "Telegram", svg: ICON_TG },
    email && { href: `mailto:${email}`, label: "Email", svg: ICON_MAIL }
  ].filter(Boolean).map(i => `<a class="sc-icon" href="${esc(i.href)}" target="_blank" rel="noopener" aria-label="${i.label}">${i.svg}</a>`).join("");
  const navLinks = [
    `<button data-nav="#home">${esc(t("home"))}</button>`,
    ...MAIN_IDS.map(id => `<button data-nav="#cat/${id}">${esc(name(mainObj(id)))}</button>`),
    `<button data-nav="#about">${esc(t("about"))}</button>`,
    `<button data-nav="#contact">${esc(t("contact"))}</button>`
  ].join("");
  return `<section class="site-contact">
    ${strip}
    <div class="sc-cta">
      <h2>${esc(t("ctaTitle"))}</h2>
      <p>${esc(t("ctaSub"))}</p>
      <button class="btn sc-pill" data-nav="#contact">${esc(t("ctaBtn"))}</button>
    </div>
    <div class="sc-brand">KanissunPhoto</div>
    ${details ? `<p class="sc-details">${details}</p>` : ""}
    <nav class="sc-nav">${navLinks}</nav>
    ${icons ? `<div class="sc-icons">${icons}</div>` : ""}
    <div class="sc-copy">${esc(t("footer"))}</div>
  </section>`;
}
const statsHTML = list => (list && list.length
  ? `<div class="stat-grid">${list.map(x => `<div class="stat-card">
      <div class="stat-val">${esc(x.value)}</div>
      <div class="stat-label">${esc(x.label)}</div>
      ${x.text ? `<p>${esc(x.text)}</p>` : ""}
    </div>`).join("")}</div>`
  : "");
const statsEditHTML = () => {
  const list = S.about.stats || [];
  return `<div class="contact-fields"><h3>${esc(t("statsHead"))}</h3>${[0, 1, 2, 3].map(i => {
    const x = list[i] || {};
    return `<div class="row">
      <input type="text" id="sv-${i}" value="${esc(x.value || "")}" placeholder="${esc(t("statValPh"))}" style="max-width:150px">
      <input type="text" id="sl-${i}" value="${esc(x.label || "")}" placeholder="${esc(t("statLabelPh"))}">
      <input type="text" id="stx-${i}" value="${esc(x.text || "")}" placeholder="${esc(t("statTextPh"))}">
    </div>`;
  }).join("")}</div>`;
};
const alignSel = (id, cur) => `<div><label for="${id}">${esc(t("alignLbl"))}</label><select id="${id}">${["start", "center", "end", "justify"].map(k => `<option value="${k}" ${(cur || "start") === k ? "selected" : ""}>${esc(t("align_" + k))}</option>`).join("")}</select></div>`;
const wmHTML = () => (S.watermark === false ? "" : '<div class="glass-wm" aria-hidden="true"><span>KanissunPhoto</span></div>');
const DEF_W = 30;
const layoutKey = () => `${route.main}/${route.sub || ""}`;
const isFree = () => !!(S.layouts && S.layouts[layoutKey()]);
const itemW = p => p.w || (p.type === "text" ? 40 : DEF_W);
const ratioOf = p => p.ratio || (p.shape === "portrait" ? 1.5 : 0.667);
const estH = p => (p.type === "text" ? 16 : itemW(p) * ratioOf(p));
function pageItems() {
  const sub = route.sub ? subObj(route.main, route.sub) : null;
  return P.filter(p => p.mainId === route.main && (!sub || p.subId === sub.id)).sort(byOrder);
}
// Give positions (in % of canvas width) to items that have none. Returns the items that were placed.
function placeMissing(list) {
  const changed = [];
  let rowTop = 0, rowH = 0, cnt = 0;
  list.forEach(p => { if (p.x != null && p.y != null) rowTop = Math.max(rowTop, p.y + estH(p)); });
  list.forEach(p => {
    if (p.x != null && p.y != null) return;
    p.w = itemW(p);
    const col = cnt % 3;
    if (col === 0 && cnt > 0) { rowTop += rowH + 7; rowH = 0; }
    p.x = 2 + col * 33;
    p.y = rowTop;
    rowH = Math.max(rowH, estH(p));
    cnt++;
    changed.push(p);
  });
  return changed;
}

function freeItemHTML(p) {
  const w = itemW(p);
  const pos = `left:${p.x}cqw;top:${p.y}cqw;width:${w}cqw`;
  const delBtn = reorderMode
    ? `<button class="x-btn" data-act="delPhoto" data-id="${p.id}" aria-label="${esc(t("remove"))}">${esc(delLabel("p:" + p.id))}</button>`
    : "";
  const rh = reorderMode ? `<span class="rh" aria-hidden="true"></span>` : "";
  if (p.type === "text") {
    const st = textStyleCSS(p);
    if (reorderMode) {
      return `<div class="tblock editing fitem" data-pid="${p.id}" style="${pos};${st.box}">
        <span class="grip">⠿ ${esc(t("dragLabel"))}</span>
        ${textToolbar(p)}
        <textarea data-inline="${p.id}" rows="4" placeholder="${esc(t("textPh"))}" style="${st.text}">${esc(p.text || "")}</textarea>
        <div class="hint-small">${esc(t("linkHint"))}</div>
        ${delBtn}${rh}${sizesOf(p)}${pageSel(p)}
      </div>`;
    }
    if (!p.text) return "";
    return `<div class="tblock fitem" data-pid="${p.id}" style="${pos};${st.box}"><p style="${st.text}">${richText(p.text)}</p></div>`;
  }
  const cap = reorderMode
    ? `<input type="text" class="capin" data-cap="${p.id}" value="${esc(p.caption || "")}" placeholder="${esc(t("captionPh"))}">`
    : (p.caption ? `<div class="capline">${esc(p.caption)}</div>` : "");
  return `<figure class="thumb fitem ${p.shape === "portrait" ? "portrait" : ""} ${p.hidden ? "is-hidden" : ""}" data-open="${p.id}" data-pid="${p.id}" style="${pos};aspect-ratio:${1 / ratioOf(p)}">
    <img src="${imgUrl(p.id)}" alt="${esc(photoTitle(p))}" loading="lazy" draggable="false" style="object-position:${posOf(p)}">
    ${wmHTML()}${cap}${delBtn}${rh}${sizesOf(p)}${pageSel(p)}
  </figure>`;
}


function canvasHTML(list) {
  const changed = placeMissing(list);
  if (token) {
    changed.forEach(p => {
      api("updatePhoto", { method: "POST", body: { id: p.id, meta: { x: p.x, y: p.y, w: p.w } } }).catch(err => console.error(err));
    });
  }
  const pages = pagesCount();
  let html = "";
  for (let n = 1; n <= pages; n++) {
    const items = list.filter(p => (p.page || 1) === n);
    html += `<div class="pagewrap"><div class="pagelabel">${esc(t("pageLbl"))} ${n}</div>
      <div class="canvas ${reorderMode ? "edit" : ""}" data-page="${n}">${items.map(freeItemHTML).join("")}</div></div>`;
  }
  return html;
}

function layoutCanvas() {
  const H = (S.pageH || {})[layoutKey()] || 150;
  let over = 0;
  document.querySelectorAll(".canvas[data-page]").forEach(c => {
    const W = c.getBoundingClientRect().width || 1;
    const limit = (H / 100) * W;
    [...c.children].forEach(k => {
      const out = k.offsetTop + k.offsetHeight > limit;
      k.classList.toggle("outside", out);
      if (out) over++;
    });
    c.style.height = limit + "px";
  });
  const warn = $("#pageWarn");
  if (warn) warn.textContent = over ? t("pageWarn").replace("{n}", over) : "";
}
function editTextBlock(p) {
  return `<div class="tblock editing" data-pid="${p.id}">
    <span class="grip">⠿ ${esc(t("dragLabel"))}</span>
    <textarea data-inline="${p.id}" rows="4" placeholder="${esc(t("textPh"))}">${esc(p.text || "")}</textarea>
    <button class="x-btn" data-act="delPhoto" data-id="${p.id}" aria-label="${esc(t("remove"))}">${esc(delLabel("p:" + p.id))}</button>
  </div>`;
}
function textBlock(p) {
  if (reorderMode) return editTextBlock(p);
  if (!p.text) return "";
  return `<div class="tblock" data-pid="${p.id}"><p>${esc(p.text).replace(/\n/g, "<br>")}</p></div>`;
}
function thumb(p) {
  if (p.type === "text") return textBlock(p);
  const title = esc(photoTitle(p));
  return `<figure class="thumb ${p.shape === "portrait" ? "portrait" : ""} ${p.hidden ? "is-hidden" : ""}" tabindex="0" role="button" data-open="${p.id}" data-pid="${p.id}" aria-label="${title}">
    <img src="${imgUrl(p.id)}" alt="${title}" loading="lazy" draggable="false" style="object-position:${posOf(p)}">
    ${p.featured ? `<span class="badge">${t("featuredTag")}</span>` : ""}
    ${reorderMode && !isFreeView() ? mvHTML(p) : ""}${wmHTML()}<figcaption class="cap">${title}</figcaption>${reorderMode ? `<button class="x-btn" data-act="delPhoto" data-id="${p.id}" aria-label="${esc(t("remove"))}">${esc(delLabel("p:" + p.id))}</button>` : ""}
  </figure>`;
}
const grid = (list, cls = "") => `<div class="grid ${cls}">${list.map(thumb).join("")}</div>`;
const secHead = (num, title) => `<div class="sec-head"><span class="num">${num}</span><h2>${esc(title)}</h2></div>`;
const emptyBox = msg => `<div class="empty">${esc(msg)}</div>`;

/* ---------- Pages ---------- */


const TILE_TARGETS = ["nature", "portrait", "social", "children", "news", "home", "about"];
const DEFAULT_TILES = ["about", "nature", "portrait", "social", "children", "news", "home"];
function tileInfoBase(target) {
  if (MAIN_IDS.includes(target)) {
    const cover = P.filter(p => p.mainId === target && p.type !== "text").sort(byNew)[0];
    return { href: `#cat/${target}`, label: name(mainObj(target)), sub: t("intro_" + target), cover };
  }
  if (target === "news") {
    const today = new Date().toISOString().slice(0, 10);
    const next = (S.news || []).filter(n => n.date >= today).sort((a, b) => a.date.localeCompare(b.date))[0];
    const nph = next && next.photoId ? P.find(p => p.id === next.photoId && p.type !== "text") : null;
    return { href: "#news", label: t("newsTitle"), sub: t("tileNewsSub"), cover: nph || P.find(p => p.type !== "text") };
  }
  if (target === "home") {
    return { href: "#home", label: t("home"), sub: t("tileHomeSub"), cover: heroPhotos()[0] };
  }
  const aboutPh = S.about.photoId ? P.find(p => p.id === S.about.photoId && p.type !== "text") : null;
  return { href: "#about", label: t("about"), sub: t("tileAboutSub"), cover: aboutPh || P.find(p => p.type !== "text") };
}
function tileInfo(target) {
  const info = tileInfoBase(target);
  const id = S.tilePhotos && S.tilePhotos[target];
  const chosen = id ? P.find(p => p.id === id && p.type !== "text") : null;
  if (chosen) info.cover = chosen;
  return info;
}
const currentTiles = () => (Array.isArray(S.tiles) && S.tiles.length ? S.tiles.slice() : DEFAULT_TILES.slice());
async function tilesSave(list) {
  S.tiles = list;
  await persistSettings();
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}
function tilesEditorHTML() {
  const list = currentTiles();
  const opts = sel => TILE_TARGETS.map(k => `<option value="${k}" ${k === sel ? "selected" : ""}>${esc(tileInfo(k).label)}</option>`).join("");
  return `<div class="panel">
    <h3>${t("tileHead")}</h3>
    <p class="muted" style="font-size:.85rem;margin-bottom:12px">${t("tileNote")}</p>
    ${list.map((tg, i) => `<div class="catrow">
      <span class="muted">0${i + 1}</span>
      <select data-tile="${i}" style="width:auto;min-width:170px">${opts(tg)}</select>
      <select data-tphoto="${tg}" style="width:auto;min-width:170px" aria-label="${esc(t("tilePhotoLbl"))}">
        <option value="">${esc(t("autoLbl"))}</option>
        ${P.filter(p => p.type !== "text").sort(byNew).map(p => `<option value="${p.id}" ${S.tilePhotos && S.tilePhotos[tg] === p.id ? "selected" : ""}>${esc(photoTitle(p))}</option>`).join("")}
      </select>
      <span class="acts">
        <button class="mini" data-act="tileUp" data-i="${i}" ${i === 0 ? "disabled" : ""}>${t("up")}</button>
        <button class="mini" data-act="tileDown" data-i="${i}" ${i === list.length - 1 ? "disabled" : ""}>${t("down")}</button>
        <button class="mini danger" data-act="tileDel" data-i="${i}">${t("del")}</button>
      </span>
    </div>`).join("")}
    <div class="row" style="margin-top:10px">
      <select id="tileNew" style="width:auto;min-width:170px">${opts("nature")}</select>
      <button class="btn" data-act="tileAdd">${t("tileAdd")}</button>
    </div>
  </div>`;
}

function newsHTML() {
  const today = new Date().toISOString().slice(0, 10);
  const items = (S.news || []).slice();
  const upcoming = items.filter(n => n.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = items.filter(n => n.date < today).sort((a, b) => b.date.localeCompare(a.date));
  const card = (n, isPast) => {
    const ph = n.photoId ? P.find(p => p.id === n.photoId && p.type !== "text") : null;
    const when = new Date(n.date + "T00:00:00").toLocaleDateString(lang === "fa" ? "fa-IR" : "en-GB", { year: "numeric", month: "long", day: "numeric" });
    return `<article class="news-card ${ph ? "has-img" : ""} ${isPast ? "past" : ""}">
      ${ph ? `<div class="news-img"><img src="${imgUrl(ph.id)}" alt="" loading="lazy" style="aspect-ratio:${1 / ratioOf(ph)}"></div>` : ""}
      <div class="news-body">
        <div class="news-meta">${esc(when)}${n.place ? ` · ${esc(n.place)}` : ""}${isPast ? ` · ${esc(t("newsPast"))}` : ""}</div>
        <h3>${esc(n.title)}</h3>
        ${n.text ? `<p>${richText(n.text)}</p>` : ""}
        ${safeHref(n.link) ? `<a class="btn" href="${esc(safeHref(n.link))}" target="_blank" rel="noopener">${esc(t("newsMore"))}</a>` : ""}
      </div>
    </article>`;
  };
  return pageBar() + `<h1>${esc(t("newsTitle"))}</h1><p class="cat-intro">${esc(t("newsIntro"))}</p>` +
    (upcoming.length ? `<div class="news-list">${upcoming.map(n => card(n, false)).join("")}</div>` : `<div class="empty">${esc(t("newsEmpty"))}</div>`) +
    (past.length ? `<h2>${esc(t("newsPastHead"))}</h2><div class="news-list">${past.map(n => card(n, true)).join("")}</div>` : "");
}

/* At the end of every category / subcategory page: the same tiles, so the visitor can continue without going back */
function moreTilesHTML() {
  const cats = currentTiles().map((tg, i) => {
    const info = tileInfo(tg);
    return `<button class="cat-card sq" data-nav="${info.href}">
      ${info.cover ? `<img src="${imgUrl(info.cover.id)}" alt="" loading="lazy" style="object-position:${posOf(info.cover)}">` : ""}
      <span class="idx">0${i + 1}</span>
      <span class="label"><b>${esc(info.label)}</b><small>${esc(info.sub || "")}</small></span>
    </button>`;
  }).join("");
  return `<section class="more-tiles">${secHead("00", t("moreTiles"))}<div class="cat-cards more">${cats}</div></section>`;
}

function heroPhotos() {
  const H = S.hero || {};
  const ok = p => p && p.shape === "landscape" && p.type !== "text";
  const ids = H.photoIds && H.photoIds.length ? H.photoIds : (H.photoId ? [H.photoId] : []);
  let list = ids.map(id => P.find(p => p.id === id)).filter(ok);
  if (!list.length) list = P.filter(p => ok(p) && p.featured).sort(byNew);
  if (!list.length) list = P.filter(ok).sort(byNew);
  return list.slice(0, 4);
}
function homeHTML() {
  const H = S.hero || {};
  const slides = heroPhotos();
  const pickedIds = slides.map(p => p.id);
  const landscapes = P.filter(p => p.type !== "text").sort(byNew);
  const slideImgs = slides.map((p, i) => `<img class="hero-slide ${i === 0 ? "on" : ""}" src="${imgUrl(p.id, false, true)}" alt="" style="object-position:${posOf(p)}">`).join("");
  const dots = slides.length > 1
    ? `<div class="hero-dots">${slides.map((p, i) => `<button class="hero-dot ${i === 0 ? "on" : ""}" data-slide="${i}" aria-label="${i + 1}"></button>`).join("")}</div>`
    : "";
  const heroHTML = reorderMode
    ? `<section class="hero hero-edit">${slideImgs}
        <div class="hero-text" style="max-width:none;width:100%">
          <div class="form" style="max-width:640px">
            <div><label for="hTitle">${esc(t("heroTitleLbl"))}</label><input type="text" id="hTitle" value="${esc(H.title || "")}" placeholder="KanissunPhoto"></div>
            <div><label for="hText">${esc(t("heroTextLbl"))}</label><textarea id="hText">${esc(H.text || "")}</textarea></div>
            <div><label>${esc(t("heroPhotoLbl"))}</label>
              <div class="hero-picks">${landscapes.map(p => `<label class="chk-inline"><input type="checkbox" data-hpick="${p.id}" ${pickedIds.includes(p.id) ? "checked" : ""}> ${esc(photoTitle(p))}${p.shape === "portrait" ? " (عمودی)" : ""}</label>`).join("") || `<span class="muted">${esc(t("noPhotos"))}</span>`}</div>
            </div>
            ${alignSel("hAlign", H.align)}<div class="row"><button class="btn solid" data-act="saveHero">${t("save")}</button></div>
          </div>
        </div></section>`
    : `<section class="hero">${slideImgs || `<div class="hero-empty">${esc(t("noPhotos"))}</div>`}
        <div class="hero-text">
          <h1 style="text-align:${esc(H.align || "start")}">${esc(H.title || "KanissunPhoto")}</h1>
          <p style="text-align:${esc(H.align || "start")}">${esc(H.text || t("heroText")).replace(/\n/g, "<br>")}</p>
          <div class="row" style="margin-top:30px">
            <button class="btn solid" data-nav="#cat/nature">${t("explore")}</button>

          </div>
        </div>
        ${dots}
        <div class="scroll-cue" data-scrolldown aria-hidden="true"></div></section>`;
  const feats = P.filter(p => p.featured && p.type !== "text").sort(byNew).slice(0, 8);
  const featHTML = "";
  const cats = currentTiles().map((tg, i) => {
    const info = tileInfo(tg);
    return `<button class="cat-card sq" style="--i:${i}" data-nav="${info.href}">
      ${info.cover ? `<img src="${imgUrl(info.cover.id)}" alt="" loading="lazy" style="object-position:${posOf(info.cover)}">` : ""}
      <span class="idx">0${i + 1}</span>
      <span class="label"><b>${esc(info.label)}</b><small>${esc(info.sub || "")}</small></span>
    </button>`;
  }).join("");
  const bio = (S.about.bio || "").trim();
  const aboutPh = S.about.photoId ? P.find(p => p.id === S.about.photoId && p.type !== "text") : null;
  const blurb = bio ? (bio.length > 280 ? bio.slice(0, 280).trim() + "…" : bio) : t("aboutShortText");
  const aboutHome = `<section class="home-about ${aboutPh ? "has-photo" : ""}">
    ${aboutPh ? `<div class="home-about-img"><img src="${imgUrl(aboutPh.id)}" alt="" style="aspect-ratio:${1 / ratioOf(aboutPh)};object-position:${posOf(aboutPh)}"></div>` : ""}
    <div class="home-about-text">
      <p>${esc(blurb).replace(/\n/g, "<br>")}</p>
      <button class="btn" data-nav="#about">${esc(t("readMore"))}</button>
    </div>
  </section>`;
  return pageBar() + heroHTML + featHTML + secHead("01", t("categories")) +
    `<div class="cat-cards stack">${cats}</div>` + (S.about.stats && S.about.stats.length ? secHead("02", t("statsHead")) + statsHTML(S.about.stats) : "");
}

function catHTML() {
  const main = mainObj(route.main);
  const sub = route.sub ? subObj(route.main, route.sub) : null;
  const cur = sub || main;
  const key = layoutKey();
  const hiddenNow = !!(S.hidden && S.hidden[key]);
  const crumbs = [`<button data-nav="#home">${t("home")}</button>`, `<button data-nav="#cat/${route.main}">${esc(name(main))}</button>`];
  if (sub) crumbs.push(`<span>${esc(name(sub))}</span>`);
  const crumbHTML = `<nav class="crumbs">${crumbs.join(` <span>←</span> `)}</nav>`;
  if (hiddenNow && !token) return crumbHTML + `<h1>${esc(name(cur))}</h1>` + emptyBox(t("comingSoon"));

  let extra = "";
  if (token) extra += `<button class="btn" data-act="toggleLayout">${isFree() ? t("layoutGrid") : t("layoutFree")}</button>`;
  if (reorderMode) {
    extra += `<button class="btn" data-act="addTextHere">${t("addText")}</button>`
      + `<label class="btn" style="cursor:pointer">${t("addPhotos")}<input type="file" id="pageUpFiles" accept="image/*" multiple style="display:none"></label>`
      + `<label class="chk-inline">${t("bgColor")} <input type="color" data-bg="${esc(key)}" value="${/^#[0-9a-f]{6}$/i.test((S.bgs || {})[key] || "") ? S.bgs[key] : "#0b0b0b"}"></label>`
      + `<button class="btn" data-act="toggleHidden">${hiddenNow ? t("showPublic") : t("hidePublic")}</button>`
      + `<span class="muted">${t("editHint")}</span>`
      + (window.innerWidth < 700 ? `<span class="muted">${t("mobileHint")}</span>` : "")
      + (isFree() ? `<span class="muted">${t("freeHint")}</span>` : "");
  }
  if (reorderMode && !sub) {
    extra += `<span class="sub-add"><input type="text" id="nsFa2" placeholder="${esc(t("nsFa"))}"><input type="text" id="nsEn2" dir="ltr" placeholder="${esc(t("nsEn"))}"><button class="btn" data-act="addSubHere">${t("addBtn")}</button></span>`;
  }
  if (reorderMode && sub) {
    extra += `<button class="btn danger" data-act="delSubHere">${armed === "sub:" + sub.id ? t("sure") : t("deleteSub")}</button>`;
  }
  if (reorderMode && isFree()) {
    const ph = (S.pageH || {})[key] || 150;
    extra += `<span class="sub-add"><select id="tplSel">${Object.keys(TEMPLATES).map(k => `<option value="${k}">${esc(t("tpl_" + k))}</option>`).join("")}</select><button class="btn solid" data-act="smartLayout">${t("smartLayout")}</button><button class="btn" data-act="applyTpl">${t("applyTpl")}</button><button class="btn" data-act="addPage">${t("addPage")}</button><label class="chk-inline">${t("pageHLbl")} <input type="range" min="60" max="400" step="5" value="${ph}" data-pageh="${esc(key)}" style="width:140px"></label><span id="pageWarn" class="muted"></span></span>`;
  }
  const nameEdit = reorderMode
    ? `<div class="row" style="margin:6px 0 4px"><input type="text" id="nmFa" value="${esc(cur.fa)}" placeholder="${esc(t("nameFa"))}" style="width:200px"><input type="text" id="nmEn" dir="ltr" value="${esc(cur.en)}" placeholder="${esc(t("nameEn"))}" style="width:200px"><button class="mini" data-act="saveName">${t("save")}</button></div>`
    : "";
  const header = `${sub ? `<p class="eyebrow" style="margin-top:26px">${esc(name(main))}</p>` : ""}<h1>${esc(name(cur))}</h1>${nameEdit}${!sub ? `<p class="cat-intro">${esc(t("intro_" + route.main))}</p>` : ""}`;

  let overview = "";
  if (!sub && subsOf(route.main).length) {
    overview = `<div class="cat-cards sub-cards">${subsOf(route.main).map(s => {
      const c = P.filter(p => p.subId === s.id && p.type !== "text").sort(byNew)[0];
      return `<button class="cat-card" data-nav="#cat/${route.main}/${s.id}">
        ${c ? `<img src="${imgUrl(c.id)}" alt="" loading="lazy" style="object-position:${posOf(c)}">` : ""}
        <span class="label"><b>${esc(name(s))}</b></span></button>`;
    }).join("")}</div>`;
  }
  const chips = [`<button class="chip ${!sub ? "on" : ""}" data-nav="#cat/${route.main}">${t("viewAll")}</button>`]
    .concat(subsOf(route.main).map(s => `<button class="chip ${sub && sub.id === s.id ? "on" : ""}" data-nav="#cat/${route.main}/${s.id}">${esc(name(s))}</button>`))
    .join("");
  const list0 = pageItems();
  const list = kwFilter ? list0.filter(p => photoKw(p).includes(kwFilter)) : list0;
  const serHere = (S.series || []).filter(sr => list0.some(p => p.series === sr.id));
  const serChips = serHere.length ? `<div class="kw-chips">${serHere.map(sr => `<button class="chip" data-nav="#series/${sr.id}">${esc(name(sr))}</button>`).join("")}</div>` : "";
  const body = list.length
    ? (isFreeView() ? canvasHTML(list) : grid(list, reorderMode ? "reorder" : ""))
    : emptyBox(t("noPhotosHere"));
  return pageBar(extra) + crumbHTML + header + overview + `<div class="chips">${chips}</div>` + serChips + body;
}


function aboutHTML() {
  const a = S.about;
  const ph = a.photoId ? P.find(p => p.id === a.photoId && p.type !== "text") : null;
  if (reorderMode) {
    const photoOpts = P.filter(p => p.type !== "text").sort(byNew);
    return pageBar() + `<h1>${esc(t("about"))}</h1>
      <div class="form narrow">
        <div><label for="aBio">${esc(t("bio"))}</label><textarea id="aBio" rows="6">${esc(a.bio)}</textarea></div>
        <div><label for="aBg">${esc(t("bgLabel"))}</label><textarea id="aBg" rows="4">${esc(a.background)}</textarea></div>
        <div><label for="aAp">${esc(t("apLabel"))}</label><textarea id="aAp" rows="4">${esc(a.approach)}</textarea></div>
        ${statsEditHTML()}
        <div><label for="aEm">${esc(t("emLabel"))}</label><input type="email" id="aEm" dir="ltr" value="${esc(a.email)}"></div>
        <div><label>${esc(t("aboutPhotoLbl"))}</label>
          <img id="aPrev" class="about-preview" alt="" src="${ph ? imgUrl(ph.id) : ""}" style="${ph ? "" : "display:none"}">
          <div class="hero-picks">
            <label class="chk-inline"><input type="radio" name="aPhoto" value="" ${!ph ? "checked" : ""}> ${esc(t("noPhotoOpt"))}</label>
            ${photoOpts.map(p => `<label class="chk-inline"><input type="radio" name="aPhoto" value="${p.id}" ${ph && ph.id === p.id ? "checked" : ""}> ${esc(photoTitle(p))}</label>`).join("")}
          </div>
        </div>
        ${contactFieldsHTML()}${alignSel("aAlign", S.about.align)}<div class="row"><button class="btn solid" data-act="saveTexts">${t("saveTexts")}</button></div>
      </div>`;
  }
  const para = s => esc(s).replace(/\n/g, "<br>");
  const body = [a.bio, a.background, a.approach].some(Boolean)
    ? `${a.bio ? `<p>${para(a.bio)}</p>` : ""}
       ${a.background ? `<h3>${t("background")}</h3><p>${para(a.background)}</p>` : ""}
       ${a.approach ? `<h3>${t("approach")}</h3><p>${para(a.approach)}</p>` : ""}`
    : `<p class="muted">${t("aboutEmpty")}</p>`;
  const figure = ph
    ? `<figure class="about-photo"><img src="${imgUrl(ph.id, false, true)}" alt="${esc(photoTitle(ph))}" style="aspect-ratio:${1 / ratioOf(ph)};object-position:${posOf(ph)}"></figure>`
    : "";
  return pageBar() + `<h1>${esc(t("about"))}</h1>
    <div class="about-grid ${ph ? "has-photo" : ""}">${figure}
      <div class="about-text" style="text-align:${esc(a.align || "start")}">${body}
        ${statsHTML(a.stats)}<p class="muted contact-line">${esc(t("email"))}: <a href="mailto:${esc(a.email)}" style="color:var(--accent)">${esc(a.email)}</a></p>
      </div>
    </div>`;
}
function contactHTML() {
  const photoOpts = P.filter(p => p.type !== "text").sort(byNew)
    .map(p => `<option value="${p.id}" ${p.id === pendingPhoto ? "selected" : ""}>${esc(photoTitle(p))}</option>`).join("");
  return `<h1>${t("contactTitle")}</h1>
  <p class="narrow" style="margin:10px 0 22px">${t("contactIntro")}</p>
  <p class="muted narrow" style="font-size:.88rem">${esc(t("relNote"))}</p>
  <form id="iForm" class="form narrow" name="inquiry" data-netlify="true" data-netlify-honeypot="bot-field" novalidate>
    <p class="hp"><label>bot-field <input type="text" name="bot-field" tabindex="-1" autocomplete="off"></label></p>
    <div><label for="iName">${t("fName")}</label><input type="text" id="iName" autocomplete="name"><div class="err" id="eName"></div></div>
    <div><label for="iEmail">${t("fEmail")}</label><input type="email" id="iEmail" dir="ltr" autocomplete="email"><div class="err" id="eEmail"></div></div>
    <div><label for="iUse">${t("fUse")}</label>
      <select id="iUse">
        <option value="">${t("useNone")}</option>
        <option value="personal">${t("usePersonal")}</option>
        <option value="commercial">${t("useCommercial")}</option>
        <option value="press">${t("usePress")}</option>
        <option value="custom">${t("useCustom")}</option>
      </select><div class="err" id="eUse"></div></div>
    <div><label for="iPhoto">${t("fPhoto")}</label><select id="iPhoto"><option value="">${t("noPhotoOpt")}</option>${photoOpts}</select><div class="err" id="relWarn"></div></div>
    <div><label for="iMsg">${t("fMsg")}</label><textarea id="iMsg"></textarea><div class="err" id="eMsg"></div></div>
    <div class="row"><button class="btn solid" type="submit">${t("send")}</button></div>
    <div class="notice" id="iStatus">${t("inqNote")}</div>
  </form>`;
}

function updateRelWarn() {
  const w = $("#relWarn");
  if (!w) return;
  const p = P.find(x => x.id === $("#iPhoto").value);
  if (["commercial", "press", "custom"].includes($("#iUse").value) && p && !p.release) {
    $("#relWarn").textContent = t("relMissing");
    return;
  }
  w.textContent = ["commercial", "press", "custom"].includes($("#iUse").value) && p && !p.release ? t("relMissing") : "";
}
async function sendInquiry({ to, subject, body }) {
  // the only place to change when the form moves to Netlify Forms: replace this with a POST
  window.location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { ok: true, via: "mailto" };
}
function submitInquiry() {
  const hp = document.querySelector("input[name='bot-field']");
  if (hp && hp.value) return;
  const name_ = $("#iName").value.trim();
  const email = $("#iEmail").value.trim();
  const use = $("#iUse").value;
  const msg = $("#iMsg").value.trim();
  const pid = $("#iPhoto").value;
  ["#eName", "#eEmail", "#eUse", "#eMsg"].forEach(s => { $(s).textContent = ""; });
  let ok = true;
  if (!name_) { $("#eName").textContent = t("reqErr"); ok = false; }
  if (!email) { $("#eEmail").textContent = t("reqErr"); ok = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { $("#eEmail").textContent = t("emailErr"); ok = false; }
  if (!use) { $("#eUse").textContent = t("reqErr"); ok = false; }
  if (msg.length < 10) { $("#eMsg").textContent = t("msgErr"); ok = false; }
  if (!ok) return;

  const p = P.find(x => x.id === pid);
  const useLabel = $("#iUse").selectedOptions[0].textContent;
  const subject = `${lang === "fa" ? "استعلام لایسنس" : "License inquiry"} — KanissunPhoto`;
  const body = [
    `${lang === "fa" ? "نام" : "Name"}: ${name_}`,
    `${lang === "fa" ? "ایمیل" : "Email"}: ${email}`,
    `${lang === "fa" ? "نوع استفاده" : "Intended use"}: ${useLabel}`,
    `${lang === "fa" ? "عکس" : "Photo"}: ${p ? photoTitle(p) : "—"}`,
    "",
    msg
  ].join("\n");
  const to = S.about.email || "photokanissun@gmail.com";
  sendInquiry({ to, subject, body }).catch(showErr);
  $("#iStatus").textContent = t("mailOpened");
  pendingPhoto = "";
}

/* ---------- Admin ---------- */
function adminHTML() {
  if (!token) {
    return `<h1>${t("admin")}</h1>
    <form id="loginForm" class="form narrow">
      <div><label for="pw">${t("password")}</label><input type="password" id="pw" autocomplete="current-password" required></div>
      <div class="row"><button class="btn solid" type="submit">${t("login")}</button></div>
      <div class="err" id="loginErr"></div>
    </form>`;
  }
  const msg = ad.msg ? `<div class="notice ${ad.kind}">${esc(ad.msg)}</div>` : "";
  ad.msg = "";
  const tabs = `<div class="tabs">
    <button data-tab="photos" class="${ad.tab === "photos" ? "on" : ""}">${t("tabPhotos")}</button>
    <button data-tab="cats" class="${ad.tab === "cats" ? "on" : ""}">${t("tabCats")}</button>
    <button data-act="logout">${t("logout")}</button></div>`;
  return `<h1>${t("admin")}</h1>${tabs}${msg}${ad.tab === "photos" ? photosTabHTML() : catsTabHTML()}`;
}

function subOptions(mainId, selected) {
  return `<option value="">${t("noSub")}</option>` +
    subsOf(mainId).map(s => `<option value="${s.id}" ${s.id === selected ? "selected" : ""}>${esc(name(s))}</option>`).join("");
}
function mainOptions(selected) {
  return MAIN_IDS.map(id => `<option value="${id}" ${id === selected ? "selected" : ""}>${esc(name(mainObj(id)))}</option>`).join("");
}

function photosTabHTML() {
  const upSub = subsOf(ad.upMain).some(s => s.id === ad.upSub) ? ad.upSub : "";
  const list = P.filter(p => (!ad.filter || p.mainId === ad.filter) && (!ad.filterSub || p.subId === ad.filterSub)).sort((a, b) => groupKeyOf(a).localeCompare(groupKeyOf(b)) || byOrder(a, b));
  return `
  <div class="panel">
    <h3>${t("uploadTitle")}</h3>
    <div class="row" style="margin-bottom:10px">
      <div style="flex:1 1 200px"><label for="upMain">${t("upTarget")}</label><select id="upMain" data-ad="upMain">${mainOptions(ad.upMain)}</select></div>
      <div style="flex:1 1 200px"><label for="upSub">${t("upSub")}</label><select id="upSub" data-ad="upSub">${subOptions(ad.upMain, upSub)}</select></div>
    </div>
    <input type="file" id="upFiles" accept="image/*" multiple>
    <div class="progress"><div id="upBar"></div></div>
    <p class="muted" style="font-size:.85rem" id="upStatus">${t("upHint")}</p>
  </div>
  <div class="row" style="margin-bottom:14px">
    <label style="margin:0" for="filterSel">${t("filter")}</label>
    <select id="filterSel" data-ad="filter" style="width:auto">
      <option value="" ${!ad.filter ? "selected" : ""}>${t("allCats")}</option>${MAIN_IDS.map(id => `<option value="${id}" ${ad.filter === id ? "selected" : ""}>${esc(name(mainObj(id)))}</option>`).join("")}
    </select>
    ${ad.filter ? `<select id="subFilterSel" data-ad="filterSub" style="width:auto"><option value="">${esc(t("allSubs"))}</option>${subsOf(ad.filter).map(x => `<option value="${x.id}" ${ad.filterSub === x.id ? "selected" : ""}>${esc(name(x))}</option>`).join("")}</select>` : ""}<span class="muted">${list.length} ${t("photosCount")}</span>
  </div>
  <div class="panel" style="margin-bottom:16px"><h3>${t("backupHead")}</h3><div class="row"><button class="btn" data-act="backupDown">${t("backupBtn")}</button><label class="btn" style="cursor:pointer">${t("chooseBackup")}<input type="file" id="restoreFile" accept="application/json" style="display:none"></label></div><p class="muted" style="font-size:.85rem;margin-top:8px">${t("restoreHint")}</p>${pendingRestore ? `<button class="btn danger" data-act="restoreGo" style="margin-top:8px">${t("restoreGo")}</button>` : ""}</div>${trashPanelHTML()}<div class="panel" style="margin-bottom:16px"><h3>${t("csvHead")}</h3><div class="row"><button class="btn" data-act="csvExport">${t("csvExport")}</button><label class="btn" style="cursor:pointer">${t("csvImport")}<input type="file" id="csvFile" accept=".csv,text/csv" style="display:none"></label></div><p class="muted" style="font-size:.85rem;margin-top:8px">${t("csvHint")}</p>${csvOut ? `<p class="muted" style="font-size:.85rem">${esc(t("csvCopyHint"))}</p><textarea readonly rows="8" dir="ltr" onclick="this.select()" style="width:100%;font-family:monospace;font-size:.75rem">${esc(csvOut.replace(/^\uFEFF/, ""))}</textarea>` : ""}</div><div class="panel" style="margin-bottom:16px"><h3>${t("folderTitle")}</h3><p class="muted" style="font-size:.85rem;margin-bottom:10px">${t("folderHint")}</p><input type="file" id="folderInput" webkitdirectory directory multiple><div class="row" style="margin-top:12px"><button class="btn danger" data-act="delAllPhotos">${armed === "all:photos" ? t("sure") : t("deleteAll")}</button></div></div><div class="row" style="margin-bottom:12px"><button class="btn" data-act="addText">${t("addText")}</button><span class="muted" style="font-size:.85rem">${t("addTextHint")}</span></div><p class="muted" style="font-size:.85rem;margin-bottom:12px">${t("dragHint")}</p>${list.length ? `<div class="acards">${list.map(p => p.type === "text" ? textCardHTML(p) : photoCardHTML(p)).join("")}</div>` : emptyBox(t("noPhotos"))}`;
}

function photoCardHTML(p) {
  return `<div class="acard ${p.shape === "portrait" ? "portrait" : ""}" data-pid="${p.id}">
    <div class="pv"><img src="${imgUrl(p.id)}" alt="" loading="lazy" draggable="false" style="object-position:${posOf(p)}"></div>
    <input type="text" data-f="tfa" placeholder="${esc(t("titleFa"))}" value="${esc(p.title?.fa || "")}">
    <input type="text" data-f="ten" placeholder="${esc(t("titleEn"))}" dir="ltr" value="${esc(p.title?.en || "")}">
    <textarea data-f="dfa" rows="2" placeholder="${esc(t("descFa"))}">${esc(p.desc?.fa || "")}</textarea>
    <textarea data-f="den" rows="2" dir="ltr" placeholder="${esc(t("descEn"))}">${esc(p.desc?.en || "")}</textarea>
    <button type="button" class="mini" data-act="trCard">${esc(t("trBtn"))}</button>
    <input type="text" data-f="kw" placeholder="${esc(t("keywords"))}" value="${esc(p.keywords || "")}">
    <input type="text" data-f="kwen" dir="ltr" placeholder="${esc(t("keywordsEn"))}" value="${esc(p.keywordsEn || "")}">
    <select data-f="main" aria-label="${esc(t("upTarget"))}">${mainOptions(p.mainId)}</select>
    <select data-f="sub" aria-label="${esc(t("upSub"))}">${subOptions(p.mainId, p.subId)}</select>
    <label class="chk"><input type="checkbox" data-f="feat" ${p.featured ? "checked" : ""}> ${t("featuredLbl")}</label>
    <label class="chk"><input type="checkbox" data-f="hid" ${p.hidden ? "checked" : ""}> ${esc(t("hiddenLbl"))}</label>
    <label class="chk"><input type="checkbox" data-f="rel" ${p.release ? "checked" : ""}> ${esc(t("releaseLbl"))}</label>
    <select data-f="series" aria-label="${esc(t("seriesHead"))}">${seriesOpts(p.series)}</select>
    <div class="crop">
      <label>${t("cropX")}<input type="range" min="0" max="100" value="${p.crop?.x ?? 50}" data-f="cx"></label>
      <label>${t("cropY")}<input type="range" min="0" max="100" value="${p.crop?.y ?? 50}" data-f="cy"></label>
    </div>
    <input type="text" data-f="lic" placeholder="${esc(t("licensePh"))}" value="${esc(p.license || "")}">
    <label style="margin:0;font-size:.82rem">${t("position")}
      <input type="number" min="1" max="${groupOf(p).length}" value="${groupOf(p).findIndex(x => x.id === p.id) + 1}" data-pos="${p.id}" style="width:72px;margin-inline-start:6px;padding:4px 8px">
    </label>
    <div class="acts">
      <button class="mini" data-act="photoUp" data-id="${p.id}" aria-label="↑">↑</button>
      <button class="mini" data-act="photoDown" data-id="${p.id}" aria-label="↓">↓</button>
      <button class="mini" data-act="savePhoto" data-id="${p.id}">${t("save")}</button>
      <button class="mini" data-act="replacePhoto" data-id="${p.id}">${t("replace")}</button>
      <button class="mini danger" data-act="delPhoto" data-id="${p.id}">${esc(delLabel("p:" + p.id))}</button>
    </div>
  </div>`;
}

function textCardHTML(p) {
  return `<div class="acard textcard" data-pid="${p.id}">
    <div class="pv tv"><p>${esc(p.text || t("textPh"))}</p></div>
    <textarea data-f="text" rows="4" placeholder="${esc(t("textPh"))}">${esc(p.text || "")}</textarea>
    <select data-f="main" aria-label="${esc(t("upTarget"))}">${mainOptions(p.mainId)}</select>
    <select data-f="sub" aria-label="${esc(t("upSub"))}">${subOptions(p.mainId, p.subId)}</select>
    <label style="margin:0;font-size:.82rem">${t("position")}
      <input type="number" min="1" max="${groupOf(p).length}" value="${groupOf(p).findIndex(x => x.id === p.id) + 1}" data-pos="${p.id}" style="width:72px;margin-inline-start:6px;padding:4px 8px">
    </label>
    <div class="acts">
      <button class="mini" data-act="photoUp" data-id="${p.id}" aria-label="↑">↑</button>
      <button class="mini" data-act="photoDown" data-id="${p.id}" aria-label="↓">↓</button>
      <button class="mini" data-act="saveText" data-id="${p.id}">${t("save")}</button>
      <button class="mini danger" data-act="delPhoto" data-id="${p.id}">${esc(delLabel("p:" + p.id))}</button>
    </div>
  </div>`;
}

function catsTabHTML() {
  const blocks = MAIN_IDS.map(m => {
    const mo = mainObj(m);
    const subs = subsOf(m);
    const head = renaming === "m:" + m
      ? `<div class="row" style="margin-top:18px"><input type="text" id="rnFa" value="${esc(mo.fa)}" style="width:170px"><input type="text" id="rnEn" dir="ltr" value="${esc(mo.en)}" style="width:170px"><button class="mini" data-act="mainRenameSave" data-main="${m}">${t("save")}</button></div>`
      : `<div class="row" style="margin-top:18px"><h3 style="margin:0">${esc(name(mo))}</h3><button class="mini" data-act="mainRename" data-main="${m}">${t("rename")}</button></div>`;
    const rows = subs.length
      ? subs.map((s, i) => `
        <div class="subrow">
          <input type="text" id="sf-${s.id}" value="${esc(s.fa)}" placeholder="${esc(t("nsFa"))}">
          <input type="text" id="se-${s.id}" dir="ltr" value="${esc(s.en)}" placeholder="${esc(t("nsEn"))}">
          <span class="acts">
            <button class="mini" data-act="subSaveRow" data-main="${m}" data-sub="${s.id}">${t("save")}</button>
            <button class="mini" data-act="subUp" data-main="${m}" data-sub="${s.id}" ${i === 0 ? "disabled" : ""}>${t("up")}</button>
            <button class="mini" data-act="subDown" data-main="${m}" data-sub="${s.id}" ${i === subs.length - 1 ? "disabled" : ""}>${t("down")}</button>
            <button class="mini danger" data-act="subDel" data-main="${m}" data-sub="${s.id}">${esc(delLabel("s:" + s.id))}</button>
          </span>
        </div>`).join("")
      : `<p class="muted subrow">${t("noSubs")}</p>`;
    const addRow = `
      <div class="subrow addrow">
        <input type="text" id="af-${m}" placeholder="${esc(t("nsFa"))}">
        <input type="text" id="ae-${m}" dir="ltr" placeholder="${esc(t("nsEn"))}">
        <span class="acts"><button class="mini" data-act="addSubRow" data-main="${m}">${t("addBtn")}</button></span>
      </div>`;
    return `${head}${rows}${addRow}`;
  }).join("");
  return `
  <div class="panel">
    <h3>${t("catHead")}</h3>
    ${blocks}
  </div>
  ${tilesEditorHTML()}
  ${newsEditorHTML()}
  ${seriesEditorHTML()}
  <div class="panel">
    <h3>${t("textsHead")}</h3>
    <div class="form" style="max-width:none">
      <div><label for="aBio">${t("bio")}</label><textarea id="aBio" rows="6">${esc(S.about.bio)}</textarea></div>
      <div><label for="aBg">${t("bgLabel")}</label><textarea id="aBg" rows="4">${esc(S.about.background)}</textarea></div>
      <div><label for="aAp">${t("apLabel")}</label><textarea id="aAp" rows="4">${esc(S.about.approach)}</textarea></div>
      <div><label for="aEm">${t("emLabel")}</label><input type="email" id="aEm" dir="ltr" value="${esc(S.about.email)}"></div>
      <label class="chk-inline" style="font-size:.9rem"><input type="checkbox" id="aWm" ${S.watermark === false ? "" : "checked"}> ${t("wmLbl")}</label>${contactFieldsHTML()}${alignSel("aAlign", S.about.align)}<div class="row"><button class="btn solid" data-act="saveTexts">${t("saveTexts")}</button></div>
    </div>
  </div>`;
}

/* ---------- Admin actions ---------- */
function showErr(e) {
  ad.msg = e.message || t("err");
  ad.kind = "bad";
  render();
}

async function savePhoto(id) {
  const card = $(`.acard[data-pid="${id}"]`);
  if (!card) return;
  const g = f => $(`[data-f="${f}"]`, card);
  const mainId = g("main").value;
  let subId = g("sub").value || null;
  if (subId && !subObj(mainId, subId)) subId = null;
  const meta = {
    title: { fa: g("tfa").value.trim(), en: g("ten").value.trim() },
    desc: { fa: g("dfa").value.trim(), en: g("den") ? g("den").value.trim() : (p.desc?.en || "") },
    keywords: g("kw").value.trim(),
    keywordsEn: g("kwen") ? g("kwen").value.trim() : (p.keywordsEn || ""),
    mainId, subId,
    featured: g("feat").checked,
    crop: { x: Number(g("cx").value), y: Number(g("cy").value) },
    license: g("lic").value.trim(),
    hidden: g("hid") ? g("hid").checked : false,
    release: g("rel") ? g("rel").checked : false,
    series: g("series") ? g("series").value : ""
  };
  const r = await api("updatePhoto", { method: "POST", body: { id, meta } });
  const idx = P.findIndex(p => p.id === id);
  if (idx >= 0) P[idx] = r.photo;
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}

async function movePhoto(id, dir) {
  const p = P.find(x => x.id === id);
  if (!p) return;
  const group = P.filter(x => x.mainId === p.mainId && (x.subId || null) === (p.subId || null)).sort(byOrder);
  const i = group.findIndex(x => x.id === id), j = i + dir;
  if (i < 0 || j < 0 || j >= group.length) return;
  [group[i], group[j]] = [group[j], group[i]];
  for (let k = 0; k < group.length; k++) {
    const want = (k + 1) * 1000;
    if (group[k].order !== want) {
      group[k].order = want;
      await api("updatePhoto", { method: "POST", body: { id: group[k].id, meta: { order: want } } });
    }
  }
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}

async function deletePhoto(id) {
  await api("deletePhoto", { method: "POST", body: { id } });
  P = P.filter(p => p.id !== id);
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}

function replacePhoto(id) {
  const inp = document.createElement("input");
  inp.type = "file";
  inp.accept = "image/*";
  inp.onchange = async () => {
    const f = inp.files[0];
    if (!f) return;
    try {
      const old = P.find(p => p.id === id);
      const img = await prepareImage(f);
      const data = await blobToBase64(img.blob);
      const newId = randomId();
      const meta = { ...old, shape: img.shape, ratio: img.ratio };
      const r = await uploadPhotoApi(newId, img, meta);
      await api("deletePhoto", { method: "POST", body: { id } });
      P = P.filter(p => p.id !== id).concat(r.photo);
      ad.msg = t("saved"); ad.kind = "ok";
    } catch (e) {
      console.error(e);
      ad.msg = e.message || t("err"); ad.kind = "bad";
    }
    render();
  };
  inp.click();
}

async function uploadPhotoApi(id, img, meta) {
  const data = await blobToBase64(img.blob);
  const thumb = img.thumb ? await blobToBase64(img.thumb) : undefined;
  return api("uploadPhoto", { method: "POST", body: { id, mime: "image/jpeg", data, thumb, thumbMime: img.thumbMime, meta } });
}
async function prepareImage(file) {
  if (!file.type.startsWith("image/")) throw new Error("فایل تصویر نیست.");
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1200 / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  c.getContext("2d").drawImage(bmp, 0, 0, w, h);
  // small WebP copy for grids and tiles (about 720 px on the long side)
  const tScale = Math.min(1, 720 / Math.max(bmp.width, bmp.height));
  const tw = Math.round(bmp.width * tScale), th = Math.round(bmp.height * tScale);
  const tc = document.createElement("canvas");
  tc.width = tw; tc.height = th;
  tc.getContext("2d").drawImage(bmp, 0, 0, tw, th);
  let thumb = await new Promise(r => tc.toBlob(r, "image/webp", 0.82));
  let thumbMime = "image/webp";
  if (!thumb) { thumb = await new Promise(r => tc.toBlob(r, "image/jpeg", 0.82)); thumbMime = "image/jpeg"; }
  if (bmp.close) bmp.close();
  let blob = await new Promise(r => c.toBlob(r, "image/jpeg", 0.85));
  if (blob && blob.size > 3.5 * 1024 * 1024) blob = await new Promise(r => c.toBlob(r, "image/jpeg", 0.7));
  if (!blob) throw new Error("تبدیل تصویر ناموفق بود.");
  return { blob, shape: h > w ? "portrait" : "landscape", ratio: h / w, thumb, thumbMime };
}
function blobToBase64(blob) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(",")[1]);
    r.onerror = () => rej(r.error);
    r.readAsDataURL(blob);
  });
}

async function uploadFiles(files) {
  const list = [...files];
  if (!list.length) return;
  const mainId = ad.upMain;
  const subId = subObj(mainId, ad.upSub) ? ad.upSub : null;
  let ok = 0, fail = 0, dup = 0;
  for (let i = 0; i < list.length; i++) {
    const f = list[i];
    const bar = $("#upBar"), st = $("#upStatus");
    if (bar) bar.style.width = `${(i / list.length) * 100}%`;
    if (st) st.textContent = `${t("uploading")} ${i + 1}/${list.length}: ${f.name}`;
    const hash = await fileFingerprint(f);
    if (isDuplicate(hash)) { dup++; continue; }
    try {
      const img = await prepareImage(f);
      const data = await blobToBase64(img.blob);
      const meta = {
        title: { fa: "", en: "" }, desc: { fa: "", en: "" }, keywords: "",
        mainId, subId, featured: false, crop: { x: 50, y: 50 }, license: "",
        shape: img.shape, ratio: img.ratio, hash, name: f.name, createdAt: Date.now(), order: Date.now()
      };
      const r = await uploadPhotoApi(randomId(), img, meta);
      P.push(r.photo);
      ok++;
    } catch (e) {
      console.error(e);
      fail++;
    }
  }
  ad.msg = fail ? `${ok} ✓ / ${fail} ✗ — ${t("err")}` : `${t("uploadOk")} (${ok})`;
  if (dup) ad.msg += ` · ${dup} ${t("dupLbl")}`;
  ad.kind = fail ? "bad" : "ok";
  render();
}

async function subMove(m, s, dir) {
  const arr = S.categories.subs[m];
  const i = arr.findIndex(x => x.id === s), j = i + dir;
  if (i < 0 || j < 0 || j >= arr.length) return;
  [arr[i], arr[j]] = [arr[j], arr[i]];
  await persistSettings();
  render();
}
async function subRenameSave(m, s) {
  const o = subObj(m, s);
  if (!o) return;
  const fa = ($("#rnFa") ? $("#rnFa").value : "").trim();
  const en = ($("#rnEn") ? $("#rnEn").value : "").trim();
  o.fa = fa || o.fa;
  o.en = en || o.en;
  renaming = null;
  await persistSettings();
  render();
}
async function subDelete(m, s) {
  for (const p of P.filter(x => x.subId === s)) {
    const r = await api("updatePhoto", { method: "POST", body: { id: p.id, meta: { subId: null } } });
    const idx = P.findIndex(x => x.id === p.id);
    if (idx >= 0) P[idx] = r.photo;
  }
  S.categories.subs[m] = subsOf(m).filter(x => x.id !== s);
  await persistSettings();
  render();
}
async function subAdd() {
  const fa = $("#nsFa").value.trim();
  const en = $("#nsEn").value.trim() || fa;
  const m = $("#nsParent").value;
  if (!fa) { $("#nsErr").textContent = t("reqErr"); return; }
  const id = "s" + randomId().slice(0, 10);
  S.categories.subs[m] = subsOf(m).concat([{ id, fa, en }]);
  await persistSettings();
  render();
}
async function saveTexts() {
  S.about.bio = $("#aBio").value;
  S.about.background = $("#aBg").value;
  S.about.approach = $("#aAp").value;
  S.about.email = $("#aEm").value.trim() || "photokanissun@gmail.com";
  const chosenPhoto = document.querySelector('input[name="aPhoto"]:checked');
  if (chosenPhoto) S.about.photoId = chosenPhoto.value;
  if ($("#aAlign")) S.about.align = $("#aAlign").value;
  if ($("#cAddr")) {
    S.contact = {
      address: $("#cAddr").value.trim(), phone: $("#cPhone").value.trim(), whatsapp: $("#cWhats").value.trim(),
      instagram: $("#cInsta").value.trim(), telegram: $("#cTele").value.trim(), hours: $("#cHours").value.trim()
    };
  }
  if ($("#sv-0")) {
    S.about.stats = [0, 1, 2, 3].map(i => ({
      value: $(`#sv-${i}`).value.trim(), label: $(`#sl-${i}`).value.trim(), text: $(`#stx-${i}`).value.trim()
    })).filter(x => x.value || x.label);
  }
  if ($("#aWm")) S.watermark = $("#aWm").checked;
  await persistSettings();
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}
async function login(password) {
  const r = await api("login", { method: "POST", body: { password } });
  token = r.token;
  sessionStorage.setItem("kp-token", token);
  await loadPublic();
  render();
}

/* ---------- Title, description and caption editor for a photo ---------- */
let metaId = null;
function openMeta(id) {
  const p = P.find(x => x.id === id);
  if (!p) return;
  metaId = id;
  let m = $("#metaModal");
  if (!m) {
    m = document.createElement("div");
    m.id = "metaModal";
    m.className = "meta-modal";
    document.body.appendChild(m);
  }
  m.innerHTML = `<div class="meta-box" role="dialog" aria-modal="true">
    <img class="meta-thumb" src="${imgUrl(id)}" alt="">
    <div>
      <label for="mTfa">${esc(t("titleFa"))}</label>
      <input type="text" id="mTfa" value="${esc(p.title && p.title.fa || "")}">
    </div>
    <div>
      <label for="mTen">${esc(t("titleEn"))}</label>
      <input type="text" id="mTen" dir="ltr" value="${esc(p.title && p.title.en || "")}">
    </div>
    <div>
      <label for="mDfa">${esc(t("descFa"))}</label>
      <textarea id="mDfa">${esc(p.desc && p.desc.fa || "")}</textarea></div><div><label for="mDen">${esc(t("descEn"))}</label><textarea id="mDen" dir="ltr">${esc(p.desc && p.desc.en || "")}</textarea><button type="button" class="mini" id="mTr">${esc(t("trBtn"))}</button>
    </div>
    <div>
      <label for="mCap">${esc(t("captionPh"))}</label>
      <input type="text" id="mCap" value="${esc(p.caption || "")}">
    </div>
    <div class="row">
      <button class="btn solid" data-act="metaSave">${esc(t("save"))}</button>
      <button class="btn" data-act="metaClose">${esc(t("close"))}</button>
    </div>
  </div>`;
  m.classList.add("open");
  const first = $("#mTfa");
  if (first) first.focus();
}
function closeMeta() {
  const m = $("#metaModal");
  if (m) m.classList.remove("open");
  metaId = null;
}
async function saveMeta() {
  const id = metaId;
  if (!id) return;
  const p = P.find(x => x.id === id);
  const meta = {
    title: { fa: $("#mTfa").value.trim(), en: $("#mTen").value.trim() },
    desc: { fa: $("#mDfa").value.trim(), en: $("#mDen") ? $("#mDen").value.trim() : (p && p.desc ? p.desc.en || "" : "") },
    caption: $("#mCap").value.trim()
  };
  closeMeta();
  await saveMetaField(id, meta);
}

function syncScrollPad() {
  let pad = document.getElementById("scrollPad");
  if (!token) { if (pad) pad.remove(); return; }
  if (!pad) {
    pad = document.createElement("div");
    pad.id = "scrollPad";
    pad.className = "scroll-pad";
    pad.innerHTML = `<button data-scroll="-1" aria-label="up">▲</button><button data-scroll="1" aria-label="down">▼</button>`;
    document.body.appendChild(pad);
  }
}
/* While dragging a photo near the top or bottom edge, scroll the page */
function autoScrollAt(y) {
  const edge = 110, step = 22;
  if (y < edge) window.scrollBy(0, -step);
  else if (y > window.innerHeight - edge) window.scrollBy(0, step);
}

/* ---------- Events (تازه‌ها) editor ---------- */
function newsEditorHTML() {
  const items = S.news || [];
  const photoOpts = sel => `<option value="">—</option>` + P.filter(p => p.type !== "text").sort(byNew)
    .map(p => `<option value="${p.id}" ${sel === p.id ? "selected" : ""}>${esc(photoTitle(p))}</option>`).join("");
  const row = (n, i, isNew) => `<div class="panel newsrow">
    <div class="row">
      <input type="date" id="nd-${i}" value="${esc(n.date || "")}">
      <input type="text" id="nt-${i}" value="${esc(n.title || "")}" placeholder="${esc(t("newsTitleLbl"))}">
      <input type="text" id="np-${i}" value="${esc(n.place || "")}" placeholder="${esc(t("newsPlace"))}">
    </div>
    <textarea id="ntx-${i}" rows="3" placeholder="${esc(t("newsText"))}">${esc(n.text || "")}</textarea>
    <div class="row">
      <input type="text" id="nl-${i}" dir="ltr" value="${esc(n.link || "")}" placeholder="${esc(t("newsLink"))}">
      <select id="nph-${i}">${photoOpts(n.photoId)}</select>
    </div>
    <div class="acts">
      <button class="mini" data-act="newsSave" data-i="${i}">${esc(t(isNew ? "newsAdd" : "save"))}</button>
      ${isNew ? "" : `<button class="mini danger" data-act="newsDel" data-i="${i}">${esc(armed === "nw:" + i ? t("sure") : t("del"))}</button>`}
    </div>
  </div>`;
  return `<div class="panel"><h3>${t("newsHead")}</h3>
    ${items.length ? items.map((n, i) => row(n, i, false)).join("") : `<p class="muted">${esc(t("newsEmpty"))}</p>`}
    ${row({}, "new", true)}
  </div>`;
}
function readNewsRow(i) {
  const g = k => $(`#${k}-${i}`);
  return {
    date: g("nd").value, title: g("nt").value.trim(), place: g("np").value.trim(),
    text: g("ntx").value.trim(), link: g("nl").value.trim(), photoId: g("nph").value || ""
  };
}
async function newsSave(i) {
  const d = readNewsRow(i);
  if (!d.date || !d.title) { ad.msg = t("reqErr"); ad.kind = "bad"; render(); return; }
  S.news = S.news || [];
  if (i === "new") S.news.push({ id: randomId().slice(0, 12), ...d });
  else S.news[Number(i)] = { ...S.news[Number(i)], ...d };
  S.news.sort((a, b) => a.date.localeCompare(b.date));
  await persistSettings();
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}
async function newsDel(i) {
  S.news.splice(Number(i), 1);
  await persistSettings();
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}

/* Smooth motion: sections and cards rise in as they enter the view; images fade in once loaded */
let motionIO = null;
function markMotion() {
  if (reorderMode) return;
  const sel = [
    "#app .sec-head", "#app .news-card", "#app .stat-card", "#app .about-text", "#app .home-about",
    "#app .cat-cards:not(.stack) .cat-card", "#app .grid .thumb",
    ".site-contact .sc-strip", ".site-contact .sc-cta", ".site-contact .sc-brand",
    ".site-contact .sc-details", ".site-contact .sc-nav", ".site-contact .sc-icons", ".site-contact .sc-copy"
  ];
  document.querySelectorAll(sel.join(",")).forEach((el, i) => {
    if (el.classList.contains("mv")) return;
    el.classList.add("mv");
    el.style.setProperty("--d", `${(i % 6) * 0.07}s`);
  });
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".mv").forEach(el => el.classList.add("on"));
    return;
  }
  if (!motionIO) {
    motionIO = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("on"); motionIO.unobserve(en.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  }
  document.querySelectorAll(".mv:not(.on)").forEach(el => motionIO.observe(el));
}
document.addEventListener("load", e => { if (e.target.tagName === "IMG") e.target.classList.add("loaded"); }, true);

/* Soft focus on gallery photos: sharpen on hover (mouse) or when scrolled into view (touch) */
let revealIO = null;
function initReveal() {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const touch = window.matchMedia && window.matchMedia("(hover: none)").matches;
  if (!touch) return;
  if (!revealIO) {
    revealIO = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) en.target.classList.add("in"); });
    }, { threshold: 0.4 });
  }
  document.querySelectorAll(".thumb:not(.in)").forEach(el => revealIO.observe(el));
}

/* ---------- Keywords, series, photo links ---------- */
let kwFilter = null;
let csvOut = null;
const splitKw = v => String(v || "").split(/[,،]/).map(x => x.trim()).filter(Boolean);
const photoKw = p => [...splitKw(p.keywords), ...splitKw(p.keywordsEn)].map(x => x.toLowerCase());
function kwChipsHTML(list) {
  const seen = new Map();
  list.forEach(p => [...splitKw(p.keywords), ...splitKw(p.keywordsEn)].forEach(k => {
    const key = k.toLowerCase();
    if (!seen.has(key)) seen.set(key, k);
  }));
  if (!seen.size) return "";
  return `<div class="kw-chips">${[...seen.entries()].map(([key, k]) =>
    `<button class="chip ${kwFilter === key ? "on" : ""}" data-kw="${esc(key)}">${esc(k)}</button>`).join("")}</div>`;
}
function seriesOpts(sel) {
  return `<option value="">${esc(t("seriesNone"))}</option>` + (S.series || []).map(x =>
    `<option value="${esc(x.id)}" ${sel === x.id ? "selected" : ""}>${esc(name(x))}</option>`).join("");
}
function seriesHTML() {
  const sr = (S.series || []).find(x => x.id === route.id);
  if (!sr) return emptyBox(t("noPhotos"));
  const list = P.filter(p => p.series === sr.id && p.type !== "text").sort(byOrder);
  return `<nav class="crumbs"><button data-nav="#home">${esc(t("home"))}</button> <span>←</span> <span>${esc(name(sr))}</span></nav>
    <h1>${esc(name(sr))}</h1>
    ${sr.intro ? `<p class="cat-intro">${esc(sr.intro).replace(/\n/g, "<br>")}</p>` : ""}
    ${list.length ? grid(list, "") : emptyBox(t("noPhotosHere"))}`;
}
async function seriesSave(i) {
  const d = { fa: ($("#sfa-" + i).value || "").trim(), en: ($("#sen-" + i).value || "").trim(), intro: ($("#sin-" + i).value || "").trim() };
  if (!d.fa && !d.en) { ad.msg = t("reqErr"); ad.kind = "bad"; render(); return; }
  S.series = S.series || [];
  if (i === "new") S.series.push({ id: randomId().slice(0, 10), ...d });
  else S.series[Number(i)] = { ...S.series[Number(i)], ...d };
  await persistSettings();
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}
async function seriesDel(i) {
  const sr = (S.series || [])[Number(i)];
  if (!sr) return;
  for (const p of P.filter(x => x.series === sr.id)) {
    await api("updatePhoto", { method: "POST", body: { id: p.id, meta: { series: "" } } });
    p.series = "";
  }
  S.series.splice(Number(i), 1);
  await persistSettings();
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}
function seriesEditorHTML() {
  const list = S.series || [];
  const row = (x, i, isNew) => `<div class="panel newsrow">
    <div class="row">
      <input type="text" id="sfa-${i}" value="${esc(x.fa || "")}" placeholder="${esc(t("nsFa"))}">
      <input type="text" id="sen-${i}" dir="ltr" value="${esc(x.en || "")}" placeholder="${esc(t("nsEn"))}">
    </div>
    <textarea id="sin-${i}" rows="3" placeholder="${esc(t("seriesIntroLbl"))}">${esc(x.intro || "")}</textarea>
    <div class="acts">
      <button class="mini" data-act="seriesSave" data-i="${i}">${esc(t(isNew ? "addBtn" : "save"))}</button>
      ${isNew ? "" : `<button class="mini danger" data-act="seriesDel" data-i="${i}">${esc(armed === "se:" + i ? t("sure") : t("del"))}</button>`}
    </div>
  </div>`;
  return `<div class="panel"><h3>${t("seriesHead")}</h3>
    ${list.map((x, i) => row(x, i, false)).join("") || `<p class="muted">${esc(t("noSubs"))}</p>`}
    <h3>${t("seriesAdd")}</h3>
    ${row({}, "new", true)}
  </div>`;
}
function openPhotoFromRoute() {
  const ids = $$("[data-open]", $("#app")).map(x => x.dataset.open);
  const i = ids.indexOf(route.openPhoto);
  if (i >= 0) openViewer(ids, i);
}
async function copyPhotoLink(id) {
  const url = `${location.origin}${location.pathname}#photo/${id}`;
  const msg = $("#vMeta");
  try {
    await navigator.clipboard.writeText(url);
    msg.textContent = t("copied");
  } catch (e) {
    msg.textContent = url;
  }
}

/* ---------- Subcategory rows in the categories tab ---------- */
async function subSaveRow(m, s) {
  const o = subObj(m, s);
  if (!o) return;
  const fa = ($("#sf-" + s).value || "").trim();
  const en = ($("#se-" + s).value || "").trim();
  o.fa = fa || o.fa;
  o.en = en || o.en;
  await persistSettings();
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}
async function addSubRow(m) {
  const fa = ($("#af-" + m).value || "").trim();
  const en = ($("#ae-" + m).value || "").trim() || fa;
  if (!fa) { ad.msg = t("reqErr"); ad.kind = "bad"; render(); return; }
  S.categories.subs[m] = subsOf(m).concat([{ id: "s" + randomId().slice(0, 10), fa, en }]);
  await persistSettings();
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}

/* ---------- Subcategories on the page ---------- */
async function addSubHere() {
  const fa = ($("#nsFa2") ? $("#nsFa2").value : "").trim();
  const en = ($("#nsEn2") ? $("#nsEn2").value : "").trim() || fa;
  if (!fa) { ad.msg = t("reqErr"); ad.kind = "bad"; render(); return; }
  S.categories.subs[route.main] = subsOf(route.main).concat([{ id: "s" + randomId().slice(0, 10), fa, en }]);
  await persistSettings();
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}

/* ---------- Duplicate detection, bulk delete, main rename ---------- */
async function fileFingerprint(file) {
  try {
    const d = await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
    return Array.from(new Uint8Array(d)).map(b => b.toString(16).padStart(2, "0")).join("");
  } catch (_) {
    return `${file.size}-${file.name}`;
  }
}
const isDuplicate = h => P.some(p => p.hash && p.hash === h);
async function deleteAllPhotos() {
  const list = P.filter(p => p.type !== "text");
  for (const p of list) await api("deletePhoto", { method: "POST", body: { id: p.id } });
  P = P.filter(p => p.type === "text");
  undoStack.length = 0;
  ad.msg = `${t("deletedAll")}: ${list.length}`; ad.kind = "ok";
  render();
}
async function saveMainRename(m) {
  const o = S.categories.main.find(x => x.id === m);
  if (!o) return;
  o.fa = $("#rnFa").value.trim() || o.fa;
  o.en = $("#rnEn").value.trim() || o.en;
  renaming = null;
  await persistSettings();
  render();
}

/* ---------- Automatic translation of the Persian description ---------- */
async function translateFa(text) {
  const res = await api("translate", { method: "POST", body: { text } });
  return (res && res.text) || "";
}
async function trModal() {
  const btn = $("#mTr"), src = $("#mDfa").value.trim();
  if (!src) return;
  btn.disabled = true;
  try { $("#mDen").value = await translateFa(src); }
  catch (e) { showErr(new Error(t("trFail"))); }
  finally { btn.disabled = false; }
}
async function trCard(act) {
  let box = act;
  while (box && !box.querySelector('[data-f="dfa"]')) box = box.parentElement;
  if (!box) return;
  const src = box.querySelector('[data-f="dfa"]').value.trim();
  if (!src) return;
  act.disabled = true;
  try { box.querySelector('[data-f="den"]').value = await translateFa(src); }
  catch (e) { showErr(new Error(t("trFail"))); }
  finally { act.disabled = false; }
}

/* ---------- Bulk titles and captions (CSV) ---------- */
function exportCsv() {
  const cols = ["id", "file", "category", "subcategory", "title_fa", "title_en", "desc_fa", "desc_en", "caption", "keywords_fa", "keywords_en", "release", "series"];
  const q = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [cols.join(",")].concat(P.filter(p => p.type !== "text").sort(byOrder).map(p => {
    const m = mainObj(p.mainId), sb = p.subId ? subObj(p.mainId, p.subId) : null;
    return [p.id, p.name || "", m.fa, sb ? sb.fa : "", p.title?.fa || "", p.title?.en || "", p.desc?.fa || "", p.desc?.en || "",
      p.caption || "", p.keywords || "", p.keywordsEn || "", p.release ? "yes" : "no", p.series || ""].map(q).join(",");
  }));
  csvOut = "\uFEFF" + lines.join("\n");
  ad.msg = t("csvShown"); ad.kind = "ok";
  render();
  const url = URL.createObjectURL(new Blob([csvOut], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `kanissunphoto-photos-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else quoted = false; }
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows.filter(r => r.some(x => x !== ""));
}
async function importCsv(file) {
  const rows = parseCsv((await file.text()).replace(/^\uFEFF/, ""));
  const head = rows.shift() || [];
  const iId = head.indexOf("id"), iFile = head.indexOf("file");
  if (iId < 0 && iFile < 0) throw new Error(t("csvBad"));
  const get = (r, n) => (head.indexOf(n) >= 0 ? (r[head.indexOf(n)] || "").trim() : null);
  let n = 0;
  for (const r of rows) {
    // match by id, or by the original file name (for example 001.jpg) when the id is empty
    const id0 = iId >= 0 ? (r[iId] || "").trim() : "";
    const fn = iFile >= 0 ? (r[iFile] || "").trim() : "";
    const p = (id0 && P.find(x => x.id === id0)) || (fn && P.find(x => x.name === fn));
    if (!p) continue;
    const id = p.id;
    const meta = {
      title: { fa: get(r, "title_fa") ?? (p.title?.fa || ""), en: get(r, "title_en") ?? (p.title?.en || "") },
      desc: { fa: get(r, "desc_fa") ?? (p.desc?.fa || ""), en: get(r, "desc_en") ?? (p.desc?.en || "") },
      caption: get(r, "caption") ?? (p.caption || ""),
      keywords: get(r, "keywords_fa") ?? (p.keywords || ""),
      keywordsEn: get(r, "keywords_en") ?? (p.keywordsEn || "")
    };
    // category and subcategory from the list (by their Persian names), so photos land in the right page
    const catName = get(r, "category"), subName = get(r, "subcategory");
    const mainHit = catName ? MAIN_IDS.find(mid => mainObj(mid).fa === catName) : null;
    if (mainHit) {
      meta.mainId = mainHit;
      const subHit = subName ? subsOf(mainHit).find(x => x.fa === subName) : null;
      meta.subId = subHit ? subHit.id : null;
    }
    const res = await api("updatePhoto", { method: "POST", body: { id, meta } });
    const idx = P.findIndex(x => x.id === id);
    if (idx >= 0) P[idx] = res.photo;
    n++;
  }
  ad.msg = `${t("csvDone")}: ${n}`; ad.kind = "ok";
  render();
}

/* ---------- Folder upload ---------- */
const normName = s => String(s || "").normalize("NFKC").toLowerCase()
  .replace(/&/g, " ").replace(/\band\b/g, " ")
  .replace(/[\s\u200c\u200b\u200d\u00a0\-_.,،'’"`]+/g, "")
  .replace(/ي/g, "ی").replace(/ك/g, "ک");
function findMain(seg) {
  const n = normName(seg);
  return MAIN_IDS.find(id => [mainObj(id).fa, mainObj(id).en].some(x => normName(x) === n)) || null;
}
function findSub(mainId, seg) {
  const n = normName(seg);
  return subsOf(mainId).find(s => [s.fa, s.en].some(x => normName(x) === n)) || null;
}
function locateFile(file) {
  const parts = (file.webkitRelativePath || file.name).split("/").slice(0, -1);
  let mainId = null, subId = null, subMiss = "";
  for (const seg of parts) {
    if (!mainId) { mainId = findMain(seg); continue; }
    if (!subId) {
      const sub = findSub(mainId, seg);
      if (sub) subId = sub.id; else subMiss = seg;
    }
  }
  return { mainId, subId, subMiss, parent: parts[parts.length - 1] || "" };
}
async function uploadFolder(fileList) {
  const files = [...fileList]
    .filter(f => f.type.startsWith("image/") && !f.name.startsWith("."))
    .sort((a, b) => (a.webkitRelativePath || a.name).localeCompare(b.webkitRelativePath || b.name, "en"));
  if (!files.length) { ad.msg = t("noImages"); ad.kind = "bad"; render(); return; }
  const base = Date.now();
  let ok = 0, skipped = 0, dup = 0;
  const unknown = new Set();
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const loc = locateFile(f);
    if (!loc.mainId) { skipped++; unknown.add(loc.parent || f.name); continue; }
    if (loc.subMiss) unknown.add(loc.subMiss);
    const bar = $("#upBar"), st = $("#upStatus");
    if (bar) bar.style.width = `${(i / files.length) * 100}%`;
    if (st) st.textContent = `${t("uploading")} ${i + 1}/${files.length}: ${f.name}`;
    const hash = await fileFingerprint(f);
    if (isDuplicate(hash)) { dup++; continue; }
    try {
      const img = await prepareImage(f);
      const data = await blobToBase64(img.blob);
      const meta = {
        title: { fa: "", en: "" }, desc: { fa: "", en: "" }, keywords: "",
        mainId: loc.mainId, subId: loc.subId, featured: false, crop: { x: 50, y: 50 }, license: "",
        shape: img.shape, ratio: img.ratio, hash, name: f.name, createdAt: base + i, order: base + i
      };
      const r = await uploadPhotoApi(randomId(), img, meta);
      P.push(r.photo);
      ok++;
    } catch (e) {
      console.error(e);
      skipped++;
    }
  }
  const names = [...unknown].slice(0, 12).join("، ");
  ad.msg = `${t("folderDone")}: ${ok} ✓${skipped ? ` · ${skipped} ✗` : ""}` + (names ? ` — ${t("unknownFolders")}: ${names}` : "");
  if (dup) ad.msg += ` · ${dup} ${t("dupLbl")}`;
  ad.kind = skipped || unknown.size ? "bad" : "ok";
  render();
}

/* ---------- Viewer ---------- */
function openViewer(ids, i) {
  vIds = ids; vI = Math.max(0, i);
  $("#viewer").classList.add("open");
  document.body.style.overflow = "hidden";
  showViewer();
}
function closeViewer() {
  $("#viewer").classList.remove("open");
  document.body.style.overflow = "";
}
function showViewer() {
  const p = P.find(x => x.id === vIds[vI]);
  if (!p) return;
  const img = $("#vImg");
  img.src = imgUrl(p.id, false, true);
  img.alt = photoTitle(p);
  $("#vTitle").textContent = photoTitle(p);
  $("#vDesc").textContent = photoDesc(p);
  const m = mainObj(p.mainId);
  const s = p.subId ? subObj(p.mainId, p.subId) : null;
  $("#vMeta").textContent = [name(m), s ? name(s) : ""].filter(Boolean).join(" · ");
  $("#vLic").textContent = p.license ? `${lang === "fa" ? "شرایط لایسنس" : "License"}: ${p.license}` : "";
  $("#vCount").textContent = `${vI + 1} / ${vIds.length}`;
  $("#vWm").style.display = S.watermark === false ? "none" : "";
  $("#vCopy").textContent = t("copyLink");
  const multi = vIds.length > 1;
  $("#vPrev").classList.toggle("hidden", !multi);
  $("#vNext").classList.toggle("hidden", !multi);
}
function vNav(d) {
  if (vIds.length < 2) return;
  vI = (vI + d + vIds.length) % vIds.length;
  showViewer();
}

/* ---------- Render ---------- */
function render() {
  route = parseHash();
  if (!token || !["home", "about", "cat"].includes(route.name)) reorderMode = false;
  if (route.name === "cat") { /* message shown once in the gallery toolbar */ }
  applyLang();
  buildNav();
  let html = "";
  if (route.name === "home") html = homeHTML();
  else if (route.name === "cat") html = catHTML();
  else if (route.name === "about") html = aboutHTML();
  else if (route.name === "contact") html = contactHTML();
  else if (route.name === "admin") html = adminHTML();
  else if (route.name === "news") html = newsHTML();
  else if (route.name === "series") html = seriesHTML();
  $("#app").innerHTML = html + (route.name === "admin" ? "" : siteContactHTML());
  syncScrollPad();
  initReveal();
  markMotion();
  $("#app").classList.remove("page-in");
  void $("#app").offsetWidth;
  $("#app").classList.add("page-in");
  $("#app").style.background = route.name === "cat" && S.bgs && S.bgs[layoutKey()] ? S.bgs[layoutKey()] : "";
  if (route.name === "cat" && isFreeView()) requestAnimationFrame(layoutCanvas);
  if (route.name === "home") requestAnimationFrame(startHero);
  if (route.name === "home") requestAnimationFrame(setupArc);
  if (route.openPhoto) requestAnimationFrame(openPhotoFromRoute);
  if (focusId) { const ta = $(`[data-inline="${focusId}"]`); if (ta) ta.focus(); focusId = null; }
  $("#mainNav").classList.remove("open");
  $("#menuToggle").setAttribute("aria-expanded", "false");
}

/* ---------- Drag & drop reordering (admin cards and gallery in reorder mode) ---------- */
let pd = null;
let justDragged = false;
// Block the browser's native image drag (it shows the 'no drop' cursor and cancels our custom drag)
document.addEventListener("dragstart", e => e.preventDefault());
document.addEventListener("contextmenu", e => { if (e.target && e.target.tagName === "IMG") e.preventDefault(); });
document.addEventListener("pointerdown", e => {
  justDragged = false;
  if (e.button !== 0 || !e.target.closest) return;
  if (e.target.closest("textarea,input,select,button")) return;
  const card = e.target.closest(".acard .pv")
    ? e.target.closest(".acard[data-pid]")
    : e.target.closest(".grid.reorder [data-pid], .canvas.edit [data-pid]");
  if (!card) return;
  pd = { id: card.dataset.pid, card, pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, active: false, ghost: null, over: null, free: !!card.closest(".canvas"), dx: 0, dy: 0, resize: !!e.target.closest(".rh"), w0: itemW(P.find(x => x.id === card.dataset.pid) || {}) };
});
document.addEventListener("pointermove", e => {
  if (!pd || e.pointerId !== pd.pointerId) return;
  if (pd.active) autoScrollAt(e.clientY);
  if (pd.free) {
    if (!pd.active) {
      if (Math.hypot(e.clientX - pd.startX, e.clientY - pd.startY) < 6) return;
      pd.active = true;
      pd.start = { left: pd.card.offsetLeft, top: pd.card.offsetTop };
      pd.card.classList.add("dragging");
      document.body.classList.add("is-dragging");
      try { pd.card.setPointerCapture(e.pointerId); } catch (_) {}
    }
    e.preventDefault();
    if (pd.resize) {
      const W = pd.card.parentElement.getBoundingClientRect().width || 1;
      pd.newW = Math.min(100, Math.max(10, pd.w0 + ((e.clientX - pd.startX) / W) * 100));
      pd.card.style.width = pd.newW + "cqw";
      return;
    }
    pd.dx = e.clientX - pd.startX;
    pd.dy = e.clientY - pd.startY;
    pd.card.style.transform = `translate(${pd.dx}px, ${pd.dy}px)`;
    return;
  }
  if (!pd.active) {
    if (Math.hypot(e.clientX - pd.startX, e.clientY - pd.startY) < 6) return;
    pd.active = true;
    pd.card.classList.add("dragging");
    document.body.classList.add("is-dragging");
    const img = pd.card.querySelector("img");
    pd.ghost = document.createElement("img");
    pd.ghost.src = img ? img.src : "";
    pd.ghost.className = "drag-ghost";
    document.body.appendChild(pd.ghost);
    try { pd.card.setPointerCapture(e.pointerId); } catch (_) {}
  }
  e.preventDefault();
  pd.ghost.style.left = e.clientX + "px";
  pd.ghost.style.top = e.clientY + "px";
  pd.ghost.style.display = "none";
  const under = document.elementFromPoint(e.clientX, e.clientY);
  pd.ghost.style.display = "";
  const over = under && under.closest ? under.closest(".acard[data-pid], .grid.reorder [data-pid]") : null;
  const from = P.find(x => x.id === pd.id);
  const to = over ? P.find(x => x.id === over.dataset.pid) : null;
  const valid = !!(from && to && from.id !== to.id && groupKeyOf(from) === groupKeyOf(to));
  $$(".drop-target").forEach(c => c.classList.remove("drop-target"));
  if (valid) over.classList.add("drop-target");
  pd.over = valid ? over.dataset.pid : null;
});
function endPointerDrag(commit) {
  if (!pd) return;
  const st = pd;
  if (st.active) justDragged = true;
  pd = null;
  if (st.free) {
    $$(".dragging").forEach(c => c.classList.remove("dragging"));
    document.body.classList.remove("is-dragging");
    if (st.resize) {
      if (st.active && commit && st.newW) saveResize(st).catch(showErr);
      else render();
      return;
    }
    if (st.active && commit) dropFree(st).catch(showErr);
    else { st.card.style.transform = ""; }
    return;
  }
  if (st.ghost) st.ghost.remove();
  document.body.classList.remove("is-dragging");
  $$(".dragging,.drop-target").forEach(c => c.classList.remove("dragging", "drop-target"));
  if (st.active && commit && st.over) dropPhoto(st.id, st.over).catch(showErr);
}
document.addEventListener("pointerup", () => endPointerDrag(true));
document.addEventListener("pointercancel", () => endPointerDrag(false));

async function addText() {
  const meta = {
    type: "text", text: "", title: { fa: "", en: "" }, desc: { fa: "", en: "" }, keywords: "",
    mainId: ad.upMain, subId: subObj(ad.upMain, ad.upSub) ? ad.upSub : null,
    featured: false, crop: { x: 50, y: 50 }, license: "", createdAt: Date.now(), order: Date.now()
  };
  const r = await api("createText", { method: "POST", body: { id: randomId(), meta } });
  P.push(r.photo);
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}

async function saveText(id) {
  const card = $(`.acard[data-pid="${id}"]`);
  if (!card) return;
  const g = f => $(`[data-f="${f}"]`, card);
  const mainId = g("main").value;
  let subId = g("sub").value || null;
  if (subId && !subObj(mainId, subId)) subId = null;
  const r = await api("updatePhoto", { method: "POST", body: { id, meta: { text: g("text").value.trim(), mainId, subId } } });
  const idx = P.findIndex(x => x.id === id);
  if (idx >= 0) P[idx] = r.photo;
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}

async function saveInline(id, text) {
  try {
    const r = await api("updatePhoto", { method: "POST", body: { id, meta: { text } } });
    const idx = P.findIndex(x => x.id === id);
    if (idx >= 0) P[idx] = r.photo;
    ad.msg = t("saved"); ad.kind = "ok";
  } catch (e) {
    ad.msg = e.message || t("err"); ad.kind = "bad";
  }
  render();
}

async function toggleLayout() {
  S.layouts = S.layouts || {};
  const key = layoutKey();
  if (!S.layouts[key]) {
    const changed = placeMissing(pageItems());
    for (const p of changed) {
      await api("updatePhoto", { method: "POST", body: { id: p.id, meta: { x: p.x, y: p.y, w: p.w } } });
    }
    S.layouts[key] = true;
  } else {
    delete S.layouts[key];
  }
  await persistSettings();
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}

async function dropFree(st) {
  const canvas = st.card.parentElement;
  const W = canvas.getBoundingClientRect().width || 1;
  const p = P.find(x => x.id === st.id);
  if (!p) return;
  const w = itemW(p);
  let x = ((st.start.left + st.dx) / W) * 100;
  let y = ((st.start.top + st.dy) / W) * 100;
  x = Math.round(Math.min(100 - w, Math.max(0, x)) * 10) / 10;
  const H = (S.pageH || {})[layoutKey()] || 150;
  y = Math.min(y, Math.max(0, H - (st.card.offsetHeight / W) * 100));
  y = Math.round(Math.max(0, y) * 10) / 10;
  await api("updatePhoto", { method: "POST", body: { id: p.id, meta: { x, y, w } } });
  p.x = x; p.y = y; p.w = w;
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}

async function setSize(id, w) {
  const p = P.find(x => x.id === id);
  if (!p) return;
  await api("updatePhoto", { method: "POST", body: { id, meta: { w } } });
  p.w = w;
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}

async function movePhotoTo(id, newPos) {
  const p = P.find(x => x.id === id);
  if (!p) return;
  const rest = groupOf(p).filter(x => x.id !== id);
  const idx = Math.min(Math.max(1, Math.round(Number(newPos) || 1)), rest.length + 1) - 1;
  rest.splice(idx, 0, p);
  await saveOrder(rest);
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}

async function saveOrder(list) {
  for (let k = 0; k < list.length; k++) {
    const want = (k + 1) * 1000;
    if (list[k].order !== want) {
      list[k].order = want;
      await api("updatePhoto", { method: "POST", body: { id: list[k].id, meta: { order: want } } });
    }
  }
}

async function dropPhoto(fromId, toId) {
  const from = P.find(x => x.id === fromId), to = P.find(x => x.id === toId);
  if (!from || !to || from.id === to.id || groupKeyOf(from) !== groupKeyOf(to)) return;
  const group = P.filter(x => groupKeyOf(x) === groupKeyOf(from)).sort(byOrder);
  const rest = group.filter(x => x.id !== fromId);
  rest.splice(rest.findIndex(x => x.id === toId), 0, from);
  for (let k = 0; k < rest.length; k++) {
    const want = (k + 1) * 1000;
    if (rest[k].order !== want) {
      rest[k].order = want;
      await api("updatePhoto", { method: "POST", body: { id: rest[k].id, meta: { order: want } } });
    }
  }
  ad.msg = t("saved"); ad.kind = "ok";
  render();
}

/* ---------- Events ---------- */
async function addTextAt(canvasEl, clientX, clientY) {
  const rect = canvasEl.getBoundingClientRect();
  const W = rect.width || 1;
  const w = 40;
  const x = Math.round(Math.min(100 - w, Math.max(0, ((clientX - rect.left) / W) * 100)) * 10) / 10;
  const y = Math.round(Math.max(0, ((clientY - rect.top) / W) * 100) * 10) / 10;
  const sub = route.sub ? subObj(route.main, route.sub) : null;
  const meta = {
    type: "text", text: "", title: { fa: "", en: "" }, desc: { fa: "", en: "" }, keywords: "",
    mainId: route.main, subId: sub ? sub.id : null, featured: false, crop: { x: 50, y: 50 },
    license: "", createdAt: Date.now(), order: Date.now(), x, y, w, page: Number(canvasEl.dataset.page) || 1
  };
  try {
    const r = await api("createText", { method: "POST", body: { id: randomId(), meta } });
    P.push(r.photo);
    focusId = r.photo.id;
    ad.msg = t("saved"); ad.kind = "ok";
  } catch (e) {
    ad.msg = e.message || t("err"); ad.kind = "bad";
  }
  render();
}

function onClick(e) {
  if (e.target.id === "mTr") { trModal(); return; }
  const kwb = e.target.closest && e.target.closest("[data-kw]");
  if (kwb) { const k = kwb.dataset.kw; kwFilter = kwFilter === k ? null : k; render(); return; }
  const scrollBtn = e.target.closest && e.target.closest("[data-scroll]");
  if (scrollBtn) {
    window.scrollBy({ top: Number(scrollBtn.dataset.scroll) * window.innerHeight * 0.7, behavior: "smooth" });
    return;
  }
  if (justDragged) { justDragged = false; return; }
  const figEdit = e.target.closest && e.target.closest("[data-open]");
  if (figEdit && reorderMode && !e.target.closest("button,select,input,textarea,[data-act]")) {
    openMeta(figEdit.dataset.open);
    return;
  }
  const dot = e.target.closest && e.target.closest("[data-slide]");
  if (dot) { showSlide(Number(dot.dataset.slide)); return; }
  if (e.target.closest && e.target.closest("[data-scrolldown]")) {
    window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
    return;
  }
  const canvasEl = e.target.closest && e.target.closest(".canvas[data-page]");
  if (canvasEl && reorderMode && e.target === canvasEl) {
    addTextAt(canvasEl, e.clientX, e.clientY);
    return;
  }
  const fig = e.target.closest("[data-open]");
  if (fig && !reorderMode) {
    const ids = $$("[data-open]", fig.closest(".grid") || $("#app")).map(x => x.dataset.open);
    openViewer(ids, ids.indexOf(fig.dataset.open));
    return;
  }
  const nav = e.target.closest("[data-nav]");
  if (nav) {
    // Mobile: a top-level category button toggles its subcategory list
    if (window.innerWidth <= 860 && nav.nextElementSibling && nav.nextElementSibling.classList.contains("menu")) {
      nav.parentElement.classList.toggle("open");
      return;
    }
    navigate(nav.dataset.nav);
    return;
  }
  const tab = e.target.closest("[data-tab]");
  if (tab) { ad.tab = tab.dataset.tab; render(); return; }
  const act = e.target.closest("[data-act]");
  if (!act) return;
  const a = act.dataset.act, id = act.dataset.id, m = act.dataset.main, s = act.dataset.sub;
  const run = fn => Promise.resolve().then(fn).then(() => {
    if (!ad.msg) { ad.msg = t("saved"); ad.kind = "ok"; render(); }
  }).catch(showErr);
  switch (a) {
    case "logout": run(async () => { token = ""; sessionStorage.removeItem("kp-token"); await loadPublic(); render(); }); break;
    case "toggleReorder": reorderMode = !reorderMode; render(); break;
    case "toggleLayout": run(toggleLayout); break;
    case "undo": run(undo); break;
    case "saveHero": run(saveHero); break;
    case "saveName": run(saveName); break;
    case "toggleHidden": run(toggleHidden); break;
    case "tBold": { const cur0 = P.find(x => x.id === id); run(() => saveStyle(id, { bold: !(cur0 && cur0.style && cur0.style.bold) })); break; }
    case "sizeItem": run(() => setSize(id, Number(act.dataset.w))); break;
    case "savePhoto": run(() => savePhoto(id)); break;
    case "addText": run(addText); break;
    case "addTextHere": run(() => { ad.upMain = route.main; ad.upSub = route.sub || ""; return addText(); }); break;
    case "saveText": run(() => saveText(id)); break;
    case "photoUp": run(() => movePhoto(id, -1)); break;
    case "photoDown": run(() => movePhoto(id, 1)); break;
    case "replacePhoto": replacePhoto(id); break;
    case "delPhoto":
      if (armed === "p:" + id) { armed = null; run(() => deletePhoto(id)); }
      else arm("p:" + id);
      break;
    case "subUp": run(() => subMove(m, s, -1)); break;
    case "subDown": run(() => subMove(m, s, 1)); break;
    case "subRename": renaming = s; render(); break;
    case "subDel":
      if (armed === "s:" + s) { armed = null; run(() => subDelete(m, s)); }
      else arm("s:" + s);
      break;
    case "subRenameSave": run(() => subRenameSave(m, s)); break;
    case "mainRename": renaming = "m:" + m; render(); break;
    case "addSubHere": run(addSubHere); break;
    case "newsSave": run(() => newsSave(act.dataset.i)); break;
    case "seriesSave": run(() => seriesSave(act.dataset.i)); break;
    case "seriesDel":
      if (armed === "se:" + act.dataset.i) { armed = null; run(() => seriesDel(act.dataset.i)); }
      else arm("se:" + act.dataset.i);
      break;
    case "newsDel":
      if (armed === "nw:" + act.dataset.i) { armed = null; run(() => newsDel(act.dataset.i)); }
      else arm("nw:" + act.dataset.i);
      break;
    case "tileUp": { const i = Number(act.dataset.i); const l = currentTiles(); if (i > 0) { [l[i - 1], l[i]] = [l[i], l[i - 1]]; run(() => tilesSave(l)); } break; }
    case "tileDown": { const i = Number(act.dataset.i); const l = currentTiles(); if (i < l.length - 1) { [l[i + 1], l[i]] = [l[i], l[i + 1]]; run(() => tilesSave(l)); } break; }
    case "tileDel": { const i = Number(act.dataset.i); const l = currentTiles(); l.splice(i, 1); run(() => tilesSave(l)); break; }
    case "tileAdd": { const l = currentTiles(); l.push($("#tileNew").value); run(() => tilesSave(l)); break; }
    case "backupDown": run(backupDownload); break;
    case "csvExport": exportCsv(); break;
    case "trCard": trCard(act); break;
    case "trashOpen": run(async () => { const r = await api("listTrash", { method: "POST", body: {} }); trashItems = r.items; trashOpen = true; render(); }); break;
    case "trashClose": trashOpen = false; render(); break;
    case "trashRestore": run(() => trashRestoreOne(id)); break;
    case "trashPurge":
      if (armed === "tp:" + id) { armed = null; run(() => trashPurgeOne(id)); }
      else arm("tp:" + id);
      break;
    case "trashEmpty":
      if (armed === "te") { armed = null; run(trashEmptyAll); }
      else arm("te");
      break;
    case "restoreGo": run(restoreGo); break;
    case "applyTpl": run(() => applyTemplate($("#tplSel").value)); break;
    case "addPage": run(addPage); break;
    case "smartLayout": run(smartLayout); break;
    case "delSubHere":
      if (armed === "sub:" + route.sub) {
        armed = null;
        const mainId = route.main;
        const subId = route.sub;
        run(async () => { await subDelete(mainId, subId); navigate("#cat/" + mainId); });
      } else arm("sub:" + route.sub);
      break;
    case "mainRenameSave": run(() => saveMainRename(m)); break;
    case "delAllPhotos":
      if (armed === "all:photos") { armed = null; run(deleteAllPhotos); }
      else arm("all:photos");
      break;
    case "addSub": run(subAdd); break;
    case "subSaveRow": run(() => subSaveRow(m, s)); break;
    case "addSubRow": run(() => addSubRow(m)); break;
    case "metaSave": run(saveMeta); break;
    case "metaClose": closeMeta(); break;
    case "saveTexts": run(saveTexts); break;
  }
}

function onChange(e) {
  const el = e.target;
  if (el.id === "upFiles") {
    uploadFiles(el.files).catch(showErr);
    el.value = "";
    return;
  }
  if (el.dataset.tphoto !== undefined) {
    S.tilePhotos = S.tilePhotos || {};
    if (el.value) S.tilePhotos[el.dataset.tphoto] = el.value;
    else delete S.tilePhotos[el.dataset.tphoto];
    persistSettings().then(render).catch(showErr);
    return;
  }
  if (el.dataset.tile !== undefined) {
    const l = currentTiles();
    l[Number(el.dataset.tile)] = el.value;
    tilesSave(l).catch(showErr);
    return;
  }
  if (el.name === "aPhoto") {
    const pv = $("#aPrev");
    if (pv) { pv.src = el.value ? imgUrl(el.value) : ""; pv.style.display = el.value ? "" : "none"; }
    return;
  }
  if (el.dataset.tsize) { saveStyle(el.dataset.tsize, { size: el.value }).catch(showErr); return; }
  if (el.dataset.talign) { saveStyle(el.dataset.talign, { align: el.value }).catch(showErr); return; }
  if (el.dataset.tbg) { saveStyle(el.dataset.tbg, { bg: el.value }).catch(showErr); return; }
  if (el.dataset.cap) { saveMetaField(el.dataset.cap, { caption: el.value.trim() }).catch(showErr); return; }
  if (el.id === "iUse" || el.id === "iPhoto") { updateRelWarn(); return; }
  if (el.dataset.pgsel) { movePageOf(el.dataset.pgsel, Number(el.value)).catch(showErr); return; }
  if (el.dataset.pagehon) {
    S.pageH = S.pageH || {};
    if (el.checked) S.pageH[el.dataset.pagehon] = 150; else delete S.pageH[el.dataset.pagehon];
    persistSettings().then(render).catch(showErr);
    return;
  }
  if (el.dataset.pageh) {
    S.pageH = S.pageH || {};
    S.pageH[el.dataset.pageh] = Number(el.value);
    persistSettings().then(render).catch(showErr);
    return;
  }
  if (el.dataset.bg) {
    S.bgs = S.bgs || {};
    S.bgs[el.dataset.bg] = el.value;
    persistSettings().then(render).catch(showErr);
    return;
  }
  if (el.id === "csvFile") {
    importCsv(el.files[0]).catch(showErr);
    el.value = "";
    return;
  }
  if (el.id === "restoreFile") {
    pendingRestore = el.files[0] || null;
    el.value = "";
    render();
    return;
  }
  if (el.id === "folderInput") {
    uploadFolder(el.files).catch(showErr);
    el.value = "";
    return;
  }
  if (el.id === "pageUpFiles") {
    ad.upMain = route.main; ad.upSub = route.sub || "";
    uploadFiles(el.files).catch(showErr);
    el.value = "";
    return;
  }
  if (el.dataset.inline) {
    saveInline(el.dataset.inline, el.value);
    return;
  }
  if (el.dataset.pos) { movePhotoTo(el.dataset.pos, el.value).catch(showErr); return; }
  if (el.dataset.ad === "upMain") { ad.upMain = el.value; ad.upSub = ""; render(); return; }
  if (el.dataset.ad === "upSub") { ad.upSub = el.value; return; }
  if (el.dataset.ad === "filter") { ad.filter = el.value; ad.filterSub = ""; render(); return; }
  if (el.dataset.ad === "filterSub") { ad.filterSub = el.value; render(); return; }
  if (el.dataset.f === "main") {
    const card = el.closest(".acard");
    $('[data-f="sub"]', card).innerHTML = subOptions(el.value, "");
  }
}

function onSubmit(e) {
  if (e.target.id === "loginForm") {
    e.preventDefault();
    const pw = $("#pw").value;
    login(pw).catch(() => { $("#loginErr").textContent = t("wrongPw"); });
    return;
  }
  if (e.target.id === "iForm") {
    e.preventDefault();
    submitInquiry();
  }
}

function onKey(e) {
  if (e.key === "Escape" && metaId) { closeMeta(); return; }
  // Ctrl+Z is no longer bound to the photo-undo; it does the normal browser undo in text fields only.
  if (e.target.matches && e.target.matches("[data-open]") && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    e.target.click();
    return;
  }
  if (!$("#viewer").classList.contains("open")) return;
  if (e.key === "Escape") closeViewer();
  if (e.key === "ArrowLeft") vNav(lang === "fa" ? 1 : -1);
  if (e.key === "ArrowRight") vNav(lang === "fa" ? -1 : 1);
}

/* ---------- Init ---------- */
async function init() {
  document.addEventListener("click", onClick);
  document.addEventListener("change", onChange);
  document.addEventListener("submit", onSubmit);
  document.addEventListener("keydown", onKey);
  window.addEventListener("hashchange", render);
  window.addEventListener("resize", layoutCanvas);
  window.addEventListener("resize", () => { clearTimeout(arcResizeTimer); arcResizeTimer = setTimeout(setupArc, 200); });

  $("#langToggle").addEventListener("click", () => {
    lang = lang === "fa" ? "en" : "fa";
    localStorage.setItem("kp-lang", lang);
    render();
  });
  $("#menuToggle").addEventListener("click", () => {
    const open = $("#mainNav").classList.toggle("open");
    $("#menuToggle").setAttribute("aria-expanded", String(open));
  });
  $("#vClose").addEventListener("click", closeViewer);
  $("#vPrev").addEventListener("click", () => vNav(-1));
  $("#vNext").addEventListener("click", () => vNav(1));
  $("#viewer").addEventListener("click", e => { if (e.target.id === "viewer") closeViewer(); });
  // swipe left / right to move between photos on touch screens
  let touchX = null;
  $("#viewer").addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
  $("#viewer").addEventListener("touchend", e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) vNav(dx < 0 ? 1 : -1);
  }, { passive: true });
  $("#vCopy").addEventListener("click", () => copyPhotoLink(vIds[vI]));
  $("#vInquire").addEventListener("click", () => {
    pendingPhoto = vIds[vI];
    closeViewer();
    navigate("#contact");
  });

  try {
    await loadPublic();
  } catch (e) {
    console.error(e);
    $("#app").innerHTML = emptyBox(t("loadErr"));
    return;
  }
  render();
}

init();
})();
