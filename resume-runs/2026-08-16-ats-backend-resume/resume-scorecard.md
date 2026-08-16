# Resume scorecard - ATS Backend Engineer resume

## Intended surface

- Audience: general Backend Engineer / Python Engineer applications.
- Profile: Resume Intelligence `ats-safe`.
- Layout: single-column, text-first DOCX with standard headings and no visual-only content.
- Design system: Resume Intelligence `ats-safe` profile, used as a resume-specific override to the Documents skill's general-business presets. No headers, footers, tables, sidebars, photos, or text boxes carry resume content.

## Quality gate before generation

| Check | Result |
| --- | --- |
| Role positioning visible in first skim | Pass - target title and summary are first. |
| Standard ATS section names | Pass - Summary, Technical Skills, Professional Experience, Education. |
| Experience ordering | Pass - latest role first; projects kept under the associated employer context. |
| Contact data | Pass - email, phone, location, LinkedIn, GitHub, and portfolio included from candidate-approved public source. |
| Skills | Pass - grouped and role-relevant. |
| Confidential client/project names | Pass - anonymised. |
| Exact metrics | Pass for safety - deliberately omitted until confirmed. |
| Certifications | Deferred - issuer/year missing. |
| Current status after Apr 2026 | Needs user input - no invented date or role. |

## Expected outcome

ATS risk should be **low** after DOCX generation and extraction validation. Recruiter skim strength should be **strong** for broad Python backend applications, but the resume needs job-posting tailoring for AI-specialist, platform, or senior-lead roles.
