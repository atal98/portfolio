# Resume scorecard — PDF audit

## Outcome

- Recommended page count: **two pages**, provided the content is restructured and each employer leads with only the strongest evidence.
- ATS risk: **high** for the current PDF.
- Recruiter first-page strength: **adequate content, weak presentation order**.
- Target-role positioning: **weak**, because no headline or summary tells a recruiter whether to read this as backend, platform, cloud, or AI-workflow engineering.

## Fresh structural findings

1. The PDF has live text, not a scanned image. However, it stores visually separated characters individually: extraction produces `A T A L U P A D H Y A Y` and similarly fragments every line.
2. The reading order is wrong. On page one, a project appears before the associated employer/title, and the skills section interrupts the ETIOT role. Page two begins with a project before its role line.
3. Several punctuation characters extract as replacement glyphs (`�`). This weakens parser reliability and search matching.
4. Metadata identifies the producer and creator as Canva. That is evidence of the export path, not proof that Canva alone caused the problem. The demonstrable issue is the generated PDF structure.
5. Important header information contains only name, location, phone, and email. There is no LinkedIn, GitHub, portfolio, role title, or summary.

## Comparison with the supplied audit

| Earlier audit point | Verdict | Detail |
| --- | --- | --- |
| Extraction is broken | Confirmed | Strongly confirmed by fresh extraction and reading-order checks. |
| Canva export is unreliable | Confirmed with nuance | This specific Canva PDF is unreliable. Canva itself is not automatically ATS-incompatible; the structure of this export is the failure. |
| Rebuild as a native-text DOCX / sound PDF | Confirmed | A plain DOCX is the safest application source. The current PDF technically contains live text, but it is not semantically usable enough. |
| Missing target headline and summary | Confirmed | Add a clear target role plus a short evidence-based summary. |
| Missing LinkedIn, GitHub, and portfolio | Confirmed | Add only links that are current and publicly safe to share. |
| Skills are a keyword dump | Confirmed | Group by Backend & APIs, Cloud & DevOps, Data & AI, and Databases & Messaging; lead with role-relevant tools. |
| `Django-jasmine` may be a typo | Needs user confirmation | Likely `django-jazzmin`, but this should not be silently changed. |
| Bullets are long / vague | Confirmed | Many combine action, implementation, and several outcomes. Split or delete unsupported impact language. |
| Repeated percentage claims may look inflated | Confirmed as an interview risk | Do not remove true metrics solely because they repeat; retain only those with a defensible baseline, data source, and time window. |
| Certifications need issuer/year | Confirmed | Add issuer and completion year, and include credential URLs/IDs only if useful and public. |
| Potential post-April 2026 gap | Needs user confirmation | The document ends in Apr 2026. Do not invent an update; reflect the true current employment status. |
| Serif/purple visual style and page-flow concerns | Not independently re-rendered in this run | These are credible visual concerns from the earlier audit, but this environment could not generate fresh page images. They do not change the structural ATS verdict. |

## Top fixes before applying

1. Rebuild in a single-column DOCX using normal paragraph styles; export a new tagged/text PDF only after testing extraction.
2. Add `Backend Engineer | Django, FastAPI, AWS & AI Workflows` (or your confirmed target title), then a concise summary.
3. Put company, job title, location, and date range before every project/bullet group; do not let a page break detach projects from their employer.
4. Group skills and remove weakly relevant or unverified items from the main skills block.
5. Verify every metric's baseline, period, and ownership; replace vague claims with truthful scope where a measure is unavailable.

## Required candidate confirmations

- Is `Django-jasmine` actually `django-jazzmin`?
- What target role(s) should the general resume pursue?
- What is your employment status after April 2026?
- Which LinkedIn, GitHub, and portfolio URLs are correct?
- Which metrics can you explain with a baseline and time period?
