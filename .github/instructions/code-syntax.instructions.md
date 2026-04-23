description: "Use for JS/TS code in this repo."
applyTo: "**/\*.tsx", "**/_.jsx", "\*\*/_.ts", "\*_/_.js"

---

# JS/TS instructions

- Prefer `for...of` over `Array.forEach`.
- Prefer named exports; keep type exports separate from value exports.
- Group exports at the bottom: values first, then types.
- In `*.stories.*`, keep the default export at the top.
