# Ling-Wei Chen — Research in Context

A plain website for GitHub Pages. Every file sits in one folder, with no
subfolders, so uploading is simple. No build step, nothing to install.

## Uploading to GitHub

1. Unzip the download and open the `ling-wei-chen-website` folder.
2. Select **all** the files inside it (Ctrl+A, or Cmd+A on a Mac).
3. In your GitHub repository click **Add file → Upload files**, drag the
   files in (or use “choose your files” and select them all), then click
   **Commit changes**.
4. First time only: **Settings → Pages → Deploy from a branch**, choose
   `main` and `/ (root)`, and save.

The files must be at the top level of the repository, next to each other,
not inside a folder. If a file is missing, a yellow bar at the top of the
site names it.

After an upload, wait a minute and refresh with Ctrl+Shift+R
(Cmd+Shift+R on a Mac).

## Where things live

| To change…                                   | Edit this file             |
| -------------------------------------------- | -------------------------- |
| Name, email, address, menu, profile links    | `content-site.js`          |
| News items                                   | `content-news.js`          |
| Publications                                 | `content-publications.js`  |
| Team members and alumni                      | `content-people.js`        |
| Funding list                                 | `content-grants.js`        |
| CV page (positions, awards, talks…)          | `content-cv.js`            |
| Research themes, cohorts, methods            | `research.html`            |
| Home-page headline and “What we study”       | `index.html`               |
| Courses and further reading                  | `news.html`                |
| Colours and fonts                            | `style.css` (top of file)  |

You won’t need to touch `script.js`.

To edit on github.com, click a file, click the pencil icon, make the change
and click **Commit changes**. Each content file has instructions at the top.
The usual job is to copy an existing line, paste it, and change the text.

### Three rules that prevent almost every problem

1. Keep the straight quotation marks `"..."` around each value. Word and
   Pages turn them into curly ones, which breaks the file, so edit on
   GitHub or in a plain text editor.
2. Keep the comma at the end of each line in a list.
3. If your text needs a quotation mark, use curly ones “like this”.

GitHub keeps every version, so any mistake can be undone.

### Common tasks

- **Add a paper:** paste a new line at the top of the list in
  `content-publications.js`. `"selected": true` features it on the home page.
- **Add news:** add a line at the top of `content-news.js`. The home page
  shows the five newest.
- **A student graduates:** move their line from `members` to `alumni` in
  `content-people.js` and add `thesis: "…"`.
- **Add a photo:** upload the image next to `index.html` and add
  `photo: "yuen.jpg"` to that person’s line.
- **Add your CV as a PDF:** upload it and set
  `cvPdf: "CV_Ling-Wei_Chen.pdf"` in `content-site.js`.
- **Link your teaching site:** paste its address into `teachingSite` in
  `content-site.js`.

## Icons

Profile links get their icon automatically from the web address
(ORCID, Google Scholar, Web of Science, LinkedIn, ResearchGate, PubMed;
anything else gets a plain link icon).

To put an icon in front of a heading or label in any HTML file, add
`data-icon="name"`, for example `<h3 data-icon="mail">Email</h3>`.

Available names: mail, phone, pin, download, clock, glucose, baby,
layers, external, link, cap, globe, users, award, talk, news, book,
work, orcid, scholar, wos, researchgate, pubmed, linkedin.

## Previewing on your computer

Unzip first, then double-click `index.html` in the unzipped folder.
