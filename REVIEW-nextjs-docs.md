### Quick Assessment

This is a compact, task-oriented page. The before/after example in `App Router` does the most important job well: it shows the exact import pattern readers need to change. The biggest opportunities are stronger scope-signalling and more precise framework wording, so readers can tell what is required, what is optional, and what only applies in App Router server components.

### Missing Expected Documentation

- A short purpose-and-scope intro is missing under the H1. Why it matters: the page starts directly with implementation details, so readers cannot tell whether this is baseline setup for all Next.js projects or a small set of Aksel-specific caveats. Where to add it: directly under `# Next.js`, before `## Bundle-optimalisering`.
- Explicit applicability cues are missing for each section. Why it matters: `Bundle-optimalisering` reads like general Next.js setup, while `App Router` only applies to App Router server components. Without a `Gjelder:` or equivalent label, both humans and LLMs can overgeneralize the workaround. Where to add it: the first line of each section.
- A symptom-oriented note is missing in `## App Router`. Why it matters: the page gives the fix, but not how the problem typically presents itself, which makes the guidance harder to discover when someone is debugging. Where to add it: the opening paragraph of `## App Router`, before the explanation of the cause.

### Things To Change

- [Should fix] In `## Bundle-optimalisering`, the sentence `Nextjs vil ikke automatisk tree-shake Aksel sin React- og ikonpakke` and the claim about `flere hundre kb ekstra bundle-size` are more specific than the linked Next.js guidance. Risk: readers and LLMs can walk away with the wrong mental model that this is always a browser bundle-size problem, while the linked docs describe package-import optimization more broadly across dev/build/cold-start performance. Rephrase this around barrel-import optimization and remove the size claim unless there is Aksel-specific evidence for it.
- [Should fix] In `## App Router`, the sentence about `Nextjs sin webpack-bundler` is too tied to an internal implementation detail. Risk: the explanation will age badly and is harder to trust as Next.js changes tooling and internals. Prefer a stable user-facing rule over an internal-cause explanation unless you plan to maintain that claim.
- [Should fix] The exception `Dette er bare et problem ved direkte bruk i server-components` comes after the long before/after example. Risk: readers may over-apply the workaround and rewrite imports in client code even when they do not need to. Move that exception into a short note before the example or directly under the section heading.
- [Should fix] Terminology is inconsistent: the page title uses `Next.js`, while body text uses `Nextjs`, and English terms such as `path`, `bundle-size`, `server-components`, and `client` are mixed unevenly into Norwegian prose. Risk: weaker scanability, weaker search matching, and noisier extraction for LLMs. Standardize the naming and format code-like terms consistently.
- [Nice to have] `Relatert innhold` lists relevant sources, but not why each one matters. Risk: readers need to infer whether a link is required configuration, deeper background, or optional reading. Add a short label after each link to explain its purpose.

### Optimizations For Humans And LLMs

- Add a two-rule summary block near the top with the canonical answer from this page: `1. Legg til optimizePackageImports for @navikt/ds-react og @navikt/aksel-icons.` `2. I App Router server components: unngå dot-notation og importer fra @navikt/ds-react/<Komponentnavn>.`
- Add `Gjelder:` and `Anbefalt/Påkrevd:` labels at the top of each section. This makes the page much easier to skim and much easier for machine consumers to extract correctly.
- Restructure `## App Router` into a clearer sequence such as `Problem`, `Løsning`, `Når dette ikke gjelder`, even if that is only done with bold lead-ins instead of new headings.
- Turn `Relatert innhold` into labeled bullets with explicit intent, for example `Offisiell Next.js-konfigurasjon` and `Bakgrunn om Server/Client Components`.
- If the team knows the current verification point, add a small version cue such as `Sist verifisert mot Next.js ...`; otherwise avoid low-level implementation-cause wording that will become stale.

### Suggested Edits

- Under the H1, add: `Denne siden samler det som er spesielt for bruk av Aksel i Next.js: anbefalt bundle-optimalisering og en kjent begrensning i App Router server components.`
- At the top of `## Bundle-optimalisering`, add: `Gjelder: Next.js-prosjekter som bruker @navikt/ds-react eller @navikt/aksel-icons.`
- Replace the opening of `## Bundle-optimalisering` with: `Aksel-pakkene eksporteres via mange re-exports. I Next.js bør du derfor legge til optimizePackageImports for @navikt/ds-react og @navikt/aksel-icons, slik at unødvendig kostnad ved barrel-importer reduseres.`
- At the top of `## App Router`, add: `Gjelder: bare App Router og direkte bruk i server components.`
- Replace the cause sentence in `## App Router` with: `I App Router server components fungerer ikke ds-react-komponenter med dot-notation stabilt. Bruk derfor komponentens subpath-import i stedet.`
- Move the current `"use client"` exception into a short note before the code example: `Dette gjelder ikke i filer som allerede er client components med "use client".`

### Open Questions

- Finnes det en upstream-issue eller intern issue for dot-notation-begrensningen som bør lenkes fra `## App Router`?
- Skal siden dekke bare App Router, eller bør den uttrykkelig si at den andre seksjonen ikke er relevant for Pages Router-prosjekter?
- Er påstanden om `flere hundre kb ekstra bundle-size` basert på en konkret Aksel-måling? Hvis ikke bør den mykes opp.
