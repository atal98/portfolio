# Tool usage log - ATS Backend Engineer resume

| Tool/action | Purpose | Result |
| --- | --- | --- |
| `pypdf.PdfReader` | Extract and validate the supplied resume's text, dates, experience, education, and metadata | Used as the sole career evidence source. |
| `rg` on `src/data/portfolio.js` | Retrieve candidate-approved public contact and profile URLs | Found canonical LinkedIn, GitHub, portfolio, email, phone, and location values. |
| Resume Intelligence evidence and privacy workflow | Claim selection, confidence handling, and sanitisation | Exact customer names, internal project names, and unconfirmed metrics are excluded from final resume wording. |
| `build_resume_docx.py --profile ats-safe` | Create single-column application DOCX | Scheduled after content approval files are generated. |
| Documents render workflow | Render and inspect DOCX pages, then export matching PDF | Attempted with `--emit_pdf`; blocked because LibreOffice and Microsoft Word are unavailable on this machine. |
| `python-docx` structural inspection | Check live text, paragraphs, lists, layout containers, and page setup | Passed: 32 paragraphs, 15 real bullet paragraphs, no tables, and empty header/footer. |
