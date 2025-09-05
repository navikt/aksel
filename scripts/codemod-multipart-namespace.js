#!/usr/bin/env node

/**
 * Codemod to migrate from old compound component patterns to new multipart namespace pattern
 * 
 * This script transforms code from:
 *   <Accordion>
 *     <Accordion.Header>Title</Accordion.Header>
 *     <Accordion.Content>Content</Accordion.Content>
 *   </Accordion>
 * 
 * To:
 *   <Accordion.Root>
 *     <Accordion.Header>Title</Accordion.Header>
 *     <Accordion.Content>Content</Accordion.Content>
 *   </Accordion.Root>
 * 
 * Usage:
 *   node codemod.js <file-pattern>
 *   node codemod.js "src\/\*\*\/\*.tsx"
 */

const fs = require('fs');
const path = require('path');

// Components that need Root wrapper
const COMPONENTS_NEEDING_ROOT = [
  'Accordion',
  'Table', 
  'Modal',
  'List',
  'Pagination',
  'Button', // only if it has children in compound usage
];

// Components with compound parts
const COMPOUND_COMPONENTS = {
  'Accordion': ['Header', 'Content', 'Item'],
  'Table': ['Header', 'Body', 'Row', 'HeaderCell', 'DataCell', 'ColumnHeader', 'ExpandableRow'],
  'Modal': ['Header', 'Body', 'Footer'],
  'List': ['Item'],
  'Pagination': ['Item'],
  'Button': ['Root'], // Special case: Button only has Root
};

function transformFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let transformedContent = content;
  let hasChanges = false;

  // Transform each component
  for (const [component, parts] of Object.entries(COMPOUND_COMPONENTS)) {
    if (component === 'Button') continue; // Button is special case, skip for now
    
    // Check if this file contains compound usage
    const hasCompoundUsage = parts.some(part => 
      transformedContent.includes(`<${component}.${part}`)
    );
    
    if (hasCompoundUsage) {
      console.log(`Transforming ${component} in ${filePath}`);
      
      // Pattern: <Component> with compound usage (not self-closing)
      const openTagRegex = new RegExp(`<${component}(\\s[^>]*)?>`, 'g');
      const closeTagRegex = new RegExp(`</${component}>`, 'g');
      
      // Replace opening tag
      transformedContent = transformedContent.replace(openTagRegex, (match, attributes) => {
        hasChanges = true;
        const attrs = attributes || '';
        return `<${component}.Root${attrs}>`;
      });
      
      // Replace closing tag
      transformedContent = transformedContent.replace(closeTagRegex, () => {
        return `</${component}.Root>`;
      });
    }
  }

  // Handle import transformations - add individual named exports for better tree-shaking
  const importRegex = /import\s*{\s*([^}]+)\s*}\s*from\s*['"]@navikt\/ds-react['"]/g;
  transformedContent = transformedContent.replace(importRegex, (match, imports) => {
    let newImports = imports;
    let importChanged = false;
    
    for (const [component, parts] of Object.entries(COMPOUND_COMPONENTS)) {
      if (imports.includes(component)) {
        // Add individual named exports for better tree-shaking
        const individualImports = parts
          .map(part => `${component}${part}`)
          .filter(namedImport => !imports.includes(namedImport))
          .join(', ');
        
        if (individualImports) {
          newImports += `, ${individualImports}`;
          importChanged = true;
        }
      }
    }
    
    if (importChanged) {
      hasChanges = true;
      console.log(`Updated imports in ${filePath}`);
      return `import { ${newImports} } from '@navikt/ds-react'`;
    }
    
    return match;
  });

  if (hasChanges) {
    fs.writeFileSync(filePath, transformedContent);
    console.log(`✅ Transformed ${filePath}`);
  }
}

function main() {
  const filePath = process.argv[2];
  
  if (!filePath) {
    console.error('Usage: node codemod.js <file-path>');
    console.error('Example: node codemod.js src/components/Example.tsx');
    process.exit(1);
  }

  console.log(`🔍 Processing file: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  if (fs.statSync(filePath).isFile() && (filePath.endsWith('.tsx') || filePath.endsWith('.jsx'))) {
    transformFile(filePath);
  } else {
    console.log('File is not a .tsx or .jsx file');
  }
  
  console.log('🎉 Codemod completed!');
}

if (require.main === module) {
  main();
}

module.exports = { transformFile, COMPOUND_COMPONENTS };