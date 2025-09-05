import { getLineTerminator } from "../../utils/lineterminator";

/**
 * Transform components to use multipart namespace pattern
 * 
 * Transforms:
 *   <Accordion>content</Accordion> → <Accordion.Root>content</Accordion.Root>
 *   <Table>content</Table> → <Table.Root>content</Table.Root>
 * etc.
 * 
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Components that need Root wrapper transformation
  const COMPONENTS_NEEDING_ROOT = [
    'Accordion',
    'Table', 
    'Modal',
    'List',
    'Pagination',
    'Button', // only when used in compound pattern
    'FormSummary',
    'ToggleGroup',
    'ActionMenu',
    'Collapsible',
    'Popover',
    'VirtualFocus',
    'ExpansionCard'
  ];

  // Components with compound parts
  const COMPOUND_COMPONENTS = {
    'Accordion': ['Header', 'Content', 'Item'],
    'Table': ['Header', 'Body', 'Row', 'HeaderCell', 'DataCell', 'ColumnHeader', 'ExpandableRow'],
    'Modal': ['Header', 'Body', 'Footer'],
    'List': ['Item'],
    'Pagination': ['Item'],
    'Button': [], // Special case: Button only has Root
    'FormSummary': ['Heading', 'Answers', 'Answer'],
    'ToggleGroup': ['Item'],
    'ActionMenu': ['Trigger', 'Content', 'Item', 'Group'],
    'Collapsible': ['Trigger', 'Content'],
    'Popover': ['Trigger', 'Content'],
    'VirtualFocus': [],
    'ExpansionCard': ['Header', 'Content']
  };

  let hasChanges = false;
  const localNames = {};

  // Find local names for imported components
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === "@navikt/ds-react")
    .forEach((imp) => {
      imp.value.specifiers.forEach((spec) => {
        if (spec.type === 'ImportSpecifier') {
          const importedName = spec.imported.name;
          const localName = spec.local.name;
          
          if (COMPONENTS_NEEDING_ROOT.includes(importedName)) {
            localNames[importedName] = localName;
          }
        }
      });
    });

  // Transform components that need Root wrapper
  Object.keys(localNames).forEach(componentName => {
    const localName = localNames[componentName];
    const parts = COMPOUND_COMPONENTS[componentName] || [];
    
    // Only transform if the component has compound parts or is being used in compound pattern
    let shouldTransform = false;
    
    // Check if this component has compound usage in the file
    if (parts.length > 0) {
      shouldTransform = parts.some(part => {
        const memberExpression = root.find(j.JSXElement, {
          openingElement: {
            name: {
              type: "JSXMemberExpression",
              object: { name: localName },
              property: { name: part }
            }
          }
        });
        return memberExpression.length > 0;
      });
    } else {
      // For components like Button, only transform if explicitly requested
      shouldTransform = false;
    }
    
    if (shouldTransform) {
      console.log(`Transforming ${componentName} (${localName}) to use Root pattern`);
      
      // Transform opening tags
      root
        .find(j.JSXElement, {
          openingElement: {
            name: { name: localName }
          }
        })
        .forEach((path) => {
          // Only transform non-self-closing elements that contain compound children
          const hasCompoundChildren = j(path).find(j.JSXElement, {
            openingElement: {
              name: {
                type: "JSXMemberExpression",
                object: { name: localName }
              }
            }
          }).length > 0;
          
          if (hasCompoundChildren) {
            // Transform opening tag
            path.node.openingElement.name = j.jsxMemberExpression(
              j.jsxIdentifier(localName),
              j.jsxIdentifier("Root")
            );
            
            // Transform closing tag if it exists
            if (path.node.closingElement) {
              path.node.closingElement.name = j.jsxMemberExpression(
                j.jsxIdentifier(localName),
                j.jsxIdentifier("Root")
              );
            }
            
            hasChanges = true;
          }
        });
      
      // Transform self-closing tags only if they have compound attributes/children pattern
      root
        .find(j.JSXElement, {
          openingElement: {
            name: { name: localName },
            selfClosing: true
          }
        })
        .forEach((path) => {
          // For self-closing tags, we generally don't need to transform to Root
          // unless there's a specific pattern we need to handle
        });
    }
  });

  // Update import declarations to include individual named exports
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === "@navikt/ds-react")
    .forEach((imp) => {
      const specifiers = imp.value.specifiers;
      const newSpecifiers = [...specifiers];
      let importChanged = false;

      specifiers.forEach((spec) => {
        if (spec.type === 'ImportSpecifier') {
          const importedName = spec.imported.name;
          const parts = COMPOUND_COMPONENTS[importedName];
          
          if (parts && parts.length > 0) {
            // Add individual named exports for better tree-shaking
            parts.forEach(part => {
              const namedExport = `${importedName}${part}`;
              const existingSpec = newSpecifiers.find(s => 
                s.type === 'ImportSpecifier' && s.imported.name === namedExport
              );
              
              if (!existingSpec) {
                newSpecifiers.push(
                  j.importSpecifier(j.identifier(namedExport))
                );
                importChanged = true;
              }
            });
            
            // Add Root export
            const rootExport = `${importedName}Root`;
            const existingRootSpec = newSpecifiers.find(s => 
              s.type === 'ImportSpecifier' && s.imported.name === rootExport
            );
            
            if (!existingRootSpec) {
              newSpecifiers.push(
                j.importSpecifier(j.identifier(rootExport))
              );
              importChanged = true;
            }
          }
        }
      });

      if (importChanged) {
        imp.value.specifiers = newSpecifiers;
        hasChanges = true;
      }
    });

  return hasChanges ? root.toSource(getLineTerminator(file.source)) : null;
}