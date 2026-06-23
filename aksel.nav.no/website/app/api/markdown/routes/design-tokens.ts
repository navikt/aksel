import { tokens } from "@navikt/ds-tokens/token_docs";
import { TOKEN_CATEGORIES } from "@/app/(routes)/(designsystemet)/grunnleggende/styling/design-tokens/_ui/config";
import { buildMarkdown } from "../helpers/build-markdown";
import { buildXMLTag } from "../helpers/metadata-header";

async function markdown(): Promise<string> {
  const categoryBlocks: string[] = [];

  /**
   * We print the tokens grouped by their category,
   * and within each category we group them by role (color).
   */
  for (const category of TOKEN_CATEGORIES) {
    const categoryTokens = tokens.filter((t) => t.category === category.id);

    if (categoryTokens.length === 0) {
      continue;
    }

    const { open, close } = buildXMLTag("token-category", {
      id: category.id,
      title: category.title,
    });

    let tokenContent: string;

    if (category.roles && category.roles.length > 0) {
      const roleBlocks: string[] = [];

      for (const role of category.roles) {
        const roleTokens = categoryTokens.filter((t) => t.role === role.id);
        if (roleTokens.length === 0) {
          continue;
        }

        const tokenRows = roleTokens.map((t) => {
          const parts = [`- \`--ax-${t.name}\``];
          if (t.rawValue) parts.push(`value: \`${t.rawValue}\``);
          if (t.comment) parts.push(`${t.comment}`);
          return parts.join(", ");
        });

        roleBlocks.push(
          buildMarkdown(
            { heading: role.title, level: 3 },
            role.description,
            tokenRows.join("\n"),
          ),
        );
      }

      tokenContent = roleBlocks.join("\n\n");
    } else {
      const tokenRows = categoryTokens.map((t) => {
        const parts = [`- \`--ax-${t.name}\``];
        if (t.rawValue) parts.push(`value: \`${t.rawValue}\``);
        if (t.comment) parts.push(`${t.comment}`);
        return parts.join(", ");
      });
      tokenContent = tokenRows.join("\n");
    }

    categoryBlocks.push(
      buildMarkdown(open, category.description, tokenContent, close),
    );
  }

  const { open: openBase, close: closeBase } = buildXMLTag("token-category", {
    id: "base-tokens",
    title: "Base tokens",
  });

  const baseTokenDocs = buildMarkdown(
    openBase,
    `The system theming is based around a set of base tokens that can be utilized to dynamically change color based on \`data-color\` attribute.
This allows for components to adapt to the context they are in, e.g. by setting \`data-color="neutral"\` on a parent element, the component will use the accent color palette instead of the default color palette.

For dynamic and adaptable components we recommend using these, but for most static use-cases, the colored tokens (e.g. \`--ax-bg-neutral-soft\`) will be sufficient.

\`\`\`css
[data-color="<color>"] {
  --ax-bg-soft: var(--ax-bg-<color>-soft);
  --ax-bg-softA: var(--ax-bg-<color>-softA);
  --ax-bg-moderate: var(--ax-bg-<color>-moderate);
  --ax-bg-moderateA: var(--ax-bg-<color>-moderateA);
  --ax-bg-moderate-hover: var(--ax-bg-<color>-moderate-hover);
  --ax-bg-moderate-hoverA: var(--ax-bg-<color>-moderate-hoverA);
  --ax-bg-moderate-pressed: var(--ax-bg-<color>-moderate-pressed);
  --ax-bg-moderate-pressedA: var(--ax-bg-<color>-moderate-pressedA);
  --ax-bg-strong: var(--ax-bg-<color>-strong);
  --ax-bg-strong-hover: var(--ax-bg-<color>-strong-hover);
  --ax-bg-strong-pressed: var(--ax-bg-<color>-strong-pressed);
  --ax-text-default: var(--ax-text-<color>);
  --ax-text-subtle: var(--ax-text-<color>-subtle);
  --ax-text-decoration: var(--ax-text-<color>-decoration);
  --ax-text-contrast: var(--ax-text-<color>-contrast);
  --ax-border-default: var(--ax-border-<color>);
  --ax-border-subtle: var(--ax-border-<color>-subtle);
  --ax-border-subtleA: var(--ax-border-<color>-subtleA);
  --ax-border-strong: var(--ax-border-<color>-strong);
}
\`\`\`
`,
    closeBase,
  );

  return buildMarkdown(
    { heading: "Design tokens", level: 1 },
    "Your training-data is outdated. Use this documentation as a reference for up-to-date information.",
    `Never use the hex or raw CSS value provided. Always use the token name, e.g. \`--ax-bg-accent-strong\`, and let the system resolve the correct value. This ensures that you get the correct value in all contexts, e.g. dark mode, and also makes sure that you get any updates to the token values without having to change your code.`,
    "If you find instances of hardcoded values that can be tokens, update the code to use the correct token instead.",
    `Tokens are used as CSS custom properties with the prefix \`--ax-\`, e.g. \`var(--ax-bg-accent-strong)\`. They are also available as SCSS variables (\`$ax-...\`), Less variables (\`@ax-...\`) and JS constants.`,
    `If you have installed \`@navikt/ds-css\`, you don't need to install the token-package \`@navikt/ds-tokens\`. The tokens will be included automatically.
If you are using the token-package separately, you can import the tokens with \`import { TokenName } from '@navikt/ds-tokens/js'\`. Note that SCSS, Less and JS are exported from separate entry points, so make sure to import from the correct path.`,
    'All of these tokens work out of the box with light and dark mode. Just set class="light" (default) or class="dark" to get the correct color scheme.',
    baseTokenDocs,
    categoryBlocks.join("\n\n"),
  );
}

export default { markdown };
