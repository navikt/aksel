import { getKey } from "@/sb-util";
import type { Meta, StoryObj } from "@storybook/react";
import CodeExample from "./Examples";

const meta = {
  title: "Sanity-modules/CodeExample",
  component: CodeExample,
  tags: ["autodocs"],
} satisfies Meta<typeof CodeExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Designsystem: Story = {
  args: {
    node: {
      title: "button",
      dir: {
        title: "button",
        filer: [
          {
            _key: getKey(),
            description: null,
            innhold:
              'import { Button } from "@navikt/ds-react";\n\nconst Example = () => {\n  return (\n    <div className="flex flex-wrap gap-2">\n      <Button variant="primary">Primary</Button>\n      <Button variant="secondary">Secondary</Button>\n      <Button variant="tertiary">Tertiary</Button>\n      <Button variant="danger">Danger</Button>\n    </div>\n  );\n};',
            navn: "default",
          },
          {
            _key: getKey(),
            description: "Testdescription",
            innhold:
              'import { Button } from "@navikt/ds-react";\n\nconst Example = () => {\n  return (\n    <div className="flex flex-wrap gap-2">\n      <Button variant="primary-neutral">Primary</Button>\n      <Button variant="secondary-neutral">Secondary</Button>\n      <Button variant="tertiary-neutral">Tertiary</Button>\n    </div>\n  );\n};',
            navn: "neutral",
          },
          {
            _key: getKey(),
            description: null,
            innhold:
              'import { PencilIcon } from "@navikt/aksel-icons";\nimport { Button } from "@navikt/ds-react";\n\nconst Example = () => {\n  return (\n    <div className="flex flex-wrap gap-2">\n      <Button size="small" variant="primary" icon={<PencilIcon aria-hidden />}>\n        Primary\n      </Button>\n      <Button size="small" variant="secondary">\n        Secondary\n      </Button>\n      <Button size="small" variant="tertiary">\n        Tertiary\n      </Button>\n      <Button size="small" variant="danger">\n        Danger\n      </Button>\n    </div>\n  );\n};',
            navn: "small",
          },
        ],
      },
    },
  },
};
