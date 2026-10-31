# Vehicle records (placeholders)

**Every record in this directory is a fake-but-plausible placeholder for
development.** Signal lists, model-year ranges and providers are illustrative
and have not been verified. All records are marked `verification: "expected"`.

They must be replaced by the engineering export of signal and compatibility data
before launch. Until then, do not publish them to production.

- Schema: `../schema.ts` (the contract handed to engineering).
- One file per make + model, named `<make>-<model>.json` to match the `slug`
  (`ford/f-150` → `ford-f-150.json`).
- `publishDate` controls when the page goes live (UTC). See the AEO section in
  the repo `README.md`.
- Never add a `realWorld` field until data-rights sign-off.
