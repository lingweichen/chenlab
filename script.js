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
    "images": ["s", "<path d=\"m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16\" /><path d=\"M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2\" /><circle cx=\"13\" cy=\"7\" r=\"1\" fill=\"currentColor\" /><rect x=\"8\" y=\"2\" width=\"14\" height=\"14\" rx=\"2\" />"]
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

  function pubHTML(p) {
    var venue = "<em>" + esc(p.journal) + "</em>" + (p.details ? ", " + esc(p.details) : "");
    if (p.showYear) venue += ", " + esc(p.year);
    var type = TYPE_LABEL[p.type] ? '<span class="pub-type">' + TYPE_LABEL[p.type] + ". </span>" : "";
    var link = p.doi
      ? '<div class="pub-links"><a href="https://doi.org/' + esc(p.doi) + '" rel="noopener">' + icon("external", "icon lead") + "doi:" + esc(p.doi) + "</a></div>"
      : "";
    return '<li class="pub">' +
      '<div class="pub-title">' + esc(p.title) + "</div>" +
      '<div class="pub-authors">' + authorsHTML(p.authors) + "</div>" +
      '<div class="pub-venue">' + type + venue + "</div>" +
      link + "</li>";
  }

  function renderSelected(el) {
    var limit = parseInt(el.getAttribute("data-limit") || "4", 10);
    var items = (window.PUBLICATIONS || []).filter(function (p) { return p.selected; }).slice(0, limit);
    el.innerHTML = items.map(function (p) {
      return pubHTML(Object.assign({}, p, { showYear: true }));
    }).join("");
  }

  function renderPublications(root) {
    var all = window.PUBLICATIONS || [];
    var state = { q: "", type: "all", led: false };
    var list = root.querySelector("[data-pub-list]");
    var count = root.querySelector("[data-pub-count]");

    function draw() {
      var q = state.q.toLowerCase().trim();
      var shown = all.filter(function (p) {
        if (state.type !== "all" && p.type !== state.type) return false;
        if (state.led && !isLed(p)) return false;
        if (!q) return true;
        return (p.title + " " + p.authors + " " + p.journal + " " + p.year).toLowerCase().indexOf(q) !== -1;
      });
      count.textContent = "Showing " + shown.length + " of " + all.length + " publications";

      if (!shown.length) {
        list.innerHTML = '<p class="empty">No publications match. Try a different word or clear the filters.</p>';
        return;
      }
      var years = [];
      var byYear = {};
      shown.forEach(function (p) {
        if (!byYear[p.year]) { byYear[p.year] = []; years.push(p.year); }
        byYear[p.year].push(p);
      });
      years.sort(function (a, b) { return b - a; });
      list.innerHTML = years.map(function (y) {
        return '<section class="year-group" aria-label="' + y + '">' +
          '<div class="year-label">' + y + "</div>" +
          '<ol class="pubs">' + byYear[y].map(pubHTML).join("") + "</ol></section>";
      }).join("");
    }

    root.querySelector("[data-pub-search]").addEventListener("input", function (e) {
      state.q = e.target.value; draw();
    });
    root.querySelector("[data-pub-led]").addEventListener("change", function (e) {
      state.led = e.target.checked; draw();
    });
    var buttons = root.querySelectorAll("[data-pub-type]");
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        state.type = b.getAttribute("data-pub-type");
        buttons.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        draw();
      });
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
    function node(tag, attrs) {
      var n = document.createElementNS(NS, tag);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      return n;
    }

    var svg = node("svg", { viewBox: "0 0 400 400", class: "dial", role: "img", style: "max-width:25rem;width:100%",
      "aria-label": "A 24-hour clock showing daylight from 6:00 to 18:00, an eating window from 8:00 to 19:00 with three meals, and the current time in " + (SITE.city || "Taipei") });

    // light and dark bands
    svg.appendChild(node("path", { d: arc(6, 18, R + 22), fill: "none", stroke: "var(--day-soft)", "stroke-width": 18 }));
    svg.appendChild(node("path", { d: arc(18, 30, R + 22), fill: "none", stroke: "var(--night-soft)", "stroke-width": 18 }));

    // hour ticks
    for (var h = 0; h < 24; h++) {
      var major = h % 6 === 0;
      var a = pt(h, R - 10), b = pt(h, R - (major ? 22 : 15));
      svg.appendChild(node("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1],
        stroke: major ? "var(--ink)" : "var(--muted)", "stroke-width": major ? 1.6 : 1, opacity: major ? 1 : 0.55 }));
    }
    [0, 6, 12, 18].forEach(function (hh) {
      var p = pt(hh, hh % 12 === 0 ? R - 38 : R - 52);
      var t = node("text", { x: p[0], y: p[1], "text-anchor": "middle", "dominant-baseline": "central",
        fill: "var(--muted)", "font-size": 12.5, "font-family": "var(--sans)", style: "font-variant-numeric: tabular-nums" });
      t.textContent = (hh < 10 ? "0" : "") + hh + ":00";
      svg.appendChild(t);
    });

    // fasting (dotted) and eating (solid) on the main ring
    svg.appendChild(node("path", { d: arc(eatEnd, eatStart + 24, R), fill: "none", stroke: "var(--muted)",
      "stroke-width": 1.5, "stroke-dasharray": "1 6", "stroke-linecap": "round" }));
    var eat = node("path", { d: arc(eatStart, eatEnd, R), fill: "none", stroke: "var(--ink)",
      "stroke-width": 3, "stroke-linecap": "round", class: "eat-arc" });
    svg.appendChild(eat);

    meals.forEach(function (m, i) {
      var p = pt(m, R);
      svg.appendChild(node("circle", { cx: p[0], cy: p[1], r: 7, fill: "var(--paper)", stroke: "var(--ink)",
        "stroke-width": 2.5, class: "meal", style: "animation-delay:" + (0.5 + i * 0.45) + "s" }));
    });

    // current time hand
    var hand = node("line", { x1: C, y1: C, x2: C, y2: C - R + 14, stroke: "var(--night)", "stroke-width": 2, "stroke-linecap": "round" });
    var tip = node("circle", { cx: C, cy: C - R + 14, r: 3.5, fill: "var(--night)" });
    var g = node("g", {});
    g.appendChild(hand); g.appendChild(tip);
    svg.appendChild(g);
    svg.appendChild(node("circle", { cx: C, cy: C, r: 46, fill: "var(--paper)" }));

    var time = node("text", { x: C, y: C - 4, "text-anchor": "middle", fill: "var(--ink)",
      "font-size": 30, "font-weight": 300, "font-family": "var(--sans)", style: "font-variant-numeric: lining-nums tabular-nums" });
    var city = node("text", { x: C, y: C + 20, "text-anchor": "middle", fill: "var(--muted)",
      "font-size": 12.5, "font-family": "var(--sans)" });
    city.textContent = SITE.city || "Taipei";
    svg.appendChild(time); svg.appendChild(city);

    el.insertBefore(svg, el.firstChild);
    eat.style.setProperty("--len", eat.getTotalLength());

    function tick() {
      var parts;
      try {
        parts = new Intl.DateTimeFormat("en-GB", { timeZone: SITE.timezone || "Asia/Taipei",
          hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
      } catch (e) { parts = null; }
      var hh, mm;
      if (parts) {
        parts.forEach(function (p) { if (p.type === "hour") hh = +p.value; if (p.type === "minute") mm = +p.value; });
      } else { var d = new Date(); hh = d.getHours(); mm = d.getMinutes(); }
      time.textContent = (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm;
      g.setAttribute("transform", "rotate(" + ((hh + mm / 60) / 24 * 360) + " " + C + " " + C + ")");
    }
    tick();
    setInterval(tick, 30000);
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
      dial: drawDial
    }[kind] || function () {})(el);
  });
})();
