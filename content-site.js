/* ===========================================================
   SITE SETTINGS
   Lab name, contact details, profile links and the menu.
   Everything here appears on every page.
   =========================================================== */

window.SITE = {
  labName: "Ling-Wei Chen",
  tagline: "Research in Context",
  piName: "Ling-Wei Chen",
  university: "National Taiwan University",
  department: "Institute of Epidemiology and Preventive Medicine, College of Public Health",
  address: "No. 17, Xu-Zhou Road, Taipei 100, Taiwan",
  email: "lingweichen@ntu.edu.tw",
  phone: "+886-2-3366-9537",

  // City and time zone shown on the home-page clock
  city: "Taipei",
  timezone: "Asia/Taipei",

  // Shown in the footer and on the Publications page
  metrics: {
    publications: 63,
    citations: "3,370",
    hIndex: 31,
    source: "Google Scholar",
    asOf: "September 2026"
  },

  // Profile links (footer and Team members page). Delete or add freely.
  links: [
    { label: "ORCID", url: "https://orcid.org/0000-0002-2661-8752" },
    { label: "Google Scholar", url: "https://scholar.google.com/citations?user=PhAXzewAAAAJ&hl=en" },
    { label: "Web of Science", url: "https://www.webofscience.com/wos/author/record/D-5559-2016" }
    { label: "LinkedIn", url:  "https://www.linkedin.com/in/lingweichen/"}
  ],

  // Your CV as a PDF: upload the file next to index.html and write its
  // name here, e.g. "CV_Ling-Wei_Chen.pdf". "" hides the button.
  cvPdf: "",

  // Paste the address of your teaching website here to show a link
  // on the News & Resources page. Leave as "" to hide it.
  teachingSite: "",

  // The menu. "file" must match the HTML file name.
  nav: [
    { label: "Home", file: "index.html" },
    { label: "Research", file: "research.html" },
    { label: "Publications", file: "publications.html" },
    { label: "Team members", file: "team.html" },
    { label: "CV", file: "cv.html" },
    { label: "News & Resources", file: "news.html" },
    { label: "Contact", file: "contact.html" }
  ],

  updated: "October 2026"
};
