/* ===========================================================
   PEOPLE
   To add a photo, upload the image next to index.html and set
   photo: "filename.jpg". Without a photo, initials
   are shown instead.
   "note" and "topic" are optional.
   Move people from "members" to "alumni" when they graduate.

   LAB PHOTO: upload a group photo next to index.html and write its
   name in groupPhoto. It appears wide across the top of the Team
   members page. groupCaption is optional. "" hides it.
   =========================================================== */

window.PEOPLE = {
  groupPhoto: "",
  groupCaption: "",

  pi: {
    name: "Ling-Wei Chen, PhD",
    role: "Associate Professor and Principal Investigator",
    photo: "LWC.png",
    bio: [
      "Ling-Wei Chen is a nutritional and perinatal epidemiologist. His research asks how diet and its timing before, during and after pregnancy shape the metabolic health of mothers and their children, with a focus on chrono-nutrition, gestational diabetes and continuous glucose monitoring.",
      "He trained at the National University of Singapore (BSc, first-class honours; PhD in Epidemiology, President’s Graduate Fellow), then worked as a research fellow at NUS Paediatrics and as a postdoctoral fellow at University College Dublin, where he co-led a work package on growth and cardiometabolic health in the EU-funded ALPHABET consortium. He was a research scientist at A*STAR’s Singapore Institute for Clinical Sciences before joining National Taiwan University in 2021.",
      "He has published more than 60 peer-reviewed papers and serves as an Editorial Board Member of <em>BMC Medicine</em>."
    ],
    facts: [
      { label: "Education", value: "PhD in Epidemiology, National University of Singapore, 2014" },
      { label: "Editorial", value: "BMC Medicine (2023–present); BMC Pediatrics (2020–2026)" },
      { label: "Languages", value: "English, Mandarin, Hakka, Malay; some Cantonese and Japanese" }
    ]
  },

  members: [
    { name: "Yu-En Chen", role: "PhD student", years: "2023–", note: "Registered dietitian", topic: "Chrono-nutrition, intermittent fasting and glycemia in pregnancy" },
    { name: "Wei-Jiun Li, MD", role: "Master’s student", years: "2023–" },
    { name: "Ting-Wei Ho", role: "Master’s student", years: "2024–" },
    { name: "Bing-Han Lin", role: "Master’s student", years: "2025–" },
    { name: "Chen-Yu Lee", role: "Master’s student", years: "2025–" },
    { name: "Joi-Chi Su", role: "Master’s student", years: "2025–" },
    { name: "Shih-Ming Chiu", role: "Master’s student", years: "2025–" },
    { name: "Po-Cheng Liao", role: "Master’s student", years: "2025–" },
    { name: "Pei-Ying Tseng", role: "Master’s student", years: "2025–", note: "Registered dietitian" },
    { name: "Yun-Jie Yang", role: "Master’s student", years: "2025–" },
    { name: "Hsuan-Yu Yeh", role: "Master’s student (co-supervised)", years: "2025–" }
  ],

  alumni: [
    { name: "Ya-Hsuan He", role: "Master’s", years: "2024–2026", thesis: "Associations of early-pregnancy dietary quality with glycemic parameters among pregnant women" },
    { name: "Jia-Hui Wu", role: "Master’s", years: "2023–2026", thesis: "Associations of dietary glycemic index and load with glycemia during pregnancy" },
    { name: "Hsiao-Yun Chiu", role: "Master’s", years: "2023–2025", thesis: "Associations of predominant night-eating with plasma glycemic parameters and continuous glucose monitoring measures among pregnant women" },
    { name: "Yi-Wen Tsai", role: "Master’s (co-supervised)", years: "2023–2025", thesis: "The effect of mosquito breeding source elimination on dengue vector indexes and hot spots in Beitou District" },
    { name: "Hui-Li Tsai", role: "Master’s", years: "2021–2023", thesis: "Intermittent fasting and metabolic health: an umbrella review and network meta-analysis" },
    { name: "Ting-I Lee", role: "Master’s (co-supervised)", years: "2021–2023", thesis: "Associations of diet quality with cognitive frailty in community-dwelling older adults" }
  ]
};
