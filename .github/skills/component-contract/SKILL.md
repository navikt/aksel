---
name: component-contract
description: "Define and verify component behavior, state ownership, accessibility and compatibility before changing a public component contract. Use when adding or changing controlled state, callbacks, async transitions, composition, keyboard or focus behavior, semantics, or consumer-facing props."
---

# Component contract

Use this workflow for the behavior affected by a component change. Do not turn every dimension below into a new requirement when the change does not touch it.

## Establish the existing contract

Read the component folder, including its exports, metadata, stories, tests and relevant CSS. Trace related hooks, contexts and callers when the behavior crosses component boundaries. Preserve established behavior unless the requested change intentionally changes it.

For the affected behavior, record a compact contract:

| Area               | Define when relevant                                                                                                                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| State ownership    | Controlled and uncontrolled inputs, defaults, source of truth, and what callbacks signal. A controlled component must reflect the owner's prop; do not assume a requested update was accepted. |
| Async transitions  | Relevant pending, success, failure, cancellation or stale-result behavior, and what the user sees.                                                                                             |
| Composition        | Which component or context owns registration, event handling and cleanup; how nesting or portals affect the behavior.                                                                          |
| Accessibility      | Native semantics, accessible name/content responsibility, roles, states and relationships. Identify what the library guarantees and what the consumer must provide.                            |
| Keyboard and focus | Supported keys, focus entry/movement/return, and whether each outcome is synchronous or eventual. Apply pattern-specific behavior only where that pattern is used.                             |
| Compatibility      | Public API and React 17–19 / SSR constraints affected by the change.                                                                                                                           |

Keep the contract proportional to the change. Use existing documentation, JSDoc, stories and tests to record decisions; do not create a new metadata format or a separate document for every component.

## Verify the contract

- Identify the closest existing story or test that demonstrates each changed behavior. Prefer observable public-component outcomes over assertions on implementation details.
- Check that the starting state and intermediate outcome distinguish the intended behavior from a no-op.
- Cover meaningful accepted and rejected controlled updates, async outcomes, or nested interactions when they are part of the change.
- Verify accessible names and relationships against the actual rendered elements when those semantics change. Do not infer accessibility from attribute presence alone.
- Separate automated interaction evidence from visual inspection or manual assistive-technology checks; report what was not verified.
- Use `aksel-local-validation` to select commands. This skill defines behavior, not a separate test or validation process.

Do not copy another library's state semantics, API, React hooks or architectural layers as Aksel's contract. Follow Aksel's existing component and compatibility instructions.
