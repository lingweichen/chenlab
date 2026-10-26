/* ===========================================================
   CV
   The short CV shown on the CV page. Newest first in each list.
   For the full CV, add a PDF and set cvPdf in content-site.js.

   CAREER JOURNEY: the timeline at the top of the CV page is built
   from positions and education entries that have "country".
   "short" and "where" are the labels on the timeline. Add
   journey: false to leave an entry off the timeline.
   =========================================================== */

window.CV = {
  positions: [
    { years: "2025–", title: "Associate Professor", short: "Associate Professor", where: "National Taiwan University", country: "Taiwan", place: "Institute of Epidemiology and Preventive Medicine, College of Public Health, National Taiwan University" },
    { years: "2021–2025", title: "Assistant Professor", short: "Assistant Professor", where: "National Taiwan University", country: "Taiwan", place: "Institute of Epidemiology and Preventive Medicine, College of Public Health, National Taiwan University" },
    { years: "2021–2025", title: "Adjunct Research Scientist", journey: false, place: "Singapore Institute for Clinical Sciences, A*STAR, Singapore" },
    { years: "2020–2021", title: "Research Scientist in Women’s Health", short: "Research Scientist", where: "A*STAR, Singapore", country: "Singapore", place: "Singapore Institute for Clinical Sciences, A*STAR, Singapore" },
    { years: "2017–2019", title: "Postdoctoral Research Fellow in Early Life Programming", short: "Postdoctoral Fellow", where: "University College Dublin", country: "Ireland", place: "University College Dublin, Ireland" },
    { years: "2015–2017", title: "Research Fellow in Child Growth and Body Composition", short: "Research Fellow", where: "National University of Singapore", country: "Singapore", place: "Department of Paediatrics, National University of Singapore" }
  ],

  education: [
    { years: "2010–2014", title: "PhD in Epidemiology", short: "PhD, Epidemiology", where: "National University of Singapore", country: "Singapore", place: "Saw Swee Hock School of Public Health, National University of Singapore" },
    { years: "2006–2010", title: "BSc (First Class Honours) in Life Sciences", short: "BSc, Life Sciences", where: "National University of Singapore", country: "Singapore", place: "Faculty of Science, National University of Singapore" }
  ],

  awards: [
    { years: "2026", title: "Springer Nature Editorial Contribution Award and Author Service Award" },
    { years: "2022", title: "IUNS Early Career Travel Grant, 22nd International Congress of Nutrition, Tokyo" },
    { years: "2021–2024", title: "Incentives for Newly Hired Exceptional Talent, National Taiwan University" },
    { years: "2019", title: "DOHaD Society Travel Award, 11th DOHaD World Congress, Melbourne" },
    { years: "2019", title: "Finalist, Nutritional Translation Award, American Society for Nutrition" },
    { years: "2019", title: "Honourable Mention, Emerging Leaders in Nutrition Science, American Society for Nutrition" },
    { years: "2015", title: "Shortlisted for best PhD thesis, National University of Singapore" },
    { years: "2010–2014", title: "President’s Graduate Fellowship, National University of Singapore" }
  ],

  service: [
    { years: "2023–", title: "Editorial Board Member, BMC Medicine" },
    { years: "2020–2026", title: "Editorial Board Member, BMC Pediatrics" },
    { years: "2018–2023", title: "Guest Editor, Frontiers in Nutrition and Nutrients (three special issues)" },
    { years: "2021–2026", title: "Grant reviewer: Foundation for Science and Technology (Portugal; Review Panel Member), UKRI/MRC (UK; ad hoc), NMRC (Singapore; ad hoc), Austrian Science Fund (Austria; ad hoc)" }
  ],

  talks: [
    { years: "2026", title: "GDM APAC 2026 Workshop, Hong Kong" },
    { years: "2026", title: "Asia-Pacific International Symposium on Chrononutrition, Japan" },
    { years: "2026", title: "Charles Perkins Centre, University of Sydney, Australia" },
    { years: "2025", title: "World Sleep 2025 Congress, Singapore" },
    { years: "2025", title: "Taipei Medical University, Taiwan" },
    { years: "2024", title: "OxPop Global Maternal and Perinatal Health Symposium, University of Oxford, UK" },
    { years: "2023", title: "NTU–University of Tokyo Joint Symposium, Taiwan" }
  ]
};
