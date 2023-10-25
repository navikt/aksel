import type { Meta, StoryObj } from "@storybook/react";
import TOC from "./TOCv2";

const meta = {
  title: "Website-modules/TOCv2",
  component: TOC,
  tags: ["autodocs"],
} satisfies Meta<typeof TOC>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Designsystemet: Story = {
  render: () => {
    return (
      <div className="flex justify-between">
        <main className="grid gap-32 last-of-type:mb-[90vh]">
          <h2 id="X1">Heading X1</h2>
          <h3 id="X2">Heading X2</h3>
          <h3 id="X3">Heading X3</h3>
          <h3 id="X4">Heading X4</h3>
          <h2 id="Y1">Heading Y1</h2>
          <h3 id="Y2">Heading Y2</h3>
          <h3 id="Y3">Heading Y3</h3>
          <h3 id="Y4">Heading Y4</h3>
          <h2 id="Z1">Heading Z1</h2>
          <h3 id="Z2">Heading Z2</h3>
          <h3 id="Z3">Heading Z3</h3>
          <h3 id="Z4">Heading Z4</h3>
        </main>
        <TOC />
      </div>
    );
  },
};
