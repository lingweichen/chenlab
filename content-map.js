/* ===========================================================
   MAP
   Places shown on the map on the Research page. To add a place,
   copy a line and change it. Find latitude and longitude by
   right-clicking a spot in Google Maps.

   name    shown in the list under the map
   label   short name written on the map
   lat/lon position
   home    true for your home base (drawn with a ring)
   region  true to draw a wide circle for a whole region
   text    one or two sentences shown in the list
   =========================================================== */

window.MAP = {
  places: [
    { name: "Taipei, Taiwan", label: "Taipei", lat: 25.03, lon: 121.56, home: true,
      text: "National Taiwan University. Pregnancy cohort studies with continuous glucose monitoring, and the TIGER cohort of older adults." },
    { name: "Singapore", label: "Singapore", lat: 1.30, lon: 103.80,
      text: "GUSTO and S-PRESTO birth cohorts and the NiPPeR trial, with the National University of Singapore and A*STAR’s Singapore Institute for Clinical Sciences." },
    { name: "Dublin, Ireland", label: "Dublin", lat: 53.35, lon: -6.26,
      text: "University College Dublin and the Lifeways Cross-Generation Cohort." },
    { name: "Europe", label: "ALPHABET", lat: 50.0, lon: 9.0, region: true,
      text: "The ALPHABET consortium, pooling seven European birth cohorts in six countries." },
    { name: "Sydney, Australia", label: "Sydney", lat: -33.87, lon: 151.21,
      text: "Charles Perkins Centre, University of Sydney, through a University of Sydney–NTU Ignition Grant (2026)." }
  ]
};
