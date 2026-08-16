# Tool usage log — Resume PDF audit

| Tool/action | Purpose | Result |
| --- | --- | --- |
| `pypdf.PdfReader` | Page count, metadata, text extraction, resource inspection | Two pages; live text is present in nested PDF form objects, but reading order and character grouping are unreliable. |
| Poppler `pdftoppm` render attempt | Visual verification | Not available: the bundled wrapper points to a missing executable. No PDF was changed. |
| Prior user-provided audit | Comparison scope | Evaluated each stated claim against the fresh structural extraction. |
