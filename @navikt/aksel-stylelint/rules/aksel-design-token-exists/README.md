# Aksel-design-token-exists

## Examples

This rule checks that if you use one of the reserved token prefixes `--a-` or `--ac-` then the token itself _must_ be provided by design system itself.

### Incorrect
```javascript
html h1 {
    --a-my-own-color-bg-hover: #f2f2f2;
    ^^^^^^^^^^^^^^^^^^^^^^^^^
    background-color: var(--a-my-own-color-bg-hover, #ffffff);
                          ^^^^^^^^^^^^^^^^^^^^^^^^^
}
```

### Correct
```javascript
html h1 {
    background-color: var(--ac-accordion-header-bg-hover, #ffffff);
}
```
