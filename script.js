/* ===========================================================
   Ling-Wei Chen — site script
   Builds the header and footer, fills lists from the
   content-*.js files, and draws the home-page clock. You should not need to
   edit this file to update content.
   =========================================================== */

(function () {
  "use strict";

  var SITE = window.SITE || {};
  var $ = function (sel) { return document.querySelector(sel); };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function currentFile() {
    var f = location.pathname.split("/").pop();
    return f === "" ? "index.html" : f;
  }

  /* ---------- Icons ----------
     Line icons from Lucide (lucide.dev, ISC licence); brand marks
     from Simple Icons (CC0) and Tabler Icons (MIT).
     In any HTML file, add data-icon="name" to an element to put an
     icon in front of it, e.g. <h3 data-icon="mail">Email</h3>.
     Names: mail, phone, pin, download, clock, glucose, baby, layers,
     external, link, cap, globe, users, award, talk, news, book, work,
     orcid, scholar, wos, researchgate, pubmed, linkedin,
     close, prev, next, images. */

  var ICONS = {
    "mail": ["s", "<path d=\"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7\" /><rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\" />"],
    "phone": ["s", "<path d=\"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384\" />"],
    "pin": ["s", "<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\" /><circle cx=\"12\" cy=\"10\" r=\"3\" />"],
    "download": ["s", "<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\" /><path d=\"M14 2v5a1 1 0 0 0 1 1h5\" /><path d=\"M12 18v-6\" /><path d=\"m9 15 3 3 3-3\" />"],
    "clock": ["s", "<circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 6v6l4 2\" />"],
    "glucose": ["s", "<path d=\"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2\" />"],
    "baby": ["s", "<path d=\"M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5\" /><path d=\"M15 12h.01\" /><path d=\"M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1\" /><path d=\"M9 12h.01\" />"],
    "layers": ["s", "<path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\" /><path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\" /><path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\" />"],
    "external": ["s", "<path d=\"M15 3h6v6\" /><path d=\"M10 14 21 3\" /><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\" />"],
    "link": ["s", "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\" /><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\" />"],
    "cap": ["s", "<path d=\"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z\" /><path d=\"M22 10v6\" /><path d=\"M6 12.5V16a6 3 0 0 0 12 0v-3.5\" />"],
    "globe": ["s", "<circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\" /><path d=\"M2 12h20\" />"],
    "users": ["s", "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" /><path d=\"M16 3.128a4 4 0 0 1 0 7.744\" /><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\" /><circle cx=\"9\" cy=\"7\" r=\"4\" />"],
    "award": ["s", "<path d=\"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526\" /><circle cx=\"12\" cy=\"8\" r=\"6\" />"],
    "talk": ["s", "<path d=\"M12 19v3\" /><path d=\"M19 10v2a7 7 0 0 1-14 0v-2\" /><rect x=\"9\" y=\"2\" width=\"6\" height=\"13\" rx=\"3\" />"],
    "news": ["s", "<path d=\"M15 18h-5\" /><path d=\"M18 14h-8\" /><path d=\"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2\" /><rect width=\"8\" height=\"4\" x=\"10\" y=\"6\" rx=\"1\" />"],
    "book": ["s", "<path d=\"M12 5v16\" /><path d=\"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z\" />"],
    "work": ["s", "<path d=\"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16\" /><rect width=\"20\" height=\"14\" x=\"2\" y=\"6\" rx=\"2\" />"],
    "orcid": ["f", "<path d=\"M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z\"/>"],
    "scholar": ["f", "<path d=\"M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z\"/>"],
    "wos": ["f", "<path d=\"M11.262 18a20.588 20.588 0 0 0 3.246-1.476 20.954 20.954 0 0 0 2.852-2.064A14.46 14.46 0 0 0 19.82 12c.328.328.622.688.884 1.082.328.394.592.786.788 1.18.262.46.524.886.786 1.28.198.458.394.884.59 1.278a23.172 23.172 0 0 1-2.654 2.46 38.765 38.765 0 0 1-2.952 1.966A29.612 29.612 0 0 1 10.574 24l-.788-1.18c-.26-.46-.524-.886-.786-1.28-.209-.42-.406-.846-.59-1.278l-.59-1.376A20.4 20.4 0 0 0 11.26 18h.002zm2.754-16.918a29.61 29.61 0 0 1 3.246 1.574c.984.59 1.968 1.246 2.952 1.966a47.566 47.566 0 0 1 2.654 2.46c-.196.46-.392.886-.59 1.28-.26.458-.524.884-.786 1.278a6.16 6.16 0 0 1-.788 1.18c-.273.409-.568.803-.884 1.18a18.072 18.072 0 0 0-2.46-2.558 20.936 20.936 0 0 0-2.852-2.064 20.4 20.4 0 0 0-6.688-2.36l.59-1.38c.196-.392.394-.82.59-1.278l.786-1.18.788-1.18c1.18.262 2.328.622 3.442 1.082zm-7.574 18c-.524.066-1.016.1-1.474.1H3.492c-.46 0-.92-.034-1.378-.1a34.28 34.28 0 0 1-.786-3.54 32.942 32.942 0 0 1 0-7.18c.196-1.18.46-2.33.786-3.444l1.378-.196h1.476c.46 0 .95.032 1.474.098l1.378.196-.59 1.77c-.262.984-.46 2-.59 3.05-.066.984-.1 2-.1 3.05.066 1.048.198 2.064.394 3.048.262 1.05.558 2.034.886 2.952-.46.13-.92.196-1.378.196z\"/>"],
    "researchgate": ["f", "<path d=\"M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.123 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.385-.348.664-.638.876-.29.212-.738.35-1.227.35-.545 0-.901-.15-1.21-.353-.306-.203-.517-.454-.67-.915a3.136 3.136 0 0 1-.147-.762 17.366 17.367 0 0 1-.034-.656c-.01-.26-.014-.572-.014-.939a26.401 26.403 0 0 1 .014-.938 15.821 15.822 0 0 1 .035-.656 3.19 3.19 0 0 1 .148-.76 1.89 1.89 0 0 1 .742-1.01c.344-.244.593-.352 1.137-.352.508 0 .815.096 1.144.303.33.207.528.492.764.925.047.094.111.118.198.07l1.044-.43c.075-.048.09-.115.042-.199a3.549 3.549 0 0 0-.466-.742 3 3 0 0 0-.679-.607 3.313 3.313 0 0 0-.903-.41A4.068 4.068 0 0 0 19.586 0zM8.217 5.836c-1.69 0-3.036.086-4.297.086-1.146 0-2.291 0-3.007-.029v.831l1.088.2c.744.144 1.174.488 1.174 2.264v11.288c0 1.777-.43 2.12-1.174 2.263l-1.088.2v.832c.773-.029 2.12-.086 3.465-.086 1.29 0 2.951.057 3.667.086v-.831l-1.49-.2c-.773-.115-1.174-.487-1.174-2.264v-4.784c.688.057 1.29.057 2.206.057 1.748 3.123 3.41 5.472 4.355 6.56.86 1.032 2.177 1.691 3.839 1.691.487 0 1.003-.086 1.318-.23v-.744c-1.031 0-2.063-.716-2.808-1.518-1.26-1.376-2.95-3.582-4.355-6.074 2.32-.545 4.04-2.722 4.04-4.9 0-3.208-2.492-4.698-5.758-4.698zm-.515 1.29c2.406 0 3.839 1.26 3.839 3.552 0 2.263-1.547 3.782-4.097 3.782-.974 0-1.404-.03-2.063-.086v-7.19c.66-.059 1.547-.059 2.32-.059z\"/>"],
    "pubmed": ["f", "<path d=\"M8.23 7.982l.006-1.005C7.846 1.417 5.096 0 5.096 0l.048 2.291C3.73 1.056 2.6 1.444 2.6 1.444l.118 15.307s4.218-1.796 5.428 5.505C10.238 13.535 21.401 24 21.401 24V9S10.52-.18 8.231 7.982zm9.79 9.941l-1.046-5.232-1.904 4.507h-.96l-1.72-4.301-1.046 5.04H9.321l2.093-9.39h.802l2.491 5.543 2.508-5.557h.869l2.075 9.39h-2.138z\"/>"],
    "linkedin": ["f", "<path d=\"M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1 -5 5h-10a5 5 0 0 1 -5 -5v-10a5 5 0 0 1 5 -5zm-9 8a1 1 0 0 0 -1 1v5a1 1 0 0 0 2 0v-5a1 1 0 0 0 -1 -1m6 0a3 3 0 0 0 -1.168 .236l-.125 .057a1 1 0 0 0 -1.707 .707v5a1 1 0 0 0 2 0v-3a1 1 0 0 1 2 0v3a1 1 0 0 0 2 0v-3a3 3 0 0 0 -3 -3m-6 -3a1 1 0 0 0 -.993 .883l-.007 .127a1 1 0 0 0 1.993 .117l.007 -.127a1 1 0 0 0 -1 -1\" />"],
    "close": ["s", "<path d=\"M18 6 6 18\" /><path d=\"m6 6 12 12\" />"],
    "prev": ["s", "<path d=\"m15 18-6-6 6-6\" />"],
    "next": ["s", "<path d=\"m9 18 6-6-6-6\" />"],
    "images": ["s", "<path d=\"m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16\" /><path d=\"M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2\" /><circle cx=\"13\" cy=\"7\" r=\"1\" fill=\"currentColor\" /><rect x=\"8\" y=\"2\" width=\"14\" height=\"14\" rx=\"2\" />"],
    "quote": ["s", "<path d=\"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\" /><path d=\"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\" />"]
  };

  function icon(name, cls) {
    var i = ICONS[name];
    if (!i) return "";
    var paint = i[0] === "s"
      ? 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"'
      : 'fill="currentColor"';
    return '<svg class="' + (cls || "icon") + '" viewBox="0 0 24 24" ' + paint + ' aria-hidden="true" focusable="false">' + i[1] + "</svg>";
  }

  // Picks a brand icon from a profile link's address
  function linkIcon(l) {
    if (l.icon) return l.icon;
    var u = (l.url || "").toLowerCase();
    if (u.indexOf("orcid.org") > -1) return "orcid";
    if (u.indexOf("scholar.google") > -1) return "scholar";
    if (u.indexOf("webofscience") > -1 || u.indexOf("clarivate") > -1 || u.indexOf("publons") > -1) return "wos";
    if (u.indexOf("linkedin.com") > -1) return "linkedin";
    if (u.indexOf("researchgate") > -1) return "researchgate";
    if (u.indexOf("pubmed") > -1 || u.indexOf("ncbi.nlm.nih.gov") > -1) return "pubmed";
    if (u.indexOf("mailto:") === 0) return "mail";
    return "link";
  }

  function iconize() {
    document.querySelectorAll("[data-icon]").forEach(function (el) {
      var name = el.getAttribute("data-icon");
      if (el.classList.contains("theme") || el.classList.contains("theme-detail")) {
        el.classList.add("has-badge");
        el.insertAdjacentHTML("afterbegin", '<span class="badge">' + icon(name, "icon") + "</span>");
      } else {
        el.insertAdjacentHTML("afterbegin", icon(name, "icon lead"));
      }
    });
  }

  /* ---------- Header and footer ---------- */

  function header() {
    var el = $("#site-header");
    if (!el) return;
    var here = currentFile();
    var items = (SITE.nav || []).map(function (n) {
      var cur = n.file === here ? ' aria-current="page"' : "";
      return '<li><a href="' + esc(n.file) + '"' + cur + ">" + esc(n.label) + "</a></li>";
    }).join("");
    el.outerHTML =
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<header class="site-header"><div class="wrap">' +
        '<div class="masthead">' +
          '<a class="wordmark" href="index.html">' +
            '<span class="wordmark-name">' + esc(SITE.labName) + "</span>" +
            (SITE.tagline ? '<span class="wordmark-sub">' + esc(SITE.tagline) + "</span>" : "") +
          "</a>" +
        "</div>" +
        '<div class="menu-row">' +
          '<a class="menu-email" href="mailto:' + esc(SITE.email) + '">' + icon("mail", "icon lead") + esc(SITE.email) + "</a>" +
          '<button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>' +
          '<nav class="site-nav" id="site-nav" aria-label="Main"><ul>' + items + "</ul></nav>" +
        "</div>" +
      "</div></header>";

    var btn = $(".nav-toggle"), nav = $("#site-nav");
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close" : "Menu";
    });
  }

  function footer() {
    var el = $("#site-footer");
    if (!el) return;
    var links = (SITE.links || []).map(function (l) {
      return '<li><a class="with-icon" href="' + esc(l.url) + '" rel="noopener">' + icon(linkIcon(l), "icon lead") + esc(l.label) + "</a></li>";
    }).join("");
    var nav = (SITE.nav || []).map(function (n) {
      return '<li><a href="' + esc(n.file) + '">' + esc(n.label) + "</a></li>";
    }).join("");
    el.outerHTML =
      '<footer class="site-footer"><div class="wrap">' +
        "<div>" +
          '<div class="footer-name">' + esc(SITE.labName) + "</div>" +
          "<p>" + esc(SITE.department) + ", " + esc(SITE.university) + "<br>" + esc(SITE.address) + "</p>" +
          '<p><a class="with-icon" href="mailto:' + esc(SITE.email) + '">' + icon("mail", "icon lead") + esc(SITE.email) + "</a></p>" +
        "</div>" +
        "<div><ul>" + nav + "</ul></div>" +
        "<div><ul>" + links + "</ul>" +
          (SITE.updated ? '<p style="margin-top:1rem">Updated ' + esc(SITE.updated) + "</p>" : "") +
        "</div>" +
      "</div></footer>";
  }

  /* ---------- News ---------- */

  function renderNews(el) {
    var limit = parseInt(el.getAttribute("data-limit") || "0", 10);
    var items = (window.NEWS || []).slice(0, limit || undefined);
    el.innerHTML = items.map(function (n) {
      // news text is trusted HTML written by the lab
      return '<li><span class="news-date">' + esc(n.date) + "</span><span>" + n.text + "</span></li>";
    }).join("");
  }

  /* ---------- Publications ---------- */

  var NAME = "Chen, L.-W.";
  var TYPE_LABEL = { chapter: "Book chapter", editorial: "Editorial", letter: "Commentary" };

  function isLed(p) {
    var a = p.authors || "";
    return a.indexOf(NAME) === 0 || a.indexOf(NAME + "*") !== -1;
  }

  function authorsHTML(a) {
    return esc(a).split(esc(NAME)).join("<strong>" + esc(NAME) + "</strong>");
  }

  /* Citation counts are fetched live from OpenAlex (openalex.org),
     a free index of scholarly works, and kept for a day in the
     visitor's browser. Counts are usually lower than Google Scholar. */
  var CITES = null, citeWaiters = [];
  function doiKey(d) { return String(d || "").toLowerCase().replace(/^https?:\/\/doi\.org\//, ""); }
  function citesFor(p) { return CITES && p.doi ? CITES[doiKey(p.doi)] : null; }

  function loadCitations(done) {
    if (done) citeWaiters.push(done);
    if (loadCitations.started) { if (CITES && done) done(); return; }
    loadCitations.started = true;
    var KEY = "openalex-cites-v1";
    try {
      var saved = JSON.parse(localStorage.getItem(KEY) || "null");
      if (saved && Date.now() - saved.t < 864e5) { CITES = saved.d; citeWaiters.forEach(function (f) { f(); }); return; }
    } catch (e) {}
    var dois = (window.PUBLICATIONS || []).filter(function (p) { return p.doi; }).map(function (p) { return doiKey(p.doi); });
    var chunks = [];
    for (var i = 0; i < dois.length; i += 50) chunks.push(dois.slice(i, i + 50));
    var map = {};
    Promise.all(chunks.map(function (c) {
      var url = "https://api.openalex.org/works?per-page=100&select=doi,cited_by_count,ids&filter=doi:" + encodeURIComponent(c.join("|"));
      return fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (data) {
        (data.results || []).forEach(function (w) {
          var pm = w.ids && w.ids.pmid ? String(w.ids.pmid).replace(/\D/g, "") : null;
          map[doiKey(w.doi)] = { n: w.cited_by_count || 0, pmid: pm };
        });
      });
    })).then(function () {
      CITES = map;
      try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), d: map })); } catch (e) {}
      citeWaiters.forEach(function (f) { f(); });
    }).catch(function () { /* offline or blocked: links still work, counts stay hidden */ });
  }

  function pubHTML(p) {
    var venue = "<em>" + esc(p.journal) + "</em>" + (p.details ? ", " + esc(p.details) : "");
    if (p.showYear) venue += ", " + esc(p.year);
    var type = TYPE_LABEL[p.type] ? '<span class="pub-type">' + TYPE_LABEL[p.type] + ". </span>" : "";
    var c = citesFor(p);
    var pmid = p.pmid || (c && c.pmid);
    var links = [];
    if (p.doi) links.push('<a href="https://doi.org/' + esc(p.doi) + '" rel="noopener">' + icon("external", "icon lead") + "DOI</a>");
    if (pmid) links.push('<a href="https://pubmed.ncbi.nlm.nih.gov/' + esc(pmid) + '/" rel="noopener">' + icon("pubmed", "icon lead") + "PubMed</a>");
    else if (p.doi) links.push('<a href="https://pubmed.ncbi.nlm.nih.gov/?term=' + encodeURIComponent(p.doi + "[doi]") + '" rel="noopener">' + icon("pubmed", "icon lead") + "PubMed</a>");
    else if (p.type === "article" || p.type === "editorial" || p.type === "letter") links.push('<a href="https://pubmed.ncbi.nlm.nih.gov/?term=' + encodeURIComponent(p.title + "[ti]") + '" rel="noopener">' + icon("pubmed", "icon lead") + "PubMed</a>");
    if (p.pmcid) links.push('<a href="https://pmc.ncbi.nlm.nih.gov/articles/' + esc(p.pmcid) + '/" rel="noopener">' + icon("book", "icon lead") + "Free full text</a>");
    if (c && c.n > 0) links.push('<span class="cites" title="Citations counted by OpenAlex">' + icon("quote", "icon lead") + "Cited by " + c.n + "</span>");
    return '<li class="pub">' +
      '<div class="pub-title">' + esc(p.title) + "</div>" +
      '<div class="pub-authors">' + authorsHTML(p.authors) + "</div>" +
      '<div class="pub-venue">' + type + venue + "</div>" +
      (links.length ? '<div class="pub-links">' + links.join("") + "</div>" : "") + "</li>";
  }

  function renderSelected(el) {
    var limit = parseInt(el.getAttribute("data-limit") || "4", 10);
    var items = (window.PUBLICATIONS || []).filter(function (p) { return p.selected; }).slice(0, limit);
    function draw() {
      el.innerHTML = items.map(function (p) { return pubHTML(Object.assign({}, p, { showYear: true })); }).join("");
    }
    draw();
    loadCitations(draw);
  }

  function themeList() { return window.PUB_THEMES || []; }
  function themeLabel(key, shortName) {
    var t = themeList().filter(function (x) { return x.key === key; })[0];
    return t ? (shortName && t.short ? t.short : t.label) : key;
  }

  function renderPublications(root) {
    var all = window.PUBLICATIONS || [];
    var themes = themeList();
    var hash = (location.hash || "").replace("#", "");
    var state = { q: "", type: "all", led: false, theme: "all", group: themes.length ? "theme" : "year" };
    if (themes.some(function (t) { return t.key === hash; })) state.theme = hash;

    var list = root.querySelector("[data-pub-list]");
    var count = root.querySelector("[data-pub-count]");
    var chips = root.querySelector("[data-pub-themes]");
    var groupToggle = root.querySelector(".group-toggle");
    if (!themes.length && groupToggle) groupToggle.hidden = true;

    function matches(p, ignoreTheme) {
      if (state.type !== "all" && p.type !== state.type) return false;
      if (state.led && !isLed(p)) return false;
      if (!ignoreTheme && state.theme !== "all" && (p.themes || []).indexOf(state.theme) === -1) return false;
      var q = state.q.toLowerCase().trim();
      if (!q) return true;
      return (p.title + " " + p.authors + " " + p.journal + " " + p.year).toLowerCase().indexOf(q) !== -1;
    }

    function tagsHTML(p) {
      if (!themes.length || !(p.themes || []).length) return "";
      return '<div class="pub-tags">' + p.themes.map(function (k) {
        return '<button type="button" class="tag" data-theme="' + esc(k) + '">' + esc(themeLabel(k, true)) + "</button>";
      }).join("") + "</div>";
    }

    function item(p, showYear) {
      return pubHTML(Object.assign({}, p, { showYear: showYear })).replace(/<\/li>$/, tagsHTML(p) + "</li>");
    }

    function drawChips() {
      if (!chips) return;
      if (!themes.length) { chips.hidden = true; return; }
      var base = all.filter(function (p) { return matches(p, true); });
      var html = '<button type="button" data-theme-chip="all" aria-pressed="' + (state.theme === "all") + '">All themes <span>' + base.length + "</span></button>";
      html += themes.map(function (t) {
        var n = base.filter(function (p) { return (p.themes || []).indexOf(t.key) > -1; }).length;
        return '<button type="button" data-theme-chip="' + esc(t.key) + '" aria-pressed="' + (state.theme === t.key) + '">' +
          esc(t.short || t.label) + " <span>" + n + "</span></button>";
      }).join("");
      chips.innerHTML = html;
    }

    var chart = root.querySelector("[data-pub-chart]");
    function drawChart(shown) {
      if (!chart || !all.length) return;
      var years = all.map(function (p) { return p.year; });
      var y0 = Math.min.apply(null, years), y1 = Math.max.apply(null, years);
      var total = {}, hit = {}, maxN = 1;
      for (var y = y0; y <= y1; y++) { total[y] = 0; hit[y] = 0; }
      all.forEach(function (p) { total[p.year]++; });
      shown.forEach(function (p) { hit[p.year]++; });
      for (y = y0; y <= y1; y++) maxN = Math.max(maxN, total[y]);
      var n = y1 - y0 + 1, W = 1000, H = 230, top = 26, bottom = 30, plotH = H - top - bottom;
      var slot = W / n, bw = Math.min(46, slot * 0.62);
      var filtered = shown.length !== all.length;
      var svg = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Number of publications per year, ' + y0 + " to " + y1 + '">';
      svg += '<line x1="0" x2="' + W + '" y1="' + (top + plotH) + '" y2="' + (top + plotH) + '" class="axis"/>';
      for (y = y0; y <= y1; y++) {
        var i = y - y0, cx = slot * i + slot / 2, x = cx - bw / 2;
        var th = total[y] / maxN * plotH, hh = hit[y] / maxN * plotH;
        var label = y + ": " + total[y] + (total[y] === 1 ? " paper" : " papers") + (filtered ? " (" + hit[y] + " matching)" : "");
        svg += '<g class="bar" data-year="' + y + '" tabindex="0" role="button" aria-label="' + label + '"><title>' + label + "</title>";
        svg += '<rect class="hit-area" x="' + (slot * i) + '" y="0" width="' + slot + '" height="' + H + '"/>';
        if (th) svg += '<rect class="bar-all" x="' + x + '" y="' + (top + plotH - th) + '" width="' + bw + '" height="' + th + '" rx="3"/>';
        if (hh) svg += '<rect class="bar-hit" x="' + x + '" y="' + (top + plotH - hh) + '" width="' + bw + '" height="' + hh + '" rx="3"/>';
        if (total[y]) svg += '<text class="bar-n" x="' + cx + '" y="' + (top + plotH - th - 8) + '">' + (filtered && hit[y] ? hit[y] + "/" + total[y] : total[y]) + "</text>";
        svg += '<text class="bar-year' + (i % 2 ? " odd" : "") + '" x="' + cx + '" y="' + (H - 8) + '">' + (n > 9 ? "’" + String(y).slice(2) : y) + "</text>";
        svg += "</g>";
      }
      svg += "</svg>";
      chart.innerHTML = svg + '<figcaption>Publications per year' + (filtered ? ", with papers matching your current selection highlighted" : "") + ". Select a bar to list that year’s papers.</figcaption>";
    }
    if (chart) {
      var pickYear = function (g) {
        var y = g.getAttribute("data-year");
        var box = root.querySelector("[data-pub-search]");
        box.value = y; state.q = y; draw();
      };
      chart.addEventListener("click", function (e) { var g = e.target.closest(".bar"); if (g) pickYear(g); });
      chart.addEventListener("keydown", function (e) {
        var g = e.target.closest(".bar");
        if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); pickYear(g); }
      });
    }

    function draw() {
      drawChips();
      var shown = all.filter(function (p) { return matches(p, false); });
      drawChart(shown);
      count.textContent = "Showing " + shown.length + " of " + all.length + " publications";
      if (!shown.length) {
        list.innerHTML = '<p class="empty">No publications match. Try a different word or clear the filters.</p>';
        return;
      }

      if (state.group === "cited") {
        if (!CITES) { list.innerHTML = '<p class="empty">Citation counts are loading. If they don’t appear, the citation service may be unavailable right now.</p>'; return; }
        var ranked = shown.slice().sort(function (a, b) {
          var ca = (citesFor(a) || {}).n || 0, cb = (citesFor(b) || {}).n || 0;
          return cb - ca || b.year - a.year;
        });
        list.innerHTML = '<section class="theme-group"><ol class="pubs ranked">' + ranked.map(function (p) { return item(p, true); }).join("") + "</ol></section>";
        return;
      }

      if (state.group === "theme") {
        var keys = state.theme === "all" ? themes.map(function (t) { return t.key; }) : [state.theme];
        var html = keys.map(function (k) {
          var ps = shown.filter(function (p) { return (p.themes || []).indexOf(k) > -1; });
          if (!ps.length) return "";
          return '<section class="theme-group" id="theme-' + esc(k) + '">' +
            '<h2 class="theme-group-title">' + esc(themeLabel(k)) + ' <span class="theme-count">' + ps.length + "</span></h2>" +
            '<ol class="pubs">' + ps.map(function (p) { return item(p, true); }).join("") + "</ol></section>";
        }).join("");
        var untagged = shown.filter(function (p) { return !(p.themes || []).length; });
        if (untagged.length && state.theme === "all") {
          html += '<section class="theme-group"><h2 class="theme-group-title">Other <span class="theme-count">' + untagged.length + "</span></h2>" +
            '<ol class="pubs">' + untagged.map(function (p) { return item(p, true); }).join("") + "</ol></section>";
        }
        list.innerHTML = html;
        return;
      }

      var years = [], byYear = {};
      shown.forEach(function (p) {
        if (!byYear[p.year]) { byYear[p.year] = []; years.push(p.year); }
        byYear[p.year].push(p);
      });
      years.sort(function (a, b) { return b - a; });
      list.innerHTML = years.map(function (y) {
        return '<section class="year-group" aria-label="' + y + '">' +
          '<div class="year-label">' + y + "</div>" +
          '<ol class="pubs">' + byYear[y].map(function (p) { return item(p, false); }).join("") + "</ol></section>";
      }).join("");
    }

    function setTheme(k) {
      state.theme = k;
      if (history.replaceState) history.replaceState(null, "", k === "all" ? location.pathname : "#" + k);
      draw();
    }

    root.querySelector("[data-pub-search]").addEventListener("input", function (e) { state.q = e.target.value; draw(); });
    root.querySelector("[data-pub-led]").addEventListener("change", function (e) { state.led = e.target.checked; draw(); });
    var typeButtons = root.querySelectorAll("[data-pub-type]");
    typeButtons.forEach(function (b) {
      b.addEventListener("click", function () {
        state.type = b.getAttribute("data-pub-type");
        typeButtons.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        draw();
      });
    });
    var groupButtons = root.querySelectorAll("[data-pub-group]");
    groupButtons.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-pub-group") === state.group ? "true" : "false");
      b.addEventListener("click", function () {
        state.group = b.getAttribute("data-pub-group");
        groupButtons.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        draw();
      });
    });
    loadCitations(draw);
    if (chips) chips.addEventListener("click", function (e) {
      var b = e.target.closest("[data-theme-chip]");
      if (b) setTheme(b.getAttribute("data-theme-chip"));
    });
    list.addEventListener("click", function (e) {
      var t = e.target.closest(".tag");
      if (t) { setTheme(t.getAttribute("data-theme")); root.scrollIntoView({ behavior: "smooth" }); }
    });
    draw();
  }

  /* ---------- People ---------- */

  function initials(name) {
    var words = name.replace(/,.*$/, "").replace(/^Dr\.?\s+/, "").trim().split(/\s+/);
    var first = words[0] || "", last = words.length > 1 ? words[words.length - 1] : "";
    return (first.charAt(0) + last.charAt(0)).toUpperCase();
  }

  function avatar(person, small) {
    var cls = small ? " small" : "";
    if (person.photo) return '<img class="portrait' + cls + '" src="' + esc(person.photo) + '" alt="' + esc(person.name) + '">';
    return '<div class="monogram' + cls + '" aria-hidden="true">' + esc(initials(person.name)) + "</div>";
  }

  /* ---------- Gallery (Team members page) ---------- */

  function galleryItems() {
    var P = window.PEOPLE || {};
    var items = (P.gallery || []).filter(function (g) { return g && g.photo; });
    // older setting: a single groupPhoto still works
    if (!items.length && P.groupPhoto) items = [{ photo: P.groupPhoto, caption: P.groupCaption || "" }];
    return items;
  }

  function renderGallery(el) {
    var items = galleryItems();
    var section = el.closest("section");
    if (!items.length) { if (section) section.hidden = true; return; }
    if (section) section.hidden = false;

    el.innerHTML = items.map(function (g, i) {
      return '<li><button type="button" class="gallery-item" data-index="' + i + '" aria-label="Open photo: ' + esc(g.caption || "photo " + (i + 1)) + '">' +
        '<img src="' + esc(g.photo) + '" alt="' + esc(g.caption || "") + '" loading="lazy">' +
        "</button>" +
        (g.caption ? '<span class="gallery-caption">' + esc(g.caption) + "</span>" : "") +
        "</li>";
    }).join("");

    // full-size viewer
    var box = document.createElement("dialog");
    box.className = "lightbox";
    box.innerHTML =
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<button type="button" class="lb-btn lb-close" aria-label="Close">' + icon("close", "icon") + "</button>" +
      (items.length > 1
        ? '<button type="button" class="lb-btn lb-prev" aria-label="Previous photo">' + icon("prev", "icon") + "</button>" +
          '<button type="button" class="lb-btn lb-next" aria-label="Next photo">' + icon("next", "icon") + "</button>"
        : "");
    document.body.appendChild(box);
    var img = box.querySelector("img"), cap = box.querySelector("figcaption"), cur = 0;

    function show(i) {
      cur = (i + items.length) % items.length;
      img.src = items[cur].photo;
      img.alt = items[cur].caption || "";
      cap.textContent = items[cur].caption || "";
      cap.hidden = !items[cur].caption;
    }
    function open(i) {
      show(i);
      if (box.showModal) box.showModal(); else box.setAttribute("open", "");
    }
    function close() { if (box.close) box.close(); else box.removeAttribute("open"); }

    el.addEventListener("click", function (e) {
      var b = e.target.closest(".gallery-item");
      if (b) open(parseInt(b.getAttribute("data-index"), 10));
    });
    box.querySelector(".lb-close").addEventListener("click", close);
    var p = box.querySelector(".lb-prev"), n = box.querySelector(".lb-next");
    if (p) p.addEventListener("click", function () { show(cur - 1); });
    if (n) n.addEventListener("click", function () { show(cur + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    box.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
  }

  function renderPI(el) {
    var pi = (window.PEOPLE || {}).pi;
    if (!pi) return;
    var facts = (pi.facts || []).map(function (f) {
      return "<dt>" + esc(f.label) + "</dt><dd>" + esc(f.value) + "</dd>";
    }).join("");
    var links = (SITE.links || []).map(function (l) {
      return '<a class="pill" href="' + esc(l.url) + '" rel="noopener">' + icon(linkIcon(l), "icon lead") + esc(l.label) + "</a>";
    }).join("");
    el.innerHTML = '<div class="pi">' + avatar(pi) +
      "<div><h2>" + esc(pi.name) + '</h2><p class="role">' + esc(pi.role) + "</p>" +
      '<div class="prose">' + (pi.bio || []).map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" +
      '<dl class="facts">' + facts + (links ? '<dt>Profiles</dt><dd><div class="pills">' + links + "</div></dd>" : "") + "</dl>" +
      "</div></div>";
  }

  function renderMembers(el) {
    var list = (window.PEOPLE || {}).members || [];
    el.innerHTML = list.map(function (m) {
      return '<li class="member">' + avatar(m, true) + "<div>" +
        '<div class="member-name">' + esc(m.name) + "</div>" +
        '<div class="meta">' + esc(m.role) + (m.years ? ", " + esc(m.years) : "") + "</div>" +
        (m.note ? '<div class="meta">' + esc(m.note) + "</div>" : "") +
        (m.topic ? '<div class="topic">' + esc(m.topic) + "</div>" : "") +
        "</div></li>";
    }).join("");
  }

  function renderAlumni(el) {
    var list = (window.PEOPLE || {}).alumni || [];
    el.innerHTML = list.map(function (m) {
      return "<li><h3>" + esc(m.name) + "</h3>" +
        '<div class="meta">' + esc(m.role) + ", " + esc(m.years) + "</div>" +
        (m.thesis ? '<div class="thesis">' + esc(m.thesis) + "</div>" : "") + "</li>";
    }).join("");
  }

  /* ---------- Grants ---------- */

  function renderGrants(el) {
    el.innerHTML = (window.GRANTS || []).map(function (g) {
      return "<li><div>" + esc(g.title) + "</div>" +
        '<div class="meta">' + esc(g.funder) + ", " + esc(g.period) + ". " + esc(g.role) + "</div></li>";
    }).join("");
  }

  /* ---------- CV ---------- */

  function renderCV(el) {
    var key = el.getAttribute("data-cv");
    var list = (window.CV || {})[key] || [];
    el.innerHTML = list.map(function (r) {
      return '<li><span class="years">' + esc(r.years) + "</span><div>" +
        "<div>" + esc(r.title) + "</div>" +
        (r.place ? '<div class="place">' + esc(r.place) + "</div>" : "") +
        "</div></li>";
    }).join("");
  }

  /* ---------- Map (Research page) ---------- */

  var LAND = {"d": "M484 744.2L475 744.7L474.8 741.1L475.7 738.4L476.1 737L479.9 739.1L485.5 739.9L485.6 741.2L484 744.2ZM925.9 684.8L931.6 687.1L934.8 686.2L939.4 684.9L942.9 685.4L943.3 693.3L941.3 695.6L940.7 700.9L938.6 699.1L934.5 703.8L933.3 703.4L929.7 703.2L926.1 697.5L925.3 693.1L921.9 687.3L922 684.2L925.9 684.8ZM365 503.4L366 511.4L367.5 514.5L366.9 517.7L365.9 519.7L363.9 515.7L362.8 517.7L363.9 522.7L363.4 525.5L361.8 527L361.4 532.7L359.1 540.4L356.2 549.6L352.5 562.2L350.3 571.5L347.6 579.2L342.8 580.8L337.7 583.6L334.3 581.9L329.7 579.5L328 576L327.6 570.1L325.6 564.8L325 560L326.1 555.2L328.8 554L328.8 551.8L331.6 546.8L332.2 542.5L330.8 539.4L329.7 535.2L329.2 529L331.2 525.3L332 521.1L335 520.8L338.3 519.5L340.4 518.3L343 518.2L346.4 514.4L351.2 510.3L353 506.9L352.2 504.1L354.7 504.9L357.9 500.3L358 496.2L360 493.3L362 496.1L363.6 499L365 503.4ZM915.1 504.7L917.2 510L921 507.5L922.9 510.3L925.7 512.9L925.1 515.8L926.4 521.5L927.3 524.9L928.8 525.7L930.4 531.4L929.8 534.8L931.7 539.4L938.1 542.8L942.2 546L946.2 548.9L945.4 550.5L948.8 554.7L951 561.9L953.4 560.4L955.8 563.3L957.2 562.3L958.2 569.4L962.4 573.5L965.1 576L969.7 581.4L971.4 586.7L971.5 590.5L971.1 594.7L973.9 600.3L973.6 606.2L972.6 609.3L971 615.3L971.1 619.1L970 623.8L967.3 629.9L963 633.2L960.8 638.3L958.9 641.6L957.1 647.4L954.9 650.7L953.4 655.7L952.6 660.3L952.9 662.4L949.6 664.7L943 664.9L937.5 667.7L934.8 670.3L931.3 673.1L926.4 670.2L922.8 669L923.7 665.5L920.5 666.8L915.4 671.6L910.3 669.8L906.9 668.7L903.6 668.3L897.9 666.3L894.1 662.2L893 657.2L891.6 653.8L888.7 651.1L883.1 650.3L885 647.1L883.6 642.1L880.7 646.7L875.5 648L878.6 644.3L879.4 640.4L881.7 637.2L881.2 632.2L876.5 637.9L872.8 640.2L870.5 645.5L865.9 642.8L866.1 639.2L862.4 634.4L859.3 631.9L860.4 630.4L852.9 626.3L848.8 626.1L843.1 622.9L832.6 623.5L825 625.9L818.2 628.1L812.6 627.7L806.4 631.1L801.3 632.6L800.2 636.1L798 638.8L793 639L789.3 639.6L784.1 638.4L779.9 639.1L775.8 639.4L772.4 643L770.6 642.7L767.7 644.5L764.9 646.7L760.6 646.4L756.6 646.4L750.4 642.1L747.2 640.9L747.3 637.1L750.3 636.1L751.3 634.6L751 632.2L751.8 627.6L751.1 623.7L748 616.9L747 613.1L747.3 609.3L744.9 605L744.8 603L742.2 600.4L741.5 595.2L738.1 589.9L737.3 587.1L739.9 589.9L737.9 583.7L740.8 585.7L742.6 588.3L742.5 584.8L739.5 579.6L739 577.5L737.6 575.5L738.3 571.7L739.4 570L740.2 566.7L739.6 562.8L742 558L742.5 563.1L745 558.5L749.8 556.3L752.6 553.4L757.1 551L759.8 550.5L761.4 551.3L766.1 548.8L769.6 548L770.5 546.6L772.1 546L775.3 546.1L781.5 544.2L784.7 541.2L786.2 537.7L789.7 534.3L789.9 531.6L790.1 528L794.2 522.4L796.7 528.1L799.2 526.8L797.1 523.6L798.9 520.4L801.5 521.8L802.2 516.8L805.5 513.5L806.9 510.9L809.8 509.7L809.9 507.9L812.5 508.6L812.6 507L815.2 506L818 505.1L822.4 508.2L825.7 512.1L829.3 512.2L833.1 512.8L831.8 509.1L834.6 503.8L837.3 502L836.4 500.4L838.9 496.6L842.5 494.2L845.5 495L850.5 493.8L850.3 490.4L846 488.2L849.2 487.2L853.1 488.8L856.2 491.6L861.1 493.3L862.8 492.6L866.5 494.7L869.9 492.8L872.1 493.3L873.5 492.1L876.2 495.3L874.6 498.9L872.4 501.6L870.4 501.8L871 504.5L869.3 507.8L867.2 511.1L867.6 513L872.3 516.7L876.9 518.8L879.9 521.1L884.1 525L885.8 525L888.9 526.7L889.8 528.8L895.4 531L899.3 528.8L900.4 525.2L901.6 522.2L902.3 518.6L904.1 513.3L903.3 510.1L903.7 508.1L903.1 504.3L903.8 499.3L905 497.9L904 495.7L905.5 492.2L906.6 488.5L906.7 486.6L908.9 484.1L910.6 487.4L911 491.6L912.5 492.4L912.7 495.2L914.8 498.6L915.3 502.3L915.1 504.7ZM1024.2 482.9L1025.9 485.2L1021.8 485.1L1019.5 481L1023 482.6L1024.2 482.9ZM780.7 481.3L778.2 481.4L770.4 476.7L775.9 475.4L779 477.4L781 479.5L780.7 481.3ZM1016.8 478.8L1014.5 479L1010.9 478.3L1009.7 477.3L1010 474.6L1013.9 475.7L1015.8 477.1L1016.8 478.8ZM1021.6 477L1020.8 478.2L1016.4 472.5L1015.2 468.5L1017.2 468.5L1019.3 473.8L1021.6 477ZM802.6 480.6L797.5 482.1L796.8 481.3L797.4 479L799.9 474.9L805.7 472.3L806.4 470.7L811.4 469.2L815.6 469L817.4 468.2L819.6 469L817.5 470.8L811.3 473.7L806.4 475.6L802.6 480.6ZM764.1 467L766.2 468.8L769.9 468.2L771.3 471.1L764.5 472.4L760.5 473.3L757.3 473.2L759.3 469.4L762.5 469.3L764.1 467ZM793.5 467L792.7 470.7L783.9 472.6L776 471.8L776 469.3L780.7 467.9L784.4 469.9L788.3 469.4L793.5 467ZM1011 468.6L1011.3 469.9L1006.7 467.1L1003.5 464.7L1001.3 462.5L1002.1 461.8L1004.8 463.4L1009.7 466.5L1011 468.6ZM997.3 462L996.1 462.4L993.5 460.9L991.1 458.1L991.4 457L994.9 459.8L997.3 462ZM709.5 458.2L720.8 458.9L722.1 456.1L733 459.3L735.2 463.6L744 464.9L751.2 468.8L744.5 471.4L738 468.7L732.7 468.9L726.6 468.4L721.1 467.2L714.3 464.6L710 464L707.5 464.8L696.8 462.1L695.8 459.2L690.4 458.7L694.4 452.3L701.6 452.7L706.3 455.3L708.7 455.8L709.5 458.2ZM863.1 454.5L860.1 459L859.5 454L860.5 451.6L861.8 449.3L863.1 451.3L863.1 454.5ZM987.5 458.5L985.9 459.2L983.3 456.6L980.8 452.4L979.5 447.3L980.3 446.7L980.9 448.6L982.7 450.1L985.6 454.4L988.4 456.6L987.5 458.5ZM964.6 449.6L961.5 450.1L960.6 452L957.4 453.6L954.4 455.1L951.2 455.1L946.4 453.2L943.1 451.3L943.5 449.3L948.8 450.3L952 449.7L952.9 446.5L953.8 446.4L954.3 449.9L957.7 449.4L959.3 447.1L962.6 444.7L962 440.8L965.5 440.7L966.7 441.8L966.6 445.5L964.6 449.6ZM819.1 436.1L816.9 438.3L812.8 437.1L811.7 434.2L817.6 433.9L819.1 436.1ZM838.1 433.7L840.2 438.8L835.2 436L830.3 435.5L827 435.9L822.9 435.7L824.3 432L831.6 431.7L838.1 433.7ZM971.4 443L969.6 444.8L968.5 440.9L967.1 438.3L964.4 436.1L961.1 433.3L956.8 431.3L958.5 429.7L961.7 431.6L963.6 433L966.1 434.6L968.5 437.4L970.7 439.6L971.4 443ZM859.7 420.7L861.3 431.5L867.4 435.5L872.3 428.4L879.1 424.4L884.3 424.4L889.3 426.7L893.7 429.1L900 430.4L910.2 435L921.1 438.8L925.1 442.2L928.4 445.5L929.3 449.5L939.1 453.6L940.5 457.1L935.1 457.8L936.4 462.3L941.7 466.6L945.5 473.7L948.9 473.5L948.6 476.4L953.2 477.6L951.4 478.8L957.6 481.6L957 483.6L953.1 484L951.7 482.3L946.6 481.6L940.7 480.6L936.1 476.3L932.7 472.6L929.7 466.8L922 463.9L917.1 465.8L913.5 468L914.2 472.9L909.6 475.2L906.3 474.1L900.2 473.8L895 468.3L889 467L887.5 468.9L880.1 469.1L882.6 463.7L886.3 461.8L884.8 454.6L881.9 449L870.5 443.4L865.7 442.8L856.8 436.6L855.1 439.9L852.8 440.5L851.5 438L851.5 435.1L847 431.8L853.3 429.4L857.5 429.6L857 427.8L848.4 427.8L846.1 423.8L840.8 422.6L838.4 419.3L846.3 417.7L849.3 415.5L858.7 418.2L859.7 420.7ZM807.3 403.6L802.6 410.2L798.1 411.5L792.5 410.2L782.7 410.5L777.5 411.5L776.7 416.5L782 422.4L785.1 419.4L796.1 417.2L795.6 420.2L793.1 419.3L790.5 423.2L785.3 425.7L790.9 434.3L789.8 436.6L795.1 444.3L795.1 448.6L791.9 450.6L789.6 448.3L792.5 442.8L786.7 445.4L785.2 443.5L786 441L781.8 437.1L782.2 430.6L778.3 432.6L778.8 440.4L779 449.9L775.3 450.8L772.8 448.9L774.4 442.8L773.5 436.3L771 436.3L769.2 431.7L771.7 427.4L772.5 422.1L775.4 412L776.7 409.3L781.7 404.3L786.3 406.3L793.7 407.2L800.5 406.9L806.3 402.1L807.3 403.6ZM827.6 405.5L827.3 411.3L824.2 410.7L823.3 414.7L825.8 418.2L824.1 419.1L821.7 414.8L820 406.3L821.2 401L823.1 398.6L823.6 402.2L827 402.8L827.6 405.5ZM693 452L686.5 452.2L681.6 446.6L674 441.2L671.5 437.1L667.1 431.7L664.1 426.7L659.6 417.4L654.5 411.8L652.8 406.1L650.6 400.9L645.3 396.7L642.2 391L637.8 387.3L631.7 379.9L631.1 376.6L634.9 376.8L644 378.1L649.2 384.6L653.8 389.1L657 391.9L662.6 399.1L668.6 399.2L673.5 403.7L676.9 409.3L681.4 412.4L679 417.8L682.4 420.1L684.5 420.3L685.5 424.9L687.6 428.6L691.9 429.2L694.8 433.4L693.3 441.7L693 452ZM764 400.9L770.6 407L763.6 407.8L761.6 412.4L761.9 418.4L756.2 423L756.1 429.6L753.8 439.8L753 437.4L746.3 440.4L743.9 436.3L739.7 436L736.8 433.8L729.8 436.2L727.7 433L723.8 433.4L719 432.6L718.1 423.7L715.1 421.8L712.3 416.1L711.5 410.3L712.2 404.1L715.7 399.7L720 402L724.5 400.7L725.7 395.1L728.2 393.8L735.3 392.4L739.5 387.1L742.4 382.9L744.7 380.4L749.7 376.8L754.2 372.1L757.2 366.9L759.6 366.9L762.6 370.3L762.9 373.2L766.8 375L771.7 377L771.2 379.6L767.3 380L768.3 383.2L764 385.5L760.7 391.5L765 397.8L764 400.9ZM814 357L814.6 361.4L814.9 365.2L812.9 371.3L810.8 364.5L808 367.8L809.9 372.8L808.2 375.9L801.3 372L799.6 367.2L801.4 364L797.7 360.9L795.9 363.6L793.1 363.4L788.7 367.1L787.8 365.1L790.1 359.5L793.8 357.7L797 355.1L799.1 358.2L803.5 356.3L804.5 353.4L808.6 353.2L808.3 348L813.1 351.2L813.6 354.5L814 357ZM548.3 371.8L543.2 373.3L540.4 368L539.4 358.4L542.1 347.6L546.1 351.3L548.9 356L551.7 362.9L550.8 369.9L548.3 371.8ZM799.9 344.6L797.8 346.8L795.9 351L794.1 352.9L790.5 348.3L791.7 346.6L793.2 344.7L793.8 340.6L797 340.2L796.1 344.7L800.5 338.2L799.9 344.6ZM767.7 351L759.9 357.3L762.7 352.6L767 348.5L770.5 343.9L773.6 337.3L774.6 342.7L770.8 346.4L767.7 351ZM787.6 333.8L791.1 335.9L794.8 335.9L794.7 338.7L792 341.5L788.3 343.5L788 340.4L788.5 337L787.6 333.8ZM808.8 332L810.5 339.5L806 337.7L806.1 339.9L807.5 344L804.7 345.5L804.5 340.9L802.7 340.5L801.8 336.5L805.2 337L805.2 334.5L801.6 329.4L807.2 329.5L808.8 332ZM785.5 326L783.9 331.7L781.4 328.4L778.4 323.3L783.4 323.6L785.5 326ZM784.3 289.8L787.9 291.7L789.7 289.9L790.2 291.6L789.3 294.4L791.3 299.2L789.7 304.7L786.2 306.9L785.3 312.3L786.6 317.6L789.8 318.3L792.4 317.5L799.7 321.2L799.1 324.9L801.1 326.5L800.5 329.5L795.9 326.3L793.7 322.8L792.2 325.2L788.4 321.2L783.1 322.2L780.2 320.7L780.5 318L782.3 316.3L780.5 314.7L779.8 317.1L776.9 313.3L776 310.4L775.8 304L778.2 306.2L778.8 295.8L780.7 289.8L784.3 289.8ZM719.6 288.6L714.6 291.8L709.7 289.8L709.6 284L712.5 281L718.9 279.1L722.3 279.3L723.6 281.8L721 284.8L719.6 288.6ZM783.4 261.2L780.9 266.7L777.8 261.1L777.1 256.1L780.5 249.6L785.3 244.5L788 246.5L786.9 250.5L783.4 261.2ZM862.6 185.5L863.3 187.8L860 191.9L857.6 189.7L854.6 191.3L853 195.2L849.2 193.3L849.2 190.1L852.5 186.1L855.9 186.9L858.3 184.1L862.6 185.5ZM274 175.4L270 178.2L270.4 179.5L270.6 180L264.6 182.7L261.7 181.9L260.3 179.2L263.1 178.9L263.5 178.9L264.4 177.3L268.6 177.4L274 175.4ZM210 175.2L213.2 177.4L217.8 177L222.2 177.5L222 178.7L225.2 177.9L224.5 179.8L216 180.4L216.1 179.3L208.9 178L210 175.2ZM161.9 158.4L159.8 163.6L160.6 165.7L159.4 169.1L154.9 166.6L151.9 165.9L143.7 162.5L144.5 159L151.4 159.7L157.4 158.9L161.9 158.4ZM124.8 138.5L128.3 143.2L127.5 152.1L124.8 151.6L122.4 153.8L120.2 152.1L119.9 144L118.6 140.2L121.8 140.6L124.8 138.5ZM899.9 165.6L897.7 170.9L898.7 174.3L895.6 179L888.1 182.1L877.7 182.5L869.4 190.1L865.4 187.6L865.2 182.6L854.9 184L848 187.2L841.1 187.3L847.1 192.2L843.1 203.5L839.3 206.3L836.5 203.7L837.9 197.7L834.2 195.8L831.8 191.2L837.4 189.2L840.5 185L846.4 181.5L850.7 177L862.4 175L868.7 176.4L874.8 164.5L878.8 167.7L887.4 161L890.8 158.5L894.4 150.3L893.4 142.8L895.9 138.6L902.2 137.4L905.4 146.6L905.2 152L899.8 158.7L899.9 165.6ZM126.8 132.2L124.9 137.4L122.2 136L120.9 131.5L122 129.1L125.8 126.5L126.8 132.2ZM917.1 118.8L921.2 120.2L925.4 117.4L926.7 124.8L918 126.7L912.8 133.3L903.6 128.7L900.4 136L893.9 136.1L893 129.5L896 124.4L902.2 124L903.9 114.8L905.7 109.6L912.6 116.5L917.1 118.8ZM915.6 75L921.5 86.8L912.8 84.6L909.2 94.2L914.9 101L914.7 105.7L910.3 101.7L906.4 106.8L905.3 101.2L906 94.7L905.3 87.5L906.7 82.5L907 73.6L903.5 67.1L904 57.9L909.4 54.9L907.1 51.8L909.7 50.9L911.3 55.3L913.3 61.7L913.2 68.2L915.6 75ZM30.7 64.9L20.2 68.8L11.9 67.8L16.7 60.9L13.6 54.1L21.6 48.9L26 45.8L31 45.5L37.3 49.6L34.1 54.2L35.1 58.9L30.7 64.9ZM145.2 42.6L141.7 48L135.5 44.2L134.7 41.4L143.4 39.2L145.2 42.6ZM52.9 22.4L46.6 29.6L52.6 28.7L59.1 28.7L57.5 34.2L52.2 40.1L58.3 40.6L64 49.1L68.1 50.2L71.7 57.8L73.4 60.4L80.5 61.7L79.8 66L76.8 67.9L79.1 71.4L73.8 74.8L66 74.8L55.9 76.6L53.2 75.3L49.3 78.4L43.9 77.7L39.7 80.2L36.6 78.9L45.2 71.9L50.5 70.4L41.3 69.3L39.6 66.7L45.8 64.6L42.5 61L43.6 56.7L52.4 57.3L53.3 53.4L49.2 49.2L42.1 48L40.7 46.2L42.8 43.3L40.9 41.4L37.7 44.6L37.4 38.1L34.4 34.7L36.5 27.9L41.1 22.4L45.8 23L52.9 22.4ZM-14.8 -29.7L-16.1 -25.4L-9.5 -20.8L-17.1 -15.7L-34.1 -11.2L-39.2 -10L-46.9 -11L-63.3 -13.1L-57.5 -16L-70.3 -19.3L-59.9 -20.5L-60.2 -22.5L-72.5 -24.1L-68.5 -28.4L-59.6 -29.4L-50.4 -24.9L-41.5 -28.5L-34.1 -26.6L-24.5 -30.2L-14.8 -29.7ZM-988.2 -46.4L-973.8 -41.3L-958.4 -34.7L-958.9 -30.5L-954.9 -28.9L-956.3 -33.7L-940.3 -32.7L-928.8 -26.5L-934.7 -23.6L-944.3 -22.9L-944.4 -16.4L-946.8 -15L-952.3 -15.2L-956.8 -17.5L-964.6 -19.5L-965.9 -22.4L-971.9 -23.4L-978.6 -22.6L-981.8 -24.9L-980.5 -27.4L-987.6 -25.8L-984.9 -22.7L-988.2 -19.9L1129.4 -19.8L1121.8 -16.9L1114.2 -17.4L1119.5 -13.8L1123 -8.3L1125.7 -6.5L1126.4 -3.8L1124.9 -2L1113.9 -3.5L1097.5 1.5L1092.2 2.3L1083.2 7L1074.7 11.1L1072.5 14.1L1064.1 9.5L1048.8 14.7L1046.1 12.3L1040.4 15.1L1032.6 14.2L1030.7 18.6L1023.6 25L1023.8 27.7L1030.5 29.2L1029.8 38.9L1024.3 39.2L1021.8 44.7L1024.2 47.6L1013.9 51L1011.9 58.6L1003.1 60.2L1001.4 67L992.9 73.2L990.7 68.6L988.2 58.9L984.9 44.1L987.7 34.9L992.7 30.9L993 27.8L1002.1 26.3L1012.6 17.9L1022.8 11L1033.4 5.7L1038.1 -3.7L1030.9 -3.1L1027.4 2.4L1012.5 9.7L1007.7 1.5L992.5 3.8L977.7 14.9L982.6 19L969.5 20.8L960.4 21.4L960.8 16.6L951.7 15.6L944.4 18.9L926.4 17.7L907.1 19.7L888 32.7L865.4 48.4L874.7 49.3L877.6 53.4L883.3 54.9L887.1 51.6L893.5 52L902 59.4L902.2 65L897.6 71.7L897.1 79.6L894.5 90.3L885.6 99.9L883.6 104.5L875.7 112.3L867.7 120L863.9 123.9L856.1 127.8L852.4 127.9L848.7 124.7L840.8 129.6L839.9 131.8L837.6 131.4L835.1 133.6L833.3 135.9L833.6 140.7L830.5 142.2L829.5 143.3L827.3 145.3L823.3 146.4L820.8 148.2L820.6 151.1L819.9 151.8L822.3 152.9L825.6 155.8L830.7 163.7L832.1 168L832.2 175.7L830 179.3L824.6 180.6L819.9 183.4L814.6 183.9L814 180.3L815.1 175.3L812.5 168.4L816.8 167.3L812.8 161.6L809.9 160.3L809.2 161.5L807.5 162.1L807.3 160.8L805.8 160.2L804.2 159.2L805.8 156.2L807.2 155.5L806.7 154.2L808.2 150.6L807.8 149.6L804.3 148.8L801.6 147L793.3 149L789 152.1L782.7 153.9L785.8 150.8L784.6 148.2L789.2 143.8L786.1 140.3L781 142.6L774.3 147.3L770.7 151.5L765 151.9L762 155L765.1 159.5L769.9 160.6L770.1 163.6L774.7 165.5L781.3 160.8L786.5 163.4L790.3 163.5L791.3 167L783 168.9L780.2 172.5L774.5 175.8L771.5 180.5L777.8 184.1L780.1 190.7L783.7 196.8L787.7 201.9L787.6 206.9L783.9 208.7L785.3 212.2L788.8 214.3L787.9 219.7L786.4 225L783.1 225.6L778.8 232.8L774 241.6L768.6 249.5L760.5 255.7L752.3 261.3L745.7 262L742.1 265L740 262.8L736.7 266.1L728.5 269.5L722.3 270.5L720.3 277.5L717 277.9L715.4 273.1L716.8 270.5L708.9 268.4L706.2 269.5L698.3 275.2L693.4 281.5L692.1 286.1L696.6 293.1L702.1 301.8L707.5 305.9L711 311.3L713.7 323.6L713 335.3L708 339.7L701.3 344L696.5 349.6L689.2 355.8L687 351.5L688.7 347L684.3 343.2L679.4 342.2L677 338.8L674 331.9L668.8 328.8L663.7 328.9L664.6 323.7L659.4 323.7L658.9 331.1L655.8 340.8L653.8 346.7L654.2 351.5L658.1 351.7L660.5 357.8L661.5 363.6L664.8 367.4L668.4 368.1L671.4 371.6L672.8 372.2L676.3 376.2L678.7 380.7L679 385.2L678.4 388.2L679 390.5L679.4 394.5L681.5 396.3L683.8 402.2L683.7 404.4L679.5 404.9L674 399.9L667 394.7L666.3 391.3L662.9 386.8L662.1 381.3L660 377.7L660.6 372.8L659.3 370L657 367.4L656 364.1L652.9 360.4L650 357.2L649.1 361.1L647.9 357.4L648.6 353.3L650.3 346.9L649.7 341.9L651.6 336.8L649.6 332.9L650.1 325.6L647.7 322.2L645.8 314.2L644.7 305.8L642.1 300.3L638.3 303.6L631.6 308.4L628.3 307.8L624.6 306.2L626.7 298L625.4 291.7L620.8 284L621.6 281.6L618.1 280.8L613.9 275.3L612.3 271.9L611.9 268.5L610.8 265.3L608.3 261.4L602.9 261.1L603.4 263.9L601.6 267.6L599.1 266.2L598.2 267.4L596.6 266.7L594.3 266.1L593.5 268.5L589.5 268.5L582.2 269.8L582.5 274.9L579.4 278.8L570.9 283.3L564.4 291.1L559.9 295.3L554.1 299.7L554.1 302.7L551.1 304.4L545.8 306.8L543.1 307.1L541.3 312.2L542.5 320.9L542.9 326.4L540.4 332.7L540.3 344.1L537.3 344.4L534.6 349.5L536.4 351.7L531 353.5L529.1 358.1L526.7 360L521.1 353.8L518.4 344.4L516.2 337.7L514.1 334.6L511 328.2L509.5 319.8L508.5 315.7L503.1 306.5L500.7 293.6L498.9 285.1L499 277L497.8 270.8L489.3 274.8L485.1 274L477.4 265.9L480.3 263.5L478.5 260.9L471.6 255.2L467.3 253.5L465.6 248.7L461 243.7L450.2 244.9L440.6 245L432.3 246L421.3 244L414.9 242.4L408.2 241.6L405.7 233.4L402.9 232.2L398.4 233.4L392.4 236.6L385.3 234.4L379.3 229.3L373.7 227.4L369.7 221.1L365.4 212.2L362.2 213.3L358.5 211.1L356.3 213.7L352.8 213.4L354 216.3L353.5 217.8L355.4 222.8L357.7 228.6L360.6 230.1L361.6 232.4L365.6 235.2L366 238L365.4 240.2L366.1 242.5L367.8 244.3L368.6 246.5L369.5 248.1L369.1 243.3L370.7 239.8L372.3 239.1L374.1 241.2L374.2 245.1L372.9 249L374 251.5L375 251.2L375.3 253L379.9 252L384.7 252.2L388.3 252.4L392.3 247.8L396.7 243.6L400.4 239.5L402.1 237.2L402.9 237.8L402.3 240.5L401.5 241.7L402.3 247L405 251.6L408.3 254L412.6 254.8L416.1 256.1L418.7 259.9L420.3 262.1L422.4 262.9L422.4 264.4L420.2 268.4L419.3 270.3L416.8 272.4L414.6 276.9L412 276.6L410.7 278.2L409.8 281.6L410.5 286L410 286.8L407.3 286.8L403.6 289.3L403 292.6L401.7 294L398 293.9L395.7 295.6L395.7 298.3L392.9 300.1L389.6 299.5L385.7 301.7L383 302.1L378.7 303.9L377.6 306.9L377.5 309.1L371.6 311.9L362.2 315.1L356.9 319.8L354.3 320.1L352.6 319.7L349.1 322.5L345.4 323.8L340.5 324.1L339 324.5L337.7 326.3L336.1 326.8L335.2 328.4L332.3 328.3L330.4 329.2L326.4 328.9L324.8 325L325 321.3L324 319.4L322.9 314.4L321.2 311.7L322.4 311.4L321.8 308.3L322.5 307L322.2 304.1L321.5 301.3L319.7 299.3L319.2 296.6L316.2 294.2L313.1 288.7L311.4 283.2L307.3 278.7L304.7 277.6L300.8 271.2L300.1 266.6L300.4 262.6L297 255.2L294.3 252.6L291.1 251.3L289.1 247.4L289.5 245.9L287.8 242.5L286.1 241L283.8 236L280.2 230.7L277.2 226.1L274.3 226.1L275.2 222.5L275.5 220.1L276.2 217.5L276 216.5L274.4 219.2L273.1 224.2L271.5 227.7L270.1 228.9L268.2 226.7L265.5 223.7L261.3 214.2L260.7 214.8L263.1 221.8L266.8 228.5L271.2 238.9L273.4 242.5L275.3 246.3L280.5 253.7L279.4 254.8L279.6 259.1L286.4 265.1L287.4 266.5L289.4 273L288.1 274.2L288.9 281.1L291.1 289L293.3 290.7L296.5 293.2L299.9 300.9L301.6 307L304.8 310.2L312.8 316.5L316.1 320.3L319.3 324.2L321.1 326.4L324 328.4L325.4 330.5L325.2 333.3L321.9 334.9L324.4 336.7L326.3 337.9L327.5 340.7L330.1 343.5L333 343.5L338.6 341.8L345 341L350.2 338.9L353.1 338.5L355.2 337.3L358.5 337L360.4 336.9L363.1 335.9L366.2 335.2L369 333L371.2 332.9L371.4 334.8L370.8 338.7L370.9 342.2L369.6 344.6L368 351.8L365.1 359.2L361.5 367.7L356.4 377.5L351.4 384.9L344.5 394L338.6 399.4L329.8 406L324.3 411.1L317.9 419.2L316.5 422.7L315.2 424.3L311.1 426.9L309.6 429.7L307.4 430.2L306.6 434.9L304.7 437.6L303.6 442L301.2 444.2L298.5 452.4L298.8 456.2L302.6 458.6L302.8 460.4L301.1 464.4L301.5 466.4L301.1 469.6L303.2 473.8L305.6 480.3L307.7 481.8L308.7 484.8L308.5 491.4L309.2 497.3L309.4 507.7L310.4 510.9L308.7 515.7L306.4 520.3L302.7 524.4L297.3 527L290.6 530.2L284 537.4L281.8 538.6L277.6 543.3L275.2 544.9L274.7 549.6L277.5 554.7L278.7 558.6L278.7 560.6L279.8 560.2L279.6 566.8L278.7 569.8L280 571L279.2 573.8L276.7 576.1L271.9 578.4L264.8 582L262.2 584.5L262.7 587.3L264.2 587.7L263.7 591.2L262.2 596.1L261.5 601.6L260 604.6L256 608L254.9 608.9L252.4 612.3L250.7 615.7L247.4 620.5L240.7 627.4L236.6 631.4L232.2 634.4L226 637L223 637.4L222.2 639.2L218.7 638.2L215.7 639.5L209.4 638.2L205.8 639L203.4 638.7L197.3 641.3L192.3 642.4L188.7 644.9L186 645L183.5 642.7L181.5 642.5L179 639.6L178.7 640.5L177.9 638.7L177.9 634.8L176 630.3L177.9 629.1L177.8 624L173.9 617.8L171 612.1L166.7 603.4L162.4 598.4L160.1 593.5L158.8 587.1L157.3 582.2L155.3 572L155.2 564L154.5 560.4L152.2 557.6L149.1 552.1L146 544.1L144.8 539.9L140 533.4L139.6 528.3L139.1 524.1L139.9 518.3L141.9 512.2L142.2 509.3L144.1 503.3L145.5 500.6L148.9 496.2L150.8 493.3L151.4 488.3L151.1 484.5L149.3 482.2L147.8 478.1L146.3 474.1L146.6 472.7L148.4 470.1L146.7 463.7L145.5 459.2L142.5 455L143.1 453.7L142.2 451.6L140.7 446.6L135.8 439.6L129.8 432.8L125.9 427.3L122.3 420.5L122.5 418.2L123.8 416.1L125.2 411.3L126.4 406.3L125.3 405.3L127.4 397.8L128.2 392.6L125.9 388.2L123.2 387L122 384.1L120.5 383.1L120.6 381.3L114.5 383.7L112.3 383.3L110 384.8L105.3 384.7L102.1 380.5L100.2 375.7L96 371.3L91.6 371.4L86.4 371.4L81.6 372.1L76.8 373.6L67.6 377.5L64.3 379.7L59 381.7L53.8 379.8L51.1 379.9L47 378.5L43.2 378.6L36.3 379.8L32.2 381.7L26.4 384.2L25.2 384L23.7 384L17.6 380.9L12.3 375.8L7.3 372.1L3.3 367.8L1.7 367.3L-2.5 364.7L-5.6 361.1L-6.6 358.7L-7.3 353.7L-9.9 349.8L-12.2 347.2L-13.7 346.3L-15.2 345L-15.8 342.1L-16.7 340.6L-18.4 339.5L-21.6 336.7L-24 336.3L-25.4 334.4L-25.4 333.4L-27.1 332L-27.5 330.5L-28.5 325.4L-27.7 322.5L-30.2 317.3L-33.1 314.9L-30.5 313.7L-27.7 309L-26.3 305.6L-26.8 302L-25.1 298.7L-24.4 292.4L-25 285.8L-25.8 282.5L-25.2 279.2L-26.7 276L-29.8 273.1L-29.5 270.3L-29.2 267.3L-27 265.4L-25.1 262L-25.5 259.7L-23.4 255L-20.1 250.8L-18.2 249.7L-16.6 245.8L-16.5 242.3L-14.4 238.1L-10.4 235.7L-6.7 228.9L-3.6 226.3L1.8 225.5L6.5 221L9.4 219.2L14.3 213.6L12.9 205.3L15.1 199.6L15.9 196.1L19.7 191.6L25.6 188.6L29.9 185.8L33.9 178.9L35.7 174.8L40 174.8L43.6 177.7L49.2 177.2L55.3 178.7L57.8 178.8L63.5 175.1L69.8 174L73.5 171.2L79.2 169.2L89.2 168L98.9 167.5L101.9 168.4L107.4 165.8L113.7 165.8L116.1 167.3L120.1 166.9L126.5 164.2L130.7 165L130.5 168.4L135.5 165.9L135.9 167.2L132.9 170.5L132.9 173.6L134.9 175.2L134.2 181L130.3 184.3L131.4 188L134.4 188.1L135.9 191.2L138.2 192.3L145.1 194.6L147.6 194L152.5 195.1L160.3 198.1L163 204L168.3 205.3L176.6 208.1L182.9 211.4L185.7 209.7L188.6 206.6L187.2 201.5L189 198.3L193.3 195.2L197.3 194.2L205.3 195.6L207.3 198.6L209.5 198.6L211.3 199.8L217.2 200.5L218.6 202.7L226.4 202.6L232.1 204.4L237.9 206.4L240.7 207.4L245.2 205.3L247.6 203.4L252.8 202.8L257 203.7L258.6 207L260 204.8L264.7 206.4L269.3 206.7L272.2 205.1L273.9 202.9L273.5 202.5L275 199.4L276.2 194.4L277.1 192.7L277.2 192.6L279.3 187.2L282.2 182.5L282.3 182.2L281.8 177.1L283.2 174.4L281.1 171.4L283.3 168.9L279.7 169.5L274.8 167.9L270.7 171.8L261.8 172.5L257.1 168.9L250.7 168.7L249.4 171.5L245.3 172.3L239.6 168.7L233.2 168.8L229.7 162.2L225.4 158.5L228.3 153.3L224.5 150.1L231.1 143.8L240.1 143.5L242.6 138.4L253.8 139.3L260.9 135L267.7 133.1L277.5 133L287.7 137.7L296.2 140.2L303 139.2L308.1 139.8L315 136.3L315.9 133.5L314.4 128.9L311 126.5L307.8 125.7L305.6 123.7L298.1 118.1L291.4 115.5L286.3 111.6L290.6 110.6L295.5 105L292.2 102.3L300.9 99.6L300.7 98.2L295.4 99.2L290.7 99.8L286.8 101.9L281.3 102.3L276.2 104.8L276.6 108.9L279.5 110.5L285.5 110.1L284.3 112.5L277.9 113.7L269.9 117.5L266.6 116.2L267.9 113L261.5 111.1L262.5 109.8L268.2 107.6L266.5 106.1L257.3 104.4L256.9 101.9L251.5 102.7L249.3 106.4L244.7 111.3L244.9 113L242 114.5L240.2 113.8L238.6 121.9L235.5 124.6L233.4 129.4L235.3 133.2L236 135.8L241.1 137.9L240 139.5L233 139.9L230.5 142L225.6 145.6L223.8 142.5L223.9 141.1L220.3 140.9L217.2 140.3L210.1 142L214.2 145.7L211.2 146.8L207.9 146.8L204.8 143.4L203.7 144.9L205 148.8L208 152L205.7 153.4L209 156.5L211.9 158.4L212 162.2L206.6 160.4L208.3 163.8L204.6 164.5L206.8 170.4L202.9 170.5L198.1 167.6L195.9 162.3L194.8 157.8L192.5 154.8L189.5 151L189.1 149.1L188.1 148.6L188 147.1L184.7 144.9L184.2 141.7L184.7 137.2L185.5 135.1L184.6 134.1L183.3 133.5L181.6 131.4L179.1 130L173.6 127.6L170.2 125.2L164.8 123.2L159.9 118.3L161 117.8L158.4 115L158.2 112.7L154.5 111.7L152.7 114.6L150.9 112.3L151 110L151.3 109.9L152.6 109.3L147.9 108.3L143.1 110.7L143.4 114L142.7 115.9L144.6 119.3L150.2 122.7L153.1 128.2L159.7 133.5L164.3 133.5L165.7 135L164.1 136.3L169.3 138.7L173.6 140.7L178.7 144.2L179.3 145.4L178.2 147.8L174.9 144.7L169.8 143.6L167.4 147.9L171.6 150.4L170.9 153.9L168.4 154.3L165.3 160L162.8 160.5L162.9 158.5L164.1 154.9L165.3 153.5L163.1 149.6L161.3 146.2L158.8 145.4L157.1 142.5L153.3 141.3L150.8 138.6L146.4 138.2L141.8 135.2L136.4 130.9L132.4 127L130.6 120.4L127.7 119.7L122.9 117.5L120.2 118.4L116.8 121.5L114.3 122L109 125.7L97.4 123.9L88.8 126.1L88.2 130.1L88.5 134L82.9 138.4L75.4 139.8L74.8 142.1L71.2 145.7L68.9 151.2L71.2 155L67.8 157.9L66.6 162.3L62.1 163.6L58 168.7L50.5 168.8L44.9 168.7L41.2 171.1L39 173.6L36.1 173L33.9 170.8L32.2 166.9L26.7 165.9L24.4 167.6L21.3 166.7L18.3 167.4L19.1 162.2L18.6 158.1L16 157.5L14.5 155L15 150.6L17.4 148.2L17.8 145.5L19 141.5L18.9 138.7L17.7 136.3L17.4 134L17.7 129.3L15.3 126.4L23.7 121.6L30.9 122.8L38.7 122.8L45 123.9L49.9 123.5L59.4 123.8L62.4 119.8L63.6 106.5L57.5 99.5L53.1 96.1L44.2 93.6L43.6 88.7L51.2 87.3L61.1 89L59.2 81.4L64.8 84.3L78.5 79.1L80.2 73.6L85.4 72.3L90.1 71L93.1 69.2L98.3 59.3L106.3 56.6L111.2 56.7L112.4 55.3L117.3 55L118.4 56.4L122.4 53.2L121 50.7L120.7 46.9L118.4 43.2L118.2 36.4L119.2 34.6L120.9 32.6L126 32.2L128.1 30.3L132.8 28.4L132.6 31.9L130.9 34L131.6 35.9L134.8 36.9L133.3 39.4L131.6 38.7L127.4 43.5L129 46.7L129 49.3L135 50.9L134.9 53.2L140.9 52L144.2 50.2L150.9 52.8L153.7 54.9L157.7 53L166.8 49.9L174.3 47.6L180.1 48.8L180.6 50.4L186.2 50.5L187.6 47.5L195.7 45.4L194.4 39.8L194.7 34.7L197.5 30.6L203.1 28.3L207.8 33.3L212.5 33.1L213.6 28L214.3 24.1L212.1 24.9L208.4 22.6L207.9 18.7L215.3 16.9L222.7 15.9L229.1 17L235.2 16.8L241.9 13.1L235.7 10L225 10.5L214.7 12.9L205.1 14.3L201.7 10.7L196 8.5L197.3 2L194.5 -4.1L197.3 -7.9L202.6 -12.1L216.1 -19.3L220 -20.7L219.4 -23.5L211.2 -26.7L201.1 -24.8L195.4 -20.2L196.3 -16.1L186.9 -10.7L175.6 -5L171.3 4.4L175.5 9.1L181.1 12.8L175.7 20.3L169.6 21.8L167.3 33L164 39.3L156.9 38.6L153.5 43.9L146.7 44.2L144.8 37.9L139.9 30.4L135.5 20.9L131.5 16.9L119.9 24.6L112.1 26.1L103.9 22.7L101.8 15.6L99.9 0.2L105.4 -4.1L120.9 -9.7L132.5 -16.6L143.3 -25.8L157.4 -38.7L167.3 -43.7L183.4 -52.1L196.3 -55L206 -54.6L215 -60.2L225.7 -59.9L236.3 -61.2L254.7 -56.3L247.1 -54.5L253.5 -50.4L259.6 -52.7L269.3 -48.6L285.4 -47.1L307.6 -39.5L312.1 -36.4L312.5 -31.9L306 -28.4L296.4 -26.7L270.1 -31.7L265.8 -30.9L275.4 -26L276.1 -16.1L283.7 -14.1L288.3 -12.3L289.1 -15.6L285.4 -18.5L289.3 -20.9L303.5 -16.8L308.5 -18.4L304.5 -23.3L318.2 -29.8L323.6 -29.4L329.1 -27.1L332.5 -31.7L327.6 -35.7L330.5 -39.6L326.2 -43.8L342.7 -41.6L346 -37.9L338.6 -37.1L338.6 -33.4L343.2 -31.1L352.3 -32.5L353.8 -36.8L366.1 -40L386.6 -45.7L391 -45.4L385.2 -41.3L392.5 -40.6L396.7 -42.9L407.8 -43.1L416.5 -45.8L423.2 -41.8L429.9 -46.2L423.7 -50.1L426.8 -52.3L444.1 -50.3L452.3 -48.2L473.6 -40.6L477.5 -44.1L471.6 -47.6L471.4 -49L464.3 -49.7L466.2 -52.8L463.1 -58L462.9 -60.2L473.8 -66.2L477.6 -72.2L482 -73.5L497.6 -71.8L498.8 -68.1L493.2 -62.7L496.9 -60.6L498.8 -55.9L497.4 -46.8L503.9 -42.7L501.4 -38.2L489.9 -28.8L496.6 -27.8L498.9 -30.2L505.4 -31.9L507 -35.2L512.1 -38.4L508.6 -42.2L511.4 -46.6L505 -47.1L503.5 -50.8L508.2 -57.5L500.6 -62.9L511.1 -67.4L509.8 -72.2L512.7 -72.3L515.8 -68.6L513.5 -62.2L519.8 -61L517.1 -65.8L526.9 -68.4L539.1 -68.8L550 -65L544.8 -70.5L544.2 -77.6L554.4 -78.9L568.6 -78.7L581.3 -79.5L576.5 -83L583.3 -87.4L590.1 -87.6L601.5 -90.9L617.1 -91.8L619 -93.6L634.5 -94.2L639.3 -92.7L652.5 -96.2L663.3 -96.1L664.9 -99L670.5 -101.9L684.4 -104.6L694.5 -102.4L686.5 -100.8L699.8 -99.8L701.4 -96.5L706.8 -98.1L724 -98L737.2 -94.7L742 -92.3L740.5 -88.8L734 -86.8L718.5 -83.1L714.1 -81.1L721.4 -80.2L730.1 -78.5L735.4 -79.8L738.4 -75.5L741 -77.2L750.4 -78.3L769.3 -77.2L770.7 -74.1L795.3 -73.1L795.6 -78.2L808.1 -77L817.5 -77.1L827 -73.5L829.7 -69.3L826.2 -66.5L833.6 -61.2L842.9 -58.5L848.5 -65.5L858 -62.5L868 -64.3L879.4 -62.3L883.7 -64.1L893.4 -63.2L889.1 -69.4L896.9 -72.3L950 -68L955 -64L970.4 -58.9L994.2 -60.2L1005.9 -59.1L1010.8 -56.3L1010.1 -51.4L1017.3 -49.6L1025.2 -50.9L1035.6 -51.1L1046.7 -49.8L1057.9 -50.5L1068.1 -44.6L1075.4 -46.7L1070.6 -51L1073.3 -53.9L1092 -52.1L1104.3 -52.5L1121.2 -49.3L-988.2 -46.4ZM359.5 138L362.5 142.8L365.2 143.1L367 144.9L362.2 145.4L361.1 150.6L360.1 152.9L358 154.5L358.1 157.8L360 162.7L365.6 164.1L369.7 167.4L378 168.6L387.2 166.8L387.8 165.2L386.7 160.5L387.5 153.6L383 151.3L384.5 146.7L380.6 146.3L381.9 140.7L387.4 142.4L392.6 140.2L388.3 136.2L386.6 132.4L381.9 134.1L381.3 139L379.4 134.7L379.1 133.1L380.5 130.3L379.4 128L372.6 125.7L370 119.7L366.7 118L366.5 115.9L372.2 116.5L372.5 111.6L377.4 110.5L382.6 111.5L383.7 105L382.6 100.9L376.7 101.2L371.7 99.6L364.9 102.5L359.4 103.9L356.7 107.9L351 109L345.2 115.9L350.5 122.2L350 126.7L356.4 134.5L359.5 138Z", "W": 1000, "H": 720, "lonMin": -12, "latMax": 62, "c": 0.882947592858927, "s": 6.662176768759054};

  function renderMap(el) {
    var M = window.MAP;
    if (!M || !(M.places || []).length) { var s = el.closest("section"); if (s) s.hidden = true; return; }
    function xy(lat, lon) { return [(lon - LAND.lonMin) * LAND.c * LAND.s, (LAND.latMax - lat) * LAND.s]; }
    var home = M.places.filter(function (p) { return p.home; })[0];
    var hp = home ? xy(home.lat, home.lon) : null;
    var svg = '<svg viewBox="0 0 ' + LAND.W + " " + LAND.H + '" role="img" aria-label="Map of research collaborations">';
    svg += '<path class="land" d="' + LAND.d + '"/>';
    M.places.forEach(function (p) {
      if (!hp || p.home) return;
      var q = xy(p.lat, p.lon), mx = (hp[0] + q[0]) / 2, my = Math.max(24, Math.min(hp[1], q[1]) - Math.abs(hp[0] - q[0]) * 0.12 - 10);
      svg += '<path class="link" d="M' + hp[0].toFixed(1) + " " + hp[1].toFixed(1) + " Q" + mx.toFixed(1) + " " + my.toFixed(1) + " " + q[0].toFixed(1) + " " + q[1].toFixed(1) + '"/>';
    });
    M.places.forEach(function (p, i) {
      var q = xy(p.lat, p.lon), x = q[0].toFixed(1), y = q[1].toFixed(1);
      svg += '<g class="place' + (p.home ? " home" : "") + (p.region ? " region" : "") + '" data-i="' + i + '"><title>' + esc(p.name) + "</title>";
      if (p.region) svg += '<circle class="region-area" cx="' + x + '" cy="' + y + '" r="52"/>';
      if (p.home) svg += '<circle class="pulse" cx="' + x + '" cy="' + y + '" r="12"/>';
      svg += '<circle class="dot" cx="' + x + '" cy="' + y + '" r="' + (p.home ? 12 : 10) + '"/>';
      svg += '<text class="num" x="' + x + '" y="' + y + '">' + (i + 1) + "</text>";
      var right = q[0] < LAND.W - 150;
      svg += '<text class="map-label" x="' + (q[0] + (right ? 18 : -18)).toFixed(1) + '" y="' + (q[1] + 6).toFixed(1) + '" text-anchor="' + (right ? "start" : "end") + '">' + esc(p.label || p.name) + "</text>";
      svg += "</g>";
    });
    svg += "</svg>";
    var list = '<ol class="map-list">' + M.places.map(function (p, i) {
      return '<li data-i="' + i + '"><span class="map-num' + (p.home ? " home" : "") + '">' + (i + 1) + "</span><div><strong>" + esc(p.name) + "</strong>" +
        (p.text ? "<p>" + esc(p.text) + "</p>" : "") + "</div></li>";
    }).join("") + "</ol>";
    el.innerHTML = '<div class="map-frame">' + svg + "</div>" + list;

    function highlight(i, on) {
      el.querySelectorAll('[data-i="' + i + '"]').forEach(function (n) { n.classList.toggle("active", on); });
    }
    el.addEventListener("mouseover", function (e) { var n = e.target.closest("[data-i]"); if (n) highlight(n.getAttribute("data-i"), true); });
    el.addEventListener("mouseout", function (e) { var n = e.target.closest("[data-i]"); if (n) highlight(n.getAttribute("data-i"), false); });
  }

  /* ---------- Career journey (CV page) ---------- */

  function renderJourney(el) {
    var CV = window.CV || {};
    var rows = (CV.education || []).concat(CV.positions || []).filter(function (r) { return r.country && r.journey !== false; });
    if (!rows.length) { var s = el.closest("section"); if (s) s.hidden = true; return; }
    var nowYear = new Date().getFullYear();
    rows.forEach(function (r) {
      var m = String(r.years).match(/(\d{4})\D*(\d{4})?/);
      r._start = m ? +m[1] : nowYear; r._end = m && m[2] ? +m[2] : null;
    });
    rows.sort(function (a, b) { return a._start - b._start; });
    var countries = [];
    rows.forEach(function (r) { if (countries.indexOf(r.country) === -1) countries.push(r.country); });
    var items = rows.map(function (r, i) {
      var next = rows[i + 1];
      var stop = next ? next._start : Math.max(nowYear, (r._end || nowYear)) + 0.6;
      var grow = next ? Math.max(2.2, stop - r._start) : Math.max(3.4, stop - r._start);
      var c = "var(--j" + ((countries.indexOf(r.country) % 4) + 1) + ")";
      var span = r._start + (r._end ? "–" + r._end : "–present");
      return '<li style="--grow:' + grow + ";--c:" + c + '" class="' + (i % 2 ? "down" : "up") + (next ? "" : " last") + '">' +
        '<div class="j-label"><span class="j-year">' + esc(span) + "</span>" +
        '<span class="j-title">' + esc(r.short || r.title) + "</span>" +
        '<span class="j-where">' + esc(r.where || r.place || "") + "</span></div></li>";
    }).join("");
    var legend = countries.map(function (c, i) {
      return '<span><i style="background:var(--j' + ((i % 4) + 1) + ')"></i>' + esc(c) + "</span>";
    }).join("");
    el.innerHTML = '<ol class="journey">' + items + '</ol><div class="journey-key">' + legend + "</div>";
  }

  /* ---------- Meal-timing explainer (Research page) ---------- */

  function renderExplainer(el) {
    var NS = "http://www.w3.org/2000/svg", C = 200, R = 150;
    function pt(h, r) { var a = (h / 24) * Math.PI * 2 - Math.PI / 2; return [C + r * Math.cos(a), C + r * Math.sin(a)]; }
    function arc(h1, h2, r) {
      var s = pt(h1, r), e = pt(h2, r), large = (h2 - h1) > 12 ? 1 : 0;
      return "M" + s[0].toFixed(2) + " " + s[1].toFixed(2) + " A" + r + " " + r + " 0 " + large + " 1 " + e[0].toFixed(2) + " " + e[1].toFixed(2);
    }
    function fmt(h) { h = ((h % 24) + 24) % 24; var hh = Math.floor(h), mm = Math.round((h - hh) * 60); if (mm === 60) { hh = (hh + 1) % 24; mm = 0; } return (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm; }
    function dur(h) { var hh = Math.floor(h), mm = Math.round((h - hh) * 60); if (mm === 60) { hh++; mm = 0; } return hh + " h" + (mm ? " " + mm + " min" : ""); }

    var ticks = "";
    for (var h = 0; h < 24; h++) {
      var major = h % 6 === 0, a = pt(h, R - 10), b = pt(h, R - (major ? 22 : 15));
      ticks += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="' + (major ? "var(--ink)" : "var(--muted)") + '" stroke-width="' + (major ? 1.6 : 1) + '" opacity="' + (major ? 1 : 0.55) + '"/>';
    }
    [0, 6, 12, 18].forEach(function (hh) {
      var p = pt(hh, hh % 12 === 0 ? R - 38 : R - 52);
      ticks += '<text x="' + p[0] + '" y="' + p[1] + '" text-anchor="middle" dominant-baseline="central" fill="var(--muted)" font-size="12.5" font-family="var(--sans)">' + (hh < 10 ? "0" : "") + hh + ":00</text>";
    });

    el.innerHTML =
      '<div class="ex-dial"><svg viewBox="0 0 400 400" role="img" aria-label="24-hour clock showing your eating window">' +
        '<path d="' + arc(6, 18, R + 22) + '" fill="none" stroke="var(--day-soft)" stroke-width="18"/>' +
        '<path d="' + arc(18, 30, R + 22) + '" fill="none" stroke="var(--night-soft)" stroke-width="18"/>' + ticks +
        '<path class="ex-fast" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="1 6" stroke-linecap="round"/>' +
        '<path class="ex-eat" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>' +
        '<circle class="ex-m1" r="8" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5"/>' +
        '<circle class="ex-m2" r="8" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5"/>' +
        '<text class="ex-big" x="200" y="196" text-anchor="middle" fill="var(--ink)" font-size="30" font-weight="300" font-family="var(--sans)"></text>' +
        '<text x="200" y="220" text-anchor="middle" fill="var(--muted)" font-size="12.5" font-family="var(--sans)">overnight fast</text>' +
      "</svg></div>" +
      '<div class="ex-controls">' +
        '<label class="ex-field"><span>First meal <output class="ex-o1"></output></span>' +
          '<input type="range" class="ex-r1" min="4" max="14" step="0.25" value="8"></label>' +
        '<label class="ex-field"><span>Last meal <output class="ex-o2"></output></span>' +
          '<input type="range" class="ex-r2" min="14" max="26" step="0.25" value="19"></label>' +
        '<dl class="ex-stats"><div><dt>Eating window</dt><dd class="ex-win"></dd></div><div><dt>Overnight fast</dt><dd class="ex-fastd"></dd></div></dl>' +
        '<p class="ex-note" aria-live="polite"></p>' +
        '<p class="ex-small">For illustration only, not dietary advice. <a href="publications.html#chrono">Our chrono-nutrition papers</a></p>' +
      "</div>";

    var r1 = el.querySelector(".ex-r1"), r2 = el.querySelector(".ex-r2");
    function update() {
      var s = +r1.value, e = +r2.value, win = e - s, fast = 24 - win;
      el.querySelector(".ex-eat").setAttribute("d", arc(s, e, R));
      el.querySelector(".ex-fast").setAttribute("d", arc(e, s + 24, R));
      var p1 = pt(s, R), p2 = pt(e, R);
      el.querySelector(".ex-m1").setAttribute("cx", p1[0]); el.querySelector(".ex-m1").setAttribute("cy", p1[1]);
      el.querySelector(".ex-m2").setAttribute("cx", p2[0]); el.querySelector(".ex-m2").setAttribute("cy", p2[1]);
      el.querySelector(".ex-big").textContent = dur(fast);
      el.querySelector(".ex-o1").textContent = fmt(s);
      el.querySelector(".ex-o2").textContent = fmt(e) + (e >= 24 ? " (next day)" : "");
      el.querySelector(".ex-win").textContent = dur(win);
      el.querySelector(".ex-fastd").textContent = dur(fast);
      var note;
      if (e >= 21) note = "Late eating: meals in the late evening, when the body is preparing for sleep, are one of the behaviours we study in relation to glucose in pregnancy.";
      else if (win <= 10) note = "A window of this length is similar to those tested in time-restricted eating studies, which commonly limit eating to about 6 to 10 hours a day.";
      else note = "In everyday life, many people spread their eating across 12 hours or more. Our research asks how the timing and regularity of meals relate to metabolic health.";
      el.querySelector(".ex-note").textContent = note;
      r1.setAttribute("aria-valuetext", fmt(s)); r2.setAttribute("aria-valuetext", fmt(e));
    }
    r1.addEventListener("input", update); r2.addEventListener("input", update);
    update();
  }

  /* ---------- Small bindings ---------- */

  function bindText() {
    document.querySelectorAll("[data-site]").forEach(function (el) {
      var path = el.getAttribute("data-site").split(".");
      var v = SITE;
      path.forEach(function (k) { v = v == null ? v : v[k]; });
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-site-href]").forEach(function (el) {
      var key = el.getAttribute("data-site-href");
      if (key === "email") el.href = "mailto:" + SITE.email;
      else if (SITE[key]) el.href = SITE[key];
    });
    var cv = $("[data-cv-pdf]");
    if (cv) {
      if (SITE.cvPdf) { cv.hidden = false; cv.href = SITE.cvPdf; cv.insertAdjacentHTML("afterbegin", icon("download", "icon lead")); }
      else cv.hidden = true;
    }
    var t = $("[data-teaching-site]");
    if (t) {
      if (SITE.teachingSite) { t.hidden = false; t.querySelector("a").href = SITE.teachingSite; }
      else t.hidden = true;
    }
  }

  /* ---------- The 24-hour clock ---------- */

  function drawDial(el) {
    var NS = "http://www.w3.org/2000/svg";
    var C = 200, R = 150;
    var meals = [8, 13, 19];         // breakfast, lunch, dinner
    var eatStart = 8, eatEnd = 19;   // eating window
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function pt(h, r) {
      var a = (h / 24) * Math.PI * 2 - Math.PI / 2;
      return [C + r * Math.cos(a), C + r * Math.sin(a)];
    }
    function arc(h1, h2, r) {
      var s = pt(h1, r), e = pt(h2, r);
      var large = (h2 - h1) > 12 ? 1 : 0;
      return "M" + s[0].toFixed(2) + " " + s[1].toFixed(2) +
        " A" + r + " " + r + " 0 " + large + " 1 " + e[0].toFixed(2) + " " + e[1].toFixed(2);
    }
    function node(tag, attrs, parent) {
      var n = document.createElementNS(NS, tag);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      if (parent) parent.appendChild(n);
      return n;
    }
    function fmt(h) {
      h = ((h % 24) + 24) % 24;
      var hh = Math.floor(h), mm = Math.floor((h - hh) * 60);
      return (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm;
    }

    // An illustrative glucose curve: a rise after each meal and a small
    // early-morning rise, drawn inside the clock face.
    function glucose(t) {
      var g = 5.0 + 0.35 * Math.exp(-Math.pow(t - 6, 2) / 2);
      [[8, 2.1], [13, 1.8], [19, 2.5]].forEach(function (m) {
        for (var k = -1; k <= 0; k++) {
          var x = t - m[0] - k * 24;
          if (x > 0) g += m[1] * (x / 0.8) * Math.exp(1 - x / 0.8);
        }
      });
      return g;
    }
    function glucosePath() {
      var d = "", area = "";
      for (var i = 0; i <= 288; i++) {
        var t = i / 12, r = 60 + (glucose(t) - 4.9) * 10.5, p = pt(t, r);
        d += (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1);
      }
      area = d;
      for (i = 288; i >= 0; i--) { var q = pt(i / 12, 60); area += "L" + q[0].toFixed(1) + " " + q[1].toFixed(1); }
      return { line: d, area: area + "Z" };
    }

    var uid = "dial" + Math.floor(Math.random() * 1e6);
    var svg = node("svg", { viewBox: "0 0 400 400", class: "dial", role: "img", style: "max-width:25rem;width:100%",
      "aria-label": "Animated 24-hour clock: daylight from 6:00 to 18:00, an eating window from 8:00 to 19:00 with three meals, an illustrative glucose curve rising after each meal, and the current time in " + (SITE.city || "Taipei") });
    var defs = node("defs", {}, svg);
    var clip = node("clipPath", { id: uid }, defs);
    var wedge = node("path", { d: "" }, clip);

    var bands = node("g", { class: "dial-bands" }, svg);
    node("path", { d: arc(6, 18, R + 22), fill: "none", stroke: "var(--day-soft)", "stroke-width": 18 }, bands);
    node("path", { d: arc(18, 30, R + 22), fill: "none", stroke: "var(--night-soft)", "stroke-width": 18 }, bands);

    for (var h = 0; h < 24; h++) {
      var major = h % 6 === 0;
      var a = pt(h, R - 10), b = pt(h, R - (major ? 22 : 15));
      node("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1],
        stroke: major ? "var(--ink)" : "var(--muted)", "stroke-width": major ? 1.6 : 1, opacity: major ? 1 : 0.55 }, svg);
    }
    [0, 6, 12, 18].forEach(function (hh) {
      var p = pt(hh, hh % 12 === 0 ? R - 38 : R - 54);
      var t = node("text", { x: p[0], y: p[1], "text-anchor": "middle", "dominant-baseline": "central",
        fill: "var(--muted)", "font-size": 12.5, "font-family": "var(--sans)", style: "font-variant-numeric: tabular-nums" }, svg);
      t.textContent = (hh < 10 ? "0" : "") + hh + ":00";
    });

    // everything that the sweeping hand reveals
    var data = node("g", { "clip-path": "url(#" + uid + ")" }, svg);
    var gp = glucosePath();
    node("circle", { cx: C, cy: C, r: 60, fill: "none", stroke: "var(--rule)", "stroke-width": 1, "stroke-dasharray": "2 4" }, data);
    node("path", { d: gp.area, fill: "var(--day-soft)", opacity: 0.55 }, data);
    node("path", { d: gp.line, fill: "none", stroke: "var(--day)", "stroke-width": 2.2, "stroke-linejoin": "round", "stroke-linecap": "round" }, data);
    node("path", { d: arc(eatEnd, eatStart + 24, R), fill: "none", stroke: "var(--muted)",
      "stroke-width": 1.5, "stroke-dasharray": "1 6", "stroke-linecap": "round" }, data);
    node("path", { d: arc(eatStart, eatEnd, R), fill: "none", stroke: "var(--ink)", "stroke-width": 3, "stroke-linecap": "round" }, data);

    var mealDots = meals.map(function (m) {
      var p = pt(m, R);
      return node("circle", { cx: p[0], cy: p[1], r: 7, fill: "var(--paper)", stroke: "var(--ink)",
        "stroke-width": 2.5, class: "meal-dot", style: "transform-origin:" + p[0].toFixed(1) + "px " + p[1].toFixed(1) + "px" }, svg);
    });

    var hand = node("g", {}, svg);
    node("line", { x1: C, y1: C, x2: C, y2: C - R + 14, stroke: "var(--night)", "stroke-width": 2, "stroke-linecap": "round" }, hand);
    node("circle", { cx: C, cy: C - R + 14, r: 3.5, fill: "var(--night)" }, hand);
    node("circle", { cx: C, cy: C, r: 50, fill: "var(--paper)" }, svg);
    var time = node("text", { x: C, y: C - 4, "text-anchor": "middle", fill: "var(--ink)",
      "font-size": 30, "font-weight": 300, "font-family": "var(--sans)", style: "font-variant-numeric: lining-nums tabular-nums" }, svg);
    var sub = node("text", { x: C, y: C + 20, "text-anchor": "middle", fill: "var(--muted)", "font-size": 12.5, "font-family": "var(--sans)" }, svg);

    el.insertBefore(svg, el.firstChild);

    function setWedge(t) {
      if (t >= 23.999) { wedge.setAttribute("d", "M0 0H400V400H0Z"); return; }
      var e = pt(t, 400), large = t > 12 ? 1 : 0;
      wedge.setAttribute("d", "M" + C + " " + C + " L" + C + " " + (C - 400) + " A400 400 0 " + large + " 1 " + e[0].toFixed(1) + " " + e[1].toFixed(1) + " Z");
    }
    function setHand(t) { hand.setAttribute("transform", "rotate(" + (t / 24 * 360) + " " + C + " " + C + ")"); }
    function setMeals(t) { mealDots.forEach(function (d, i) { d.classList.toggle("on", t >= meals[i]); }); }

    function nowHours() {
      var hh, mm;
      try {
        new Intl.DateTimeFormat("en-GB", { timeZone: SITE.timezone || "Asia/Taipei", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
          .formatToParts(new Date()).forEach(function (p) { if (p.type === "hour") hh = +p.value; if (p.type === "minute") mm = +p.value; });
      } catch (e) { var d = new Date(); hh = d.getHours(); mm = d.getMinutes(); }
      return hh + mm / 60;
    }

    var live = false, raf = null;
    function showNow() {
      var n = nowHours();
      setHand(n);
      time.textContent = fmt(n);
      sub.textContent = SITE.city || "Taipei";
    }

    function finish() {
      setWedge(24); setMeals(24); live = true; showNow();
      el.classList.remove("playing");
    }

    function play() {
      if (reduce) { finish(); return; }
      cancelAnimationFrame(raf);
      live = false;
      el.classList.add("playing");
      var SWEEP = 4200, SETTLE = 900, t0 = null, target = nowHours();
      function ease(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
      function frame(ts) {
        if (t0 === null) t0 = ts;
        var k = ts - t0;
        if (k < SWEEP) {
          var t = 24 * ease(k / SWEEP);
          setWedge(t); setHand(t); setMeals(t);
          time.textContent = fmt(t);
          sub.textContent = t >= eatStart && t <= eatEnd ? "eating window" : (t > eatEnd || t < 6 ? "overnight fast" : "fasting");
          raf = requestAnimationFrame(frame);
        } else if (k < SWEEP + SETTLE) {
          setWedge(24); setMeals(24);
          var s = (k - SWEEP) / SETTLE, from = 0, tt = from + (target - from) * (1 - Math.pow(1 - s, 3));
          setHand(tt); time.textContent = fmt(tt); sub.textContent = SITE.city || "Taipei";
          raf = requestAnimationFrame(frame);
        } else {
          finish();
        }
      }
      setWedge(0); setMeals(0); setHand(0);
      raf = requestAnimationFrame(frame);
    }

    // replay when the clock is clicked
    svg.style.cursor = "pointer";
    svg.setAttribute("tabindex", "0");
    svg.addEventListener("click", play);
    svg.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); } });

    // start when the clock comes into view
    if ("IntersectionObserver" in window && !reduce) {
      setWedge(0); setMeals(0); setHand(0); time.textContent = "00:00"; sub.textContent = "";
      var io = new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { io.disconnect(); setTimeout(play, 350); }
      }, { threshold: 0.4 });
      io.observe(svg);
    } else { finish(); }

    setInterval(function () { if (live) showNow(); }, 30000);
  }

  /* ---------- Upload check ----------
     If style.css or a content file is missing, show a clear message
     at the top of the page saying which file to upload. */

  function uploadCheck() {
    var missing = [];
    var css = getComputedStyle(document.documentElement).getPropertyValue("--paper").trim();
    if (!css) missing.push("style.css");
    var need = { "content-site.js": window.SITE, "content-news.js": window.NEWS,
      "content-publications.js": window.PUBLICATIONS, "content-people.js": window.PEOPLE,
      "content-grants.js": window.GRANTS, "content-cv.js": window.CV };
    for (var f in need) if (!need[f]) missing.push(f);
    if (document.querySelector('[data-render="map"]') && !window.MAP) missing.push("content-map.js");
    if (!missing.length) return;
    var box = document.createElement("div");
    box.setAttribute("role", "alert");
    box.style.cssText = "background:#fff3cd;color:#5c4400;border-bottom:1px solid #e0c36a;padding:12px 16px;font:15px/1.5 system-ui,sans-serif";
    box.innerHTML = "<strong>Some site files are missing:</strong> " + missing.join(", ") +
      ". Upload them to the same place as index.html (not inside a folder), wait a minute, then refresh.";
    document.body.insertBefore(box, document.body.firstChild);
  }

  /* ---------- Run ---------- */

  window.addEventListener("load", uploadCheck);
  iconize();
  header();
  footer();
  bindText();
  document.querySelectorAll("[data-render]").forEach(function (el) {
    var kind = el.getAttribute("data-render");
    ({
      news: renderNews,
      selected: renderSelected,
      publications: renderPublications,
      gallery: renderGallery,
      pi: renderPI,
      members: renderMembers,
      alumni: renderAlumni,
      grants: renderGrants,
      cv: renderCV,
      map: renderMap,
      journey: renderJourney,
      explainer: renderExplainer,
      dial: drawDial
    }[kind] || function () {})(el);
  });
})();
