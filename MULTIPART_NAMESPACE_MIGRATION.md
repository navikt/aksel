# Multipart Namespace Components Migration

This document describes the new multipart namespace components pattern implemented in Aksel design system to address React Server Components (RSC) serialization issues and improve tree-shaking capabilities.

## Background

The previous component architecture used the `Object.assign` pattern for compound components:

```tsx
// Old pattern - causes RSC and tree-shaking issues
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;
Accordion.Item = AccordionItem;
```

This approach has several downsides:
- **Serialization Issues**: Not compatible with React Server Components (RSC)
- **Tree-shaking Problems**: All parts get included in the bundle even when unused
- **Runtime Evaluations**: Dynamic property assignment makes static analysis difficult

## Solution: Multipart Namespace Pattern

The new pattern follows the approach described in [Ivica Batinić's blog post](https://ivicabatinic.from.hr/posts/multipart-namespace-components-addressing-rsc-and-dot-notation-issues) and used by modern libraries like Chakra UI v3 and Radix UI.

### Key Features

1. **Named Exports**: Each component part is exported individually for better tree-shaking
2. **Namespace Module**: Re-exports components with shorter aliases  
3. **Static Analysis**: Everything is statically analyzable, no runtime evaluations
4. **Backward Compatibility**: Existing APIs continue to work unchanged

## Migration Guide

### Before (Old Pattern)
```tsx
import { Accordion } from '@navikt/ds-react';

<Accordion>
  <Accordion.Item>
    <Accordion.Header>Section 1</Accordion.Header>
    <Accordion.Content>Content 1</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

### After (New Pattern - Better Tree-shaking)
```tsx
import { Accordion } from '@navikt/ds-react';

<Accordion.Root>
  <Accordion.Item>
    <Accordion.Header>Section 1</Accordion.Header>
    <Accordion.Content>Content 1</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Alternative (Individual Imports - Best Tree-shaking)
```tsx
import { AccordionRoot, AccordionHeader, AccordionContent, AccordionItem } from '@navikt/ds-react';

<AccordionRoot>
  <AccordionItem>
    <AccordionHeader>Section 1</AccordionHeader>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
</AccordionRoot>
```

## Automated Migration

Use the provided codemod to automatically migrate your code:

```bash
# Migrate a single file
node scripts/codemod-multipart-namespace.js src/components/Example.tsx

# The codemod will:
# 1. Transform <Accordion> to <Accordion.Root>
# 2. Add individual named exports to imports for better tree-shaking
# 3. Preserve existing functionality
```

## Updated Components

The following components now support the multipart namespace pattern:

### ✅ Implemented
- **Button** - `<Button.Root>`
- **Accordion** - `<Accordion.Root>`, plus Header, Content, Item
- **Table** - `<Table.Root>`, plus Header, Body, Row, HeaderCell, DataCell, etc.
- **Modal** - `<Modal.Root>`, plus Header, Body, Footer
- **List** - `<List.Root>`, plus Item
- **Pagination** - `<Pagination.Root>`, plus Item

### 🚧 To Be Implemented
- FormSummary
- ToggleGroup  
- Floating/Menu components
- ActionMenu
- Collapsible
- Popover
- VirtualFocus
- ExpansionCard

## Benefits

### Better Tree-shaking
```tsx
// Only AccordionRoot and AccordionHeader are bundled
import { AccordionRoot, AccordionHeader } from '@navikt/ds-react';
```

### RSC Compatible
All exports are statically analyzable and work with React Server Components.

### No Breaking Changes
Existing code continues to work without modification.

### Future-proof
Follows modern React patterns used by leading component libraries.

## TypeScript Support

The pattern includes full TypeScript support:

```tsx
import { AccordionRoot, type AccordionRootProps } from '@navikt/ds-react';

const MyComponent = (props: AccordionRootProps) => {
  return <AccordionRoot {...props} />;
};
```

## Implementation Details

Each updated component:

1. **Maintains Object.assign pattern** for backward compatibility
2. **Adds `.Root` property** for new namespace usage  
3. **Exports individual named components** for tree-shaking
4. **Preserves all existing functionality**

Example implementation:
```tsx
// Add Root to interface
interface AccordionComponent extends React.ForwardRefExoticComponent<...> {
  Root: React.ForwardRefExoticComponent<...>;
  Header: React.ForwardRefExoticComponent<...>;
  // ... other parts
}

// Assign Root property
Accordion.Root = Accordion;
Accordion.Header = AccordionHeader;
// ... other assignments

// Export individual components
export { 
  Accordion, 
  AccordionRoot,  // Same as Accordion
  AccordionHeader,
  AccordionContent,
  AccordionItem 
} from './accordion';
```