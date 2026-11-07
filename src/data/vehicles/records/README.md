# Vehicle records

Each record describes what DIMO observes for one make and model, generated from
a network coverage export by the AEO studio (`scripts/import-records.ts` in
DIMO-Network/dimo-aeo-studio). Don't hand-edit coverage: rerun the importer.

- A model gets a record once enough vehicles reported data through Ruptela,
  AutoPi or Tesla in the 90 days before the export. Other connections are
  deliberately left out.
- A signal is listed when most of that model's recent vehicles on that
  connection report it. Labels and units come from the docs' signal reference
  (`src/components/TelemetryFieldsBlock/telemetry-data.ts`).
- Records hold no vehicle counts, token IDs or readings.
- `intro` and `faq` are drafted prose; the importer keeps them, along with
  `publishDate`, when it refreshes a record.

Conventions:

- Schema: `../schema.ts`.
- One file per make + model, named `<make>-<model>.json` to match the `slug`
  (`ford/f-150` → `ford-f-150.json`).
- `publishDate` controls when the page goes live (UTC). See the AEO section in
  the repo `README.md`.
- Never add a `realWorld` field until data-rights sign-off.
