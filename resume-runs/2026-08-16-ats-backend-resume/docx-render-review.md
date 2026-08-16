# DOCX render and structural QA

## Intended profile

- Resume profile: `ats-safe`.
- Layout: single column, normal document flow, standard headings, no tables, no header/footer content, no text boxes, no sidebars, and no photos.
- Companion profile: `modern-technical`.
- Companion layout: strong left-aligned header, restrained accent, summary callout, controlled two-column skills table, and an explicit footer that marks it as non-ATS companion material.

## Render attempt

The Documents renderer was invoked with `--emit_pdf`. It could not start a DOCX-to-PDF conversion because this machine has neither LibreOffice (`soffice`) nor Microsoft Word (`WINWORD.EXE`) available. Therefore, **PNG visual QA and PDF export could not be completed in this environment**.

## Structural checks completed

| Check | Result |
| --- | --- |
| DOCX created successfully | Pass - rebuilt after adding the public profile links. |
| Letter portrait page size | Pass |
| Single-column normal paragraph flow | Pass |
| Tables in document body | Pass - 0 |
| Header / footer resume content | Pass - empty |
| Standard ATS headings and live text | Pass |
| Experience order | Pass - newest role first |
| Bullet paragraphs | Pass - 15 actual Word `List Bullet` paragraphs |
| Public contact details | Pass - email, phone, location, portfolio, LinkedIn, and GitHub appear in the header block; portfolio, LinkedIn, and GitHub are real external hyperlinks. |

## Companion structural checks

| Check | Result |
| --- | --- |
| `designed-resume.docx` created successfully | Pass |
| External hyperlinks | Pass - Portfolio, LinkedIn, and GitHub each point to the candidate-confirmed public URL. |
| Controlled visual grouping | Pass - two tables only: summary callout and technical skills. |
| Footer clarity | Pass - marks the file as a designed companion and directs job-portal users to the ATS version. |
| Header content | Pass - no important information placed in a Word header. |
| Source PDF-style letter spacing or glyph splitting | Pass - no such content in the generated DOCX |

## Limitation

The document is structurally ATS-safe but has **not passed visual-render QA**. Before sending applications, open it in Word or LibreOffice and export it to PDF, checking for page count, clean bullet wrapping, and no orphaned role heading at a page break.
