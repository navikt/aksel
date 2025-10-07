import type { Meta, StoryObj } from "@storybook/react-vite";
// eslint-disable-next-line storybook/use-storybook-testing-library
import { act } from "@testing-library/react";
import React, { useState } from "react";
import { expect, fireEvent, userEvent, within } from "storybook/test";
import { VStack } from "../../layout/stack";
import { FocusScope, type FocusScopeProps } from "./FocusScope";

const meta: Meta<typeof FocusScope> = {
  title: "Utilities/FocusScope/Tests",
  component: FocusScope,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof BaseFocusScopeComponent>;

const Field_ONE = "Name";
const Field_TWO = "Email";
const BUTTON_THREE = "Submit";

export const Loop: Story = {
  render: BaseFocusScopeComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const first = canvas.getByLabelText(Field_ONE);
    const middle = canvas.getByLabelText(Field_TWO);
    const last = canvas.getByText(BUTTON_THREE);

    /* Regular focus */
    await fireEvent.focus(first);
    expect(first).toHaveFocus();
    await userEvent.tab();
    expect(middle).toHaveFocus();

    /* Loop */
    await userEvent.tab();
    expect(last).toHaveFocus();
    await userEvent.tab();
    expect(first).toHaveFocus();

    /* Shift tab */
    await fireEvent.focus(first);
    expect(first).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(last).toHaveFocus();
  },
  args: {
    loop: true,
  },
};

export const TrappedNoLoop: Story = {
  render: BaseFocusScopeComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const first = canvas.getByLabelText(Field_ONE);
    const middle = canvas.getByLabelText(Field_TWO);
    const last = canvas.getByText(BUTTON_THREE);

    /* Regular focus */
    await fireEvent.focus(first);
    expect(first).toHaveFocus();
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
  render: BaseFocusScopeComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const first = canvas.getByLabelText(Field_ONE);
    const outsideElement = canvas.getByLabelText("outside");

    await fireEvent.focus(first);
    expect(first).toHaveFocus();

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
  render: BaseFocusScopeComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const first = canvas.getByLabelText(Field_ONE);
    const middle = canvas.getByLabelText(Field_TWO);
    const outsideElement = canvas.getByLabelText("outside");

    /* Regular focus */
    await fireEvent.focus(first);
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
  render: BaseFocusScopeComponent,
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
  render: BaseFocusScopeComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const showButton = canvas.getByText("show");
    await userEvent.click(showButton);
    const first = canvas.getByLabelText(Field_ONE);
    expect(first).toHaveFocus();
  },
  args: {
    showByDefault: false,
  },
};

export const MountAutofocusAvoidLink: Story = {
  render: BaseFocusScopeComponent,
  play: MountAutofocus.play,
  args: {
    showByDefault: false,
    firstChild: <a href="/">link</a>,
  },
};

export const MountAutofocusAvoidHiddenInput: Story = {
  render: BaseFocusScopeComponent,
  play: MountAutofocus.play,
  args: {
    showByDefault: false,
    firstChild: <input hidden type="text" />,
  },
};

export const MountAutofocusAvoidNegativeTabIndex: Story = {
  render: BaseFocusScopeComponent,
  play: MountAutofocus.play,
  args: {
    showByDefault: false,
    firstChild: <div tabIndex={-1}>content</div>,
  },
};

export const MountAutofocusPrevented: Story = {
  render: BaseFocusScopeComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const showButton = canvas.getByText("show");
    await userEvent.click(showButton);
    expect(showButton).toHaveFocus();
  },
  args: {
    onMountAutoFocus: (event) => event.preventDefault(),
  },
};

export const FocusPrevActiveItemOnUnmount: Story = {
  render: BaseFocusScopeComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const showButton = canvas.getByText("show");
    await userEvent.click(showButton);
    expect(canvas.getByLabelText(Field_ONE)).toHaveFocus();

    await userEvent.click(showButton);
    expect(showButton).toHaveFocus();
  },
  args: {
    showByDefault: false,
  },
};

export const FocusBodyOnUnmount: Story = {
  render: BaseFocusScopeComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const showButton = canvas.getByText("show");
    await userEvent.click(showButton);
    expect(canvas.getByLabelText(Field_ONE)).toHaveFocus();

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
  render: BaseFocusScopeComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const showButton = canvas.getByText("show");
    await userEvent.click(showButton);
    expect(canvas.getByLabelText(Field_ONE)).toHaveFocus();

    const hideButton = canvas.getByText("hide");
    await userEvent.click(hideButton);

    /* Default behaviour is that body gets focus when something blurs */
    expect(document.body).toHaveFocus();
  },
  args: {
    onUnmountAutoFocus: (event) => event.preventDefault(),
    showByDefault: false,
  },
};

/* ------------------------------- Test utils ------------------------------- */
function BaseFocusScopeComponent({
  showByDefault = true,
  firstChild,
  ...props
}: FocusScopeProps & {
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
        <FocusScope {...props} data-testid="focus-scope">
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
        </FocusScope>
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
      <input type="text" name={label.toLowerCase()} {...props} />
    </label>
  );
}
