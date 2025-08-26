# Aksel - GitHub Copilot Instructions

## General Code Guidelines Copilot Instructions

- Always verify information before presenting it. Do not make assumptions or speculate without clear evidence.
- Make changes file by file and allow for review of mistakes.
- Never use apologies or give feedback about understanding in comments or documentation.
- Don't suggest whitespace changes or summarize changes made.
- Only implement changes explicitly requested; do not invent changes.
- Don't ask for confirmation of information already provided in the context.
- Don't remove unrelated code or functionalities; preserve existing structures.
- Provide all edits in a single chunk per file, not in multiple steps.
- Don't ask the user to verify implementations visible in the provided context.
- Don't suggest updates or changes to files when there are no actual modifications needed.
- Always provide links to real files, not context-generated files.
- Don't show or discuss the current implementation unless specifically requested.
- Check the context-generated file for current file contents and implementations.
- Prefer descriptive, explicit variable names for readability.
- Adhere to the existing coding style in the project.
- Prioritize code performance and security in suggestions.
- Suggest or include unit tests for new or modified code.
- Implement robust error handling and logging where necessary.
- Make sure logging does not expose sensitive information.
- Make sure logging follows current workspace conventions.
- Encourage modular design for maintainability and reusability.
- Ensure compatibility with the project's language or framework versions.
- Replace hardcoded values with named constants.

### Code Writing Standards

- Follow established code-writing standards for your language (spacing, comments, naming).
- Extend standards with internal rules for folder and function naming if needed.

### Comment Usage

- Use comments sparingly and only when meaningful.
- Avoid commenting on obvious code; focus on explaining "why" and potential pitfalls.

### Conditional Encapsulation

- Encapsulate nested if/else logic into functions with descriptive names for clarity.

### DRY Principle

- Avoid code duplication; reuse code via functions, classes, modules, or libraries.
- Modify code in one place when updating logic.

### Function Length & Responsibility

- Write short, focused functions (single responsibility principle).
- Break up long or complex functions into smaller ones.

### General Code Style & Readability

- Write code that is readable, understandable, and maintainable.
- Prioritize clarity and adhere to coding standards.
- Regularly review and refactor code for structure and maintainability.

### Naming Conventions

- Use meaningful, descriptive names for variables, functions, and classes.
- Names should reflect purpose, behavior, and usage.
- Prefer specific names that reveal intent without needing comments.

## Repository Overview

Aksel is NAV's design system providing React components, CSS, design tokens, icons, and related tooling. The repository is a monorepo using Yarn workspaces that contains both the design system packages and the documentation website (aksel.nav.no).

**Key Info:**

- **Language**: TypeScript, CSS, React, Next.js
- **Package Manager**: Yarn v4 (yarn@4.4.0)
- **Build System**: TypeScript compiler, Style Dictionary for tokens
- **Testing**: Vitest + React Testing Library
- **Repo Size**: ~50MB (excluding node_modules)

## Prerequisites & Authentication

**Critical**: This repository requires GitHub Package Registry (GPR) access for some internal NAV packages. Set the `NPM_AUTH_TOKEN` environment variable with a Personal Access Token that has `read:packages` scope for the `navikt` organization.

**For non-NAV contributors**: Use this limited installation approach:

```bash
yarn workspaces focus @navikt/aksel-icons @navikt/ds-tokens @navikt/ds-css @navikt/ds-react @navikt/ds-tailwind @navikt/aksel @navikt/aksel-stylelint
```

## Repository Structure

```
@navikt/                    # Core packages
├── core/react              # @navikt/ds-react - React components
├── core/css               # @navikt/ds-css - CSS styles
├── core/tokens            # @navikt/ds-tokens - Design tokens
├── core/tailwind          # @navikt/ds-tailwind - Tailwind config
├── aksel-icons            # @navikt/aksel-icons - Icon package
├── aksel-stylelint        # @navikt/aksel-stylelint - Stylelint config
└── aksel                  # @navikt/aksel - CLI tools

aksel.nav.no/              # Documentation website
├── website                # Next.js documentation site
├── website/sanity         # Sanity CMS for content
└── playroom               # Component playground

examples/                  # Example applications
scripts/                   # Build and maintenance scripts
.github/workflows/         # CI/CD automation
```

## Build & Development Commands

**Setup (Required first steps):**

```bash
# Full installation (requires GPR access)
yarn && yarn boot

# Limited installation (for non-NAV contributors)
yarn workspaces focus @navikt/aksel-icons @navikt/ds-tokens @navikt/ds-css @navikt/ds-react @navikt/ds-tailwind @navikt/aksel @navikt/aksel-stylelint
yarn boot
```

**Essential Commands:**

