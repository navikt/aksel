import React from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import Table from "../../Table";

export default {
  title: "ds-react/Table/Tests",
  component: Table,
  parameters: {
    chromatic: { disable: true },
  },
};

export const ClickableRowTest = {
  render: ({ onOpenChange }) => {
    return (
      <>
        <Table zebraStripes>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell aria-hidden />
              <Table.HeaderCell aria-hidden />
              <Table.HeaderCell aria-hidden />
              <Table.HeaderCell aria-hidden />
              <Table.HeaderCell aria-hidden />
              <Table.HeaderCell aria-hidden />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.ExpandableRow
              content={<div>placeholder row 2</div>}
              togglePlacement="right"
              data-testid="row1"
              expandOnRowClick
              onOpenChange={onOpenChange}
            >
              <Table.DataCell>
                <div data-testid="cell1">Should be clickable</div>
              </Table.DataCell>
              <Table.DataCell data-testid="cell2">
                Should also be clickable
              </Table.DataCell>

              <Table.DataCell>
                <button data-testid="cell3">Should not be clickable</button>
              </Table.DataCell>
              <Table.DataCell>
                <div>
                  <div>
                    <button data-testid="cell4">
                      Nested should not be clickable
                    </button>
                  </div>
                </div>
              </Table.DataCell>
              <Table.DataCell>
                <div>
                  <div>
                    <button data-testid="cell4">
                      <span>2x nested should not be clickable</span>
                    </button>
                  </div>
                </div>
              </Table.DataCell>
            </Table.ExpandableRow>
          </Table.Body>
        </Table>
      </>
    );
  },
  args: {
    onOpenChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    args.onOpenChange.mockClear();
    const canvas = within(canvasElement);

    const cell1 = canvas.getByText("Should be clickable");
    const cell2 = canvas.getByText("Should also be clickable");
    const cell3 = canvas.getByText("Should not be clickable");
    const cell4 = canvas.getByText("Nested should not be clickable");
    const cell5 = canvas.getByText("2x nested should not be clickable");

    await userEvent.click(cell1);
    expect(args.onOpenChange.mock.calls).toHaveLength(1);
    await userEvent.click(cell1);
    expect(args.onOpenChange.mock.calls).toHaveLength(2);

    await userEvent.click(cell2);
    expect(args.onOpenChange.mock.calls).toHaveLength(3);
    await userEvent.click(cell2);
    expect(args.onOpenChange.mock.calls).toHaveLength(4);

    await userEvent.click(cell3);
    expect(args.onOpenChange.mock.calls).toHaveLength(4);

    await userEvent.click(cell4);
    expect(args.onOpenChange.mock.calls).toHaveLength(4);

    await userEvent.click(cell5);
    expect(args.onOpenChange.mock.calls).toHaveLength(4);
  },
};
