import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, fireEvent, userEvent, within } from "storybook/test";
import { FocusScope, type FocusScopeProps } from "./FocusScope";

const meta: Meta<typeof FocusScope> = {
  title: "Utilities/FocusScope/Tests",
  component: FocusScope,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof FocusScope>;

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

export const MountAutofocus: Story = {
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <>
        <button onClick={() => setShow(true)}>show</button>
        {show && <BaseFocusScopeComponent />}
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const showButton = canvas.getByText("show");
    await userEvent.click(showButton);
    const first = canvas.getByLabelText(Field_ONE);
    expect(first).toHaveFocus();
  },
  args: {
    trapped: true,
  },
};

export const MountAutofocusAvoidLink: Story = {
  render: (props) => {
    const [show, setShow] = useState(false);
    return (
      <>
        <button onClick={() => setShow(true)}>show</button>
        {show && (
          <FocusScope {...props}>
            <form>
              <a href="/">link</a>
              <TestField label={Field_ONE} />
            </form>
          </FocusScope>
        )}
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const showButton = canvas.getByText("show");
    await userEvent.click(showButton);
    const first = canvas.getByLabelText(Field_ONE);
    expect(first).toHaveFocus();
  },
};

export const MountAutofocusAvoidHiddenInput: Story = {
  render: (props) => {
    const [show, setShow] = useState(false);
    return (
      <>
        <button onClick={() => setShow(true)}>show</button>
        {show && (
          <FocusScope {...props}>
            <form>
              <input hidden type="text" />
              <TestField label={Field_ONE} />
            </form>
          </FocusScope>
        )}
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const showButton = canvas.getByText("show");
    await userEvent.click(showButton);
    const first = canvas.getByLabelText(Field_ONE);
    expect(first).toHaveFocus();
  },
};

export const MountAutofocusAvoidNegativeTabIndex: Story = {
  render: (props) => {
    const [show, setShow] = useState(false);
    return (
      <>
        <button onClick={() => setShow(true)}>show</button>
        {show && (
          <FocusScope {...props}>
            <form>
              <div tabIndex={-1}>content</div>
              <TestField label={Field_ONE} />
            </form>
          </FocusScope>
        )}
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const showButton = canvas.getByText("show");
    await userEvent.click(showButton);
    const first = canvas.getByLabelText(Field_ONE);
    expect(first).toHaveFocus();
  },
};

export const MountAutofocusPrevented: Story = {
  render: (props) => {
    const [show, setShow] = useState(false);
    return (
      <>
        <button onClick={() => setShow(true)}>show</button>
        {show && <BaseFocusScopeComponent {...props} />}
      </>
    );
  },
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
  render: (props) => {
    const [show, setShow] = useState(false);
    return (
      <>
        <button onClick={() => setShow((x) => !x)}>show</button>
        {show && <BaseFocusScopeComponent {...props} />}
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const showButton = canvas.getByText("show");
    await userEvent.click(showButton);
    expect(canvas.getByLabelText(Field_ONE)).toHaveFocus();

    await userEvent.click(showButton);
    expect(showButton).toHaveFocus();
  },
};

export const FocusBodyOnUnmount: Story = {
  render: (props) => {
    const [show, setShow] = useState(false);
    return (
      <>
        {!show && <button onClick={() => setShow(true)}>show</button>}
        {show && <BaseFocusScopeComponent {...props} />}
        {show && <button onClick={() => setShow(false)}>hide</button>}
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const showButton = canvas.getByText("show");
    await userEvent.click(showButton);
    expect(canvas.getByLabelText(Field_ONE)).toHaveFocus();

    const hideButton = canvas.getByText("hide");
    await userEvent.click(hideButton);
    expect(document.body).toHaveFocus();
  },
};

export const UnmountAutofocusPrevented: Story = {
  render: (props) => {
    const [show, setShow] = useState(false);
    return (
      <>
        {!show && <button onClick={() => setShow(true)}>show</button>}
        {show && <BaseFocusScopeComponent {...props} />}
        {show && <button onClick={() => setShow(false)}>hide</button>}
      </>
    );
  },
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
  },
};

/* ------------------------------- Test utils ------------------------------- */
function BaseFocusScopeComponent(props: FocusScopeProps) {
  return (
    <div>
      <button>outside-button-start</button>
      <FocusScope {...props}>
        <form>
          <TestField label={Field_ONE} />
          <TestField label={Field_TWO} />
          <button>{BUTTON_THREE}</button>
        </form>
      </FocusScope>
      <TestField label="outside" />
      <button>outside-button-end</button>
    </div>
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
