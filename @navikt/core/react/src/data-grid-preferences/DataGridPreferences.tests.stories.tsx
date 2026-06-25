import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { DataGridPreferences } from ".";
import { DataGrid } from "../data-grid";
import { Provider } from "../provider";
import { Tag } from "../tag";

const meta: Meta<typeof DataGridPreferences> = {
  title: "ds-react/DataGrid/Preferences/tests",
  component: DataGridPreferences,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataGridPreferences>;

/**
 * Saving emits only the changed settings (diff) through `onSettingsChange`,
 * and the dialog closes afterwards.
 */
export const TestSaveAppliesChanges: Story = {
  render: () => <PreferencesDemo />,
  play: async ({ canvasElement }) => {
    settingsSpy.mockClear();
    const canvas = within(canvasElement);
    const dialog = await openPreferences(canvas);

    await userEvent.click(
      dialog.getByRole("checkbox", { name: "Zebra-striper" }),
    );
    await userEvent.selectOptions(
      dialog.getByLabelText("Tekststørrelse"),
      "small",
    );

    await userEvent.click(dialog.getByRole("button", { name: "Lagre" }));

    expect(settingsSpy).toHaveBeenCalledTimes(1);
    expect(settingsSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({ zebraStripes: true, textSize: "small" }),
    );
    await waitFor(() =>
      expect(canvas.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  },
};

/**
 * Cancelling discards the draft: no callback fires, and reopening resets the
 * controls to the saved table settings.
 */
export const TestCancelDiscardsChanges: Story = {
  render: () => <PreferencesDemo />,
  play: async ({ canvasElement }) => {
    settingsSpy.mockClear();
    const canvas = within(canvasElement);

    const dialog = await openPreferences(canvas);
    await userEvent.click(
      dialog.getByRole("checkbox", { name: "Zebra-striper" }),
    );
    await userEvent.click(dialog.getByRole("button", { name: "Avbryt" }));

    expect(settingsSpy).not.toHaveBeenCalled();
    await waitFor(() =>
      expect(canvas.queryByRole("dialog")).not.toBeInTheDocument(),
    );

    /* Draft should be reset on reopen */
    const reopened = await openPreferences(canvas);
    expect(
      reopened.getByRole("checkbox", { name: "Zebra-striper" }),
    ).not.toBeChecked();
  },
};

/** Saving without any changes should not invoke `onSettingsChange`. */
export const TestNoChangeNoCallback: Story = {
  render: () => <PreferencesDemo />,
  play: async ({ canvasElement }) => {
    settingsSpy.mockClear();
    const canvas = within(canvasElement);

    const dialog = await openPreferences(canvas);
    await userEvent.click(dialog.getByRole("button", { name: "Lagre" }));

    expect(settingsSpy).not.toHaveBeenCalled();
  },
};

/** The controls reflect the resolved default settings when first opened. */
export const TestDefaultsReflected: Story = {
  render: () => <PreferencesDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dialog = await openPreferences(canvas);

    /* columnDividers + truncateContent default to true, zebraStripes to false */
    expect(
      dialog.getByRole("checkbox", { name: "Kolonnestrek" }),
    ).toBeChecked();
    expect(
      dialog.getByRole("checkbox", { name: "Kutt innhold" }),
    ).toBeChecked();
    expect(
      dialog.getByRole("checkbox", { name: "Zebra-striper" }),
    ).not.toBeChecked();
    expect(dialog.getByText("Velg alle (5/5)")).toBeInTheDocument();
  },
};

/** Toggling a column updates the visible count and emits `columnDisplay`. */
export const TestColumnVisibility: Story = {
  render: () => <PreferencesDemo />,
  play: async ({ canvasElement }) => {
    settingsSpy.mockClear();
    const canvas = within(canvasElement);
    const dialog = await openPreferences(canvas);

    expect(dialog.getByText("Velg alle (5/5)")).toBeInTheDocument();

    await userEvent.click(dialog.getByLabelText("Foo"));
    expect(dialog.getByText("Velg alle (4/5)")).toBeInTheDocument();

    await userEvent.click(dialog.getByRole("button", { name: "Lagre" }));

    expect(settingsSpy).toHaveBeenCalledTimes(1);
    expect(settingsSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        columnDisplay: expect.arrayContaining([
          expect.objectContaining({ id: "foo", visible: false }),
        ]),
      }),
    );
  },
};

type UserDataTest = {
  id: number;
  foo: string;
  bar: string;
  on: boolean;
  time: Date;
};

const userColumnDef: DataGrid.Columns<UserDataTest> = [
  {
    id: "id",
    header: "Id",
    bodyCell: ({ id }) => id,
    align: "right",
    width: { defaultValue: "100px" },
  },
  {
    id: "foo",
    header: "Foo",
    bodyCell: ({ foo }) => foo,
  },
  {
    id: "bar",
    header: "Bar",
    bodyCell: ({ bar }) => (
      <Tag variant="strong" size="xsmall">
        {bar}
      </Tag>
    ),
  },
  {
    id: "on",
    header: "Boolean demo",
    bodyCell: ({ on }) => (on ? "Yes" : "No"),
  },
  {
    id: "time",
    header: "Time",
    bodyCell: ({ time }) => time.toISOString(),
  },
];

function generateUserData(
  count: number,
  countFrom: number = 0,
): UserDataTest[] {
  const num = (index: number) => (countFrom ? index + countFrom : index + 1);

  return Array.from({ length: count }, (_, i) => ({
    id: num(i) + 1,
    foo: `foo${num(i) + 1}`,
    bar: `bar${num(i) + 1}`,
    on: num(i) % 2 === 0,
    time: new Date(),
  }));
}

const settingsSpy = fn();

/**
 * Renders the preferences inside a `Provider` whose portal target lives within
 * the story canvas, so the dialog content is queryable via `within(canvasElement)`.
 */
function PreferencesDemo() {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  return (
    <Provider rootElement={container ?? undefined}>
      <DataGrid
        columns={userColumnDef}
        data={generateUserData(5)}
        onSettingsChange={settingsSpy}
      >
        <DataGridPreferences aria-label="Innstillinger" />
        <DataGrid.Table />
      </DataGrid>
      <div ref={setContainer} />
    </Provider>
  );
}

async function openPreferences(canvas: ReturnType<typeof within>) {
  await userEvent.click(canvas.getByRole("button", { name: "Innstillinger" }));
  return within(canvas.getByRole("dialog"));
}
