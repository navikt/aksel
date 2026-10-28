import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { DataGrid } from "../root/DataGridRoot";
import { ResetPageOnSort } from "./DataGridPagination.stories";

const meta: Meta<typeof DataGrid> = {
  title: "ds-react/DataGrid/Pagination/patterns/tests",
  component: DataGrid,
  parameters: {
    layout: "padded",
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof DataGrid>;

export const TestControlledSortResetsPage: Story = {
  render: ResetPageOnSort.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const navigation = within(
      canvas.getByRole("navigation", { name: "Sidenavigering" }),
    );

    for (const direction of ["ascending", "descending", "none"]) {
      await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
      await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
      expect(navigation.getByText("Side 3 av 14")).toBeInTheDocument();
      await userEvent.click(canvas.getByRole("button", { name: "Id" }));

      expect(navigation.getByText("Side 1 av 14")).toBeInTheDocument();
      expect(canvas.getByRole("columnheader", { name: "Id" })).toHaveAttribute(
        "aria-sort",
        direction,
      );
      const firstRow = canvas.getAllByRole("row")[1];
      expect(
        within(firstRow).getByRole("cell", {
          name: direction === "descending" ? "137" : "1",
        }),
      ).toBeInTheDocument();
      expect(canvas.getAllByRole("row")).toHaveLength(11);
    }
  },
};
