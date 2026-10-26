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
          '<a class="menu-email" href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + "</a>" +
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
      return '<li><a href="' + esc(l.url) + '" rel="noopener">' + esc(l.label) + "</a></li>";
    }).join("");
    var nav = (SITE.nav || []).map(function (n) {
      return '<li><a href="' + esc(n.file) + '">' + esc(n.label) + "</a></li>";
    }).join("");
    el.outerHTML =
      '<footer class="site-footer"><div class="wrap">' +
        "<div>" +
          '<div class="footer-name">' + esc(SITE.labName) + "</div>" +
          "<p>" + esc(SITE.department) + ", " + esc(SITE.university) + "<br>" + esc(SITE.address) + "</p>" +
          '<p><a href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + "</a></p>" +
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
      ? '<div class="pub-links"><a href="https://doi.org/' + esc(p.doi) + '" rel="noopener">doi:' + esc(p.doi) + "</a></div>"
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

  function renderPI(el) {
    var pi = (window.PEOPLE || {}).pi;
    if (!pi) return;
    var facts = (pi.facts || []).map(function (f) {
      return "<dt>" + esc(f.label) + "</dt><dd>" + esc(f.value) + "</dd>";
    }).join("");
    var links = (SITE.links || []).map(function (l) {
      return '<a href="' + esc(l.url) + '" rel="noopener">' + esc(l.label) + "</a>";
    }).join(", ");
    el.innerHTML = '<div class="pi">' + avatar(pi) +
      "<div><h2>" + esc(pi.name) + '</h2><p class="role">' + esc(pi.role) + "</p>" +
      '<div class="prose">' + (pi.bio || []).map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</div>" +
      '<dl class="facts">' + facts + (links ? "<dt>Profiles</dt><dd>" + links + "</dd>" : "") + "</dl>" +
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
      if (SITE.cvPdf) { cv.hidden = false; cv.href = SITE.cvPdf; }
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
  header();
  footer();
  bindText();
  document.querySelectorAll("[data-render]").forEach(function (el) {
    var kind = el.getAttribute("data-render");
    ({
      news: renderNews,
      selected: renderSelected,
      publications: renderPublications,
      pi: renderPI,
      members: renderMembers,
      alumni: renderAlumni,
      grants: renderGrants,
      cv: renderCV,
      dial: drawDial
    }[kind] || function () {})(el);
  });
})();
