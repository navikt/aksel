import type { Meta, StoryObj } from "@storybook/react";
import Snippet from "./Snippet";

const meta = {
  title: "Sanity-modules/CodeSnippet",
  component: Snippet,
  tags: ["autodocs"],
} satisfies Meta<typeof Snippet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const JSX: Story = {
  args: {
    node: {
      code: {
        code: 'import { Button } from "@navikt/ds-react";\n\nconst Example = () => {\n  return (\n    <div className="flex flex-wrap gap-2">\n      <Button variant="primary">Primary</Button>\n      <Button variant="secondary">Secondary</Button>\n      <Button variant="tertiary">Tertiary</Button>\n      <Button variant="danger">Danger</Button>\n    </div>\n  );\n};',
        language: "jsx",
      },
    },
  },
};

export const Bash: Story = {
  args: {
    node: {
      code: {
        code: "yarn install @navikt/ds-react @navikt/ds-css\nnpm add @navikt/ds-react @navikt/ds-css",
        language: "bash",
      },
    },
  },
};

export const Terminal: Story = {
  args: {
    node: {
      code: {
        code: "npx cowsay moo",
        language: "terminal",
      },
    },
  },
};

export const JS: Story = {
  args: {
    node: {
      code: {
        code: "const numbers = [1, 2, 3, 4];\n\nnumbers.map(x => console.log(x))",
        language: "js",
      },
    },
  },
};

export const HTML: Story = {
  args: {
    node: {
      code: {
        code: "<button>Click me!</button>",
        language: "jsx",
      },
    },
  },
};
