import type { Meta, StoryObj } from "@storybook/react-vite";
// eslint-disable-next-line storybook/use-storybook-testing-library
import { act } from "@testing-library/react";
import React, { useState } from "react";
import { expect, fireEvent, userEvent, waitFor, within } from "storybook/test";
import { Dialog, DialogPopup } from "../../../dialog";
import { ActionMenu } from "../../../overlays/action-menu";
import { VStack } from "../../../primitives/stack";
import { Provider } from "../../../provider";
import { FocusBoundary, type FocusBoundaryProps } from "./FocusBoundary";

const meta: Meta<typeof FocusBoundary> = {
  title: "Utilities/FocusBoundary/Tests",
  component: FocusBoundary,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof BaseFocusBoundaryComponent>;

const Field_ONE = "Name";
const Field_TWO = "Email";
const BUTTON_THREE = "Submit";

export const Playground: Story = {
  render: BaseFocusBoundaryComponent,
  args: {
    loop: true,
    trapped: true,
    showByDefault: true,
    firstChild: <div />,
  },
};

export const Loop: Story = {
  render: BaseFocusBoundaryComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const first = canvas.getByLabelText(Field_ONE);
    const middle = canvas.getByLabelText(Field_TWO);
    const last = canvas.getByText(BUTTON_THREE);

    /* Regular focus */
    first.focus();
    await waitFor(() => expect(first).toHaveFocus());

    await userEvent.tab();
    expect(middle).toHaveFocus();

    /* Loop */
    await userEvent.tab();
    expect(last).toHaveFocus();
    await userEvent.tab();
    expect(first).toHaveFocus();

    /* Shift tab */
    first.focus();
    expect(first).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(last).toHaveFocus();
  },
  args: {
    loop: true,
  },
};

export const TrappedNoLoop: Story = {
  render: BaseFocusBoundaryComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const first = canvas.getByLabelText(Field_ONE);
    const middle = canvas.getByLabelText(Field_TWO);
    const last = canvas.getByText(BUTTON_THREE);

    /* Regular focus */
    await fireEvent.focus(first);
    await waitFor(() => expect(first).toHaveFocus());

    await userEvent.tab();
    expect(middle).toHaveFocus();

    /* Loop */
    await userEvent.tab();
    expect(last).toHaveFocus();
    /* Should be "stopped" on last element */
    await userEvent.tab();
    expect(last).toHaveFocus();

    /* Shift tab */
    first.focus();
    expect(first).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(first).toHaveFocus();
  },
  args: {
    trapped: true,
  },
};

export const Trapped: Story = {
  render: BaseFocusBoundaryComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const first = canvas.getByLabelText(Field_ONE);
    const outsideElement = canvas.getByLabelText("outside");

    await fireEvent.focus(first);
    await waitFor(() => expect(first).toHaveFocus());

    await fireEvent.focus(outsideElement);
    expect(first).toHaveFocus();

    await fireEvent.click(outsideElement);
    expect(first).toHaveFocus();

    await fireEvent.focus(document.body);
    expect(first).toHaveFocus();

    /* Blurring would normally set focus to body. We want to avoid this */
    fireEvent.blur(first);
    expect(first).toHaveFocus();
  },
  args: {
    trapped: true,
  },
};

export const ReFocusPrevTrappedItem: Story = {
  render: BaseFocusBoundaryComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const first = canvas.getByLabelText(Field_ONE);
    const middle = canvas.getByLabelText(Field_TWO);
    const outsideElement = canvas.getByLabelText("outside");

    /* Regular focus */
    await fireEvent.focus(first);
    await waitFor(() => expect(first).toHaveFocus());

    await userEvent.tab();
    expect(middle).toHaveFocus();

    await fireEvent.focus(outsideElement);
    expect(middle).toHaveFocus();

    await fireEvent.click(outsideElement);
    expect(middle).toHaveFocus();
  },
  args: {
    trapped: true,
  },
};

export const RemoveFocusedItemWhenTrapped: Story = {
  render: BaseFocusBoundaryComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const first = canvas.getByLabelText(Field_ONE);

    await act(async () => {
      first.remove();
    });

    /* By default, container is focused when focused item is removed */
    expect(canvas.getByTestId("focus-scope")).toHaveFocus();
  },
  args: {
    trapped: true,
  },
};

export const MountAutofocus: Story = {
  render: BaseFocusBoundaryComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const showButton = canvas.getByText("show");
    await userEvent.click(showButton);
    const first = canvas.getByLabelText(Field_ONE);
    await waitFor(() => expect(first).toHaveFocus());
  },
  args: {
    showByDefault: false,
  },
};

export const MountAutofocusAvoidLink: Story = {
  render: BaseFocusBoundaryComponent,
  play: MountAutofocus.play,
  args: {
    showByDefault: false,
    firstChild: <a href="/">link</a>,
  },
};

