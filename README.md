# PDFly — Assignment PDF Maker

PDFly helps students convert handwritten and printed assignment photos into perfectly formatted submission PDFs with automatic edge crop, smart document scanning filters, and student roll number details.

Task: Create a single-page web application where students can:

1. Upload photos of their handwritten/printed assignments

2. Enter student details: Full Name, Roll Number, Subject, and Date

3. Automatically generate a PDF file with the student details on top followed by the uploaded images

4. Download the PDF with filename format: "University_RollNo_Name_Date.pdf"

Guidelines:

- Use React with Tailwind CSS for styling

- Keep the design clean, modern, and mobile-friendly

- Use a card-based layout with clear sections: Upload Area, Student Form, Preview Area

- Show image preview after upload

- Use the jsPDF library for PDF generation

- Show loading state while generating PDF

- Display file size after PDF generation

Constraints:

- No database or authentication needed at this stage

- Use only sample/example data

- Keep all processing client-side (browser only)

- Do not add any payment or API key features

- Focus on simple, working functionality

Acceptance Criteria:

- Upload button accepts JPG, PNG images

- Form fields work and validate (name, roll no, subject required)

- PDF generates and downloads correctly

- Filename matches the specified format

- Works on both desktop and mobile screens

- Shows success message: "Your PDF is ready!"

## Features

- **Document Scanner**: Auto-detect paper boundaries and correct perspective warp.
- **Color Filters**: Clean document, black & white high-contrast, magic color, and original enhanced.
- **Roll Number & Details Header**: Formatted university/college submission details.
- **Customizable Compression**: Standard, crisp High, or Compact sizes to meet portal upload limits.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploying to Netlify

This project is pre-configured for one-click deployment on [Netlify](https://www.netlify.com).

### Method 1: Git Integration (Recommended)

1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Log in to [Netlify](https://app.netlify.com/) and click **"Add new site"** > **"Import an existing project"**.
3. Select your repository. Netlify will automatically detect settings from `netlify.toml`:
   - **Build Command:** `npm run build` (or `npm run build:netlify`)
   - **Publish Directory:** `dist/public`
   - **Node Version:** `22` (configured in `.node-version` / `netlify.toml`)
4. _(Optional)_ In **Site configuration > Environment variables**, add:
   - `FEEDBACK_ADMIN_KEY`: (Defaults to `Krunal21128q` if unset)
   - `OWNER_NOTIFICATION_EMAIL`: _(Optional)_ email address for notifications
5. Click **"Deploy site"**.

### Method 2: Netlify CLI

```sh
npm install -g netlify-cli
ntl login
ntl init
ntl deploy --prod
```
