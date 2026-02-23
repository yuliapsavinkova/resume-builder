# resume

My resume, built as code. Content lives in `src/data.ts`. Running the build generates a polished `.docx`.

## Why

- **Diffable** — every content change is visible in git history
- **Branchable** — tailor versions per job type without managing multiple files
- **Portable** — one command, no design tools needed

## Stack

- [docx](https://docx.js.org) — programmatic Word document generation
- [tsx](https://github.com/privatenumber/tsx) — run TypeScript directly, no compilation step
- TypeScript, pnpm

## Usage

```bash
pnpm install
pnpm build
# → Yulia_Savinkova_Resume.docx
```

## Editing

**Content** (text, bullets, jobs) → `src/data.ts`  
**Visual tuning** (colors, font sizes, spacing) → `src/styles.ts`  
**Layout / structure** → `src/index.ts`  

## CI

Every push to `main` builds the `.docx` and uploads it as a GitHub Actions artifact.  
Download it from the **Actions** tab → latest run → **Artifacts**.