export const MountAutofocusAvoidHiddenInput: Story = {
  render: BaseFocusBoundaryComponent,
  play: MountAutofocus.play,
  args: {
    showByDefault: false,
    firstChild: <input hidden type="text" />,
  },
};

export const MountAutofocusAvoidNegativeTabIndex: Story = {
  render: BaseFocusBoundaryComponent,
  play: MountAutofocus.play,
  args: {
    showByDefault: false,
    firstChild: <div tabIndex={-1}>content</div>,
  },
};

export const MountAutofocusPrevented: Story = {
  render: BaseFocusBoundaryComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const showButton = canvas.getByText("show");
    await userEvent.click(showButton);
    expect(showButton).toHaveFocus();
  },
  args: {
    initialFocus: false,
  },
};

export const FocusPrevActiveItemOnUnmount: Story = {
  render: BaseFocusBoundaryComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const showButton = canvas.getByText("show");
    await userEvent.click(showButton);
    await waitFor(() => expect(canvas.getByLabelText(Field_ONE)).toHaveFocus());

    const hideButton = canvas.getByText("hide");
    await userEvent.click(hideButton);
    expect(showButton).toHaveFocus();
  },
  args: {
    showByDefault: false,
  },
};

export const FocusBodyOnUnmount: Story = {
  render: BaseFocusBoundaryComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const showButton = canvas.getByText("show");
    await userEvent.click(showButton);
    await waitFor(() => expect(canvas.getByLabelText(Field_ONE)).toHaveFocus());

    showButton.remove();

    const hideButton = canvas.getByText("hide");
    await userEvent.click(hideButton);
    expect(document.body).toHaveFocus();
  },
  args: {
    showByDefault: false,
  },
};

export const UnmountAutofocusPrevented: Story = {
  render: BaseFocusBoundaryComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const showButton = canvas.getByText("show");
    await userEvent.click(showButton);
    await waitFor(() => expect(canvas.getByLabelText(Field_ONE)).toHaveFocus());

    const hideButton = canvas.getByText("hide");
    await userEvent.click(hideButton);

    /* Default behaviour is that body gets focus when something blurs */
    expect(document.body).toHaveFocus();
  },
  args: {
    returnFocus: false,
    showByDefault: false,
  },
};

export const TrackPrevFocused: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    return (
      <Provider rootElement={anchorEl || undefined}>
        <div ref={setAnchorEl}>
          <ActionMenu>
            <ActionMenu.Trigger>
              <button data-testid="trigger">Open action menu</button>
            </ActionMenu.Trigger>
            <ActionMenu.Content>
              <ActionMenu.Item onSelect={() => setOpen(true)}>
                Open dialog
              </ActionMenu.Item>
            </ActionMenu.Content>
          </ActionMenu>
          <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogPopup>Content</DialogPopup>
          </Dialog>
        </div>
      </Provider>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const openMenuButton = canvas.getByText("Open action menu");
    await userEvent.click(openMenuButton);

    await waitFor(async () =>
      expect(canvas.getByText("Open dialog")).toBeVisible(),
    );

    const openDialog = canvas.getByText("Open dialog");
    await userEvent.click(openDialog);

    await userEvent.keyboard("{Escape}");

    await waitFor(() => expect(openMenuButton).toHaveFocus());
  },
};

/* ------------------------------- Test utils ------------------------------- */
function BaseFocusBoundaryComponent({
  showByDefault = true,
  firstChild,
  ...props
}: FocusBoundaryProps & {
  showByDefault?: boolean;
  firstChild?: React.ReactNode;
}) {
  const [show, setShow] = useState(showByDefault);

  return (
    <VStack gap="space-12" className="sb-focus-scope-tests">
      <style>
        {`.sb-focus-scope-tests :where(:focus, :focus-visible) { outline: 4px solid black; outline-offset: 2px; z-index: 2; }`}
      </style>
      <div>
        <button onClick={() => setShow(true)}>show</button>
        <button>outside-button-start</button>
      </div>
      {show && (
        <FocusBoundary {...props} data-testid="focus-scope">
          <VStack
            gap="space-4"
            as="form"
            align="start"
            padding="space-8"
            style={{ border: "1px solid black" }}
          >
            {firstChild}
            <TestField label={Field_ONE} />
            <TestField label={Field_TWO} />
            <button>{BUTTON_THREE}</button>
          </VStack>
        </FocusBoundary>
      )}
      <TestField label="outside" />
      <div>
        <button>outside-button-end</button>
        {show && <button onClick={() => setShow(false)}>hide</button>}
      </div>
    </VStack>
  );
}

function TestField({
  label,
  ...props
}: { label: string } & React.ComponentProps<"input">) {
  return (
    <label>
      <span>{label}</span>
      <input
        type="text"
        name={label.toLowerCase()}
        autoComplete="off"
        {...props}
      />
    </label>
  );
}