```bash
yarn boot                   # Build all packages (topological order)
yarn storybook             # Start Storybook dev server (port 6006)
yarn dev                   # Start documentation website (port 3000)
yarn test                  # Run all tests
yarn clean                 # Remove generated files
yarn changeset             # Create new version entry for releases
```

**Warning**: `yarn lint` requires full installation with GPR access due to Next.js dependencies.

## Validation & CI Process

**Pre-commit hooks** (via Husky):

- `yarn lint-staged` - Runs prettier, ESLint, stylelint on changed files
- `yarn tsx ./scripts/in-sync-versions.ts` - Validates version synchronization

**CI Pipeline** (.github/workflows/ci.yml):

1. **Lint**: ESLint + Stylelint validation
2. **Test**: Unit tests with Vitest
3. **Validate Examples**: Component example validation
4. **Chromatic**: Visual regression testing (on specific triggers)

**Important**: Build failures often occur due to:

- Missing GPR authentication (NPM_AUTH_TOKEN)
- Peer dependency warnings (safe to ignore)
- TypeScript compilation issues in workspace dependencies

## Testing Architecture

**Test Configuration:**

- **Framework**: Vitest with jsdom environment
- **Setup**: `@navikt/core/react/tests/vitest.config.ts`
- **Location Pattern**: `**/__tests__/**` and `**/*.test.*`
- **Globals**: Enabled for testing-library features

**Test Types:**

- Unit tests for components (React Testing Library)
- Icon validation tests (8375+ tests)
- Documentation example validation
- Visual regression tests (Chromatic)

## Linting & Code Quality

**ESLint Config** (`eslint.config.js`):

- TypeScript ESLint with React/JSX rules
- Next.js specific rules for website
- Storybook rules for stories
- Custom `eslint-plugin-aksel-local` rules

**Stylelint Config** (in package.json):

- Custom `@navikt/aksel-stylelint` rules
- Design token validation
- CSS custom property validation

**Biome Config** (`biome.json`):

- Additional formatting and linting
- Disabled rules for backwards compatibility

## Package Architecture

**Fixed Versioning**: These packages maintain synchronized versions:

- `@navikt/ds-react`, `@navikt/ds-css`, `@navikt/aksel-icons`, `@navikt/ds-tokens`, `@navikt/ds-tailwind`, `@navikt/ds-codemod`

**Key Files per Package:**

```
src/
├── index.ts               # Main exports
└── component/
    ├── index.ts           # Component exports
    ├── component.tsx      # Component implementation
    └── component.stories.tsx # Storybook stories
```

## Common Development Workflows

**Adding New Components:**

1. Create component in appropriate `@navikt/core/*` package
2. Add Storybook stories for development/testing
3. Export from package `index.ts`
4. Add tests following existing patterns
5. Run `yarn changeset` for version management

**Modifying Existing Components:**

1. Locate component in `@navikt/core/react/src/`
2. Make minimal changes maintaining backward compatibility
3. Update tests if behavior changes
4. Update stories if visual changes
5. Create changeset entry

**Troubleshooting Build Issues:**

1. Check GPR authentication if install fails
2. Run `yarn clean && yarn boot` for build issues
3. Ignore peer dependency warnings in yarn output
4. Use workspace focus command for limited access scenarios

## Key Configuration Files

- `package.json` - Root workspace configuration, scripts, lint-staged
- `eslint.config.js` - ESLint rules and overrides
- `biome.json` - Biome linting/formatting rules
- `.husky/pre-commit` - Git hook configuration
- `tsconfig.json` - TypeScript configuration
- `.changeset/README.md` - Versioning documentation

## Important Notes

1. **Trust these instructions** - They are comprehensive and tested. Only search for additional information if these instructions are incomplete or incorrect.

2. **Authentication Issues**: Many failures stem from missing GPR access. Use the workspace focus command for core development.

3. **Peer Dependencies**: Ignore peer dependency warnings during installation - they are expected due to workspace architecture.

4. **Visual Testing**: Chromatic runs automatically on PRs for visual regression detection.

5. **Component Changes**: Always add Storybook stories for new components and maintain existing story coverage.

6. **CSS Token Validation**: Stylelint enforces design token usage and prevents deprecated class usage.

7. **Git Workflow**: Push to `main` deploys to production, `next` branch deploys to staging (aksel.dev.nav.no).

## Next.js App Router Copilot Instructions

### Best Practices

- Use server components by default.
- Implement client components only when necessary.
- Utilize the new file-based routing system.
- Use `layout.js` for shared layouts.
- Implement `loading.js` for loading states.
- Use `error.js` for error handling.
- Utilize route handlers for API routes.

### Additional Guidelines

- Use TypeScript for type safety.
- Implement proper metadata for SEO.
- Use the Next.js Image component for optimized images.
- Use CSS Modules for styling.
- Implement proper error boundaries.
- Follow Next.js naming conventions for special files.
- Use environment variables for configuration.
