description: "Use for ds-react components and component CSS."
applyTo: "@navikt/core/react/src/**", "@navikt/core/css/src/**"

---

# ds-react and component instructions

- Read the full component folder before editing.
- Preserve the surrounding `forwardRef`, `className`, `...rest`, and `as`/`OverridableComponent` patterns.
- Keep `@navikt/*` code React 17 API compatible.
- Use tokens, not hardcoded component values.
- If behavior or visuals change, update the nearest story and test.
- If a public component changes, keep component exports, package exports, and root exports in sync.
