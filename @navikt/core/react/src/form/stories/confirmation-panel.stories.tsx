import React, { useState } from "react";
import { ConfirmationPanel } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Link } from "../..";
export default {
  title: "ds-react/form/confirmation-panel",
  component: ConfirmationPanel,
} as Meta;

export const All = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <h1>ConfirmationPanel</h1>
      <ConfirmationPanel
        checked={checked}
        onChange={() => setChecked(!checked)}
        label="Checkbox label text"
      >
        Ipsum voluptate pariatur <Link href="#123">testlink</Link> anim officia
        minim ut mollit voluptate exercitation nulla mollit.
      </ConfirmationPanel>
      <h2>size small</h2>
      <ConfirmationPanel
        checked={checked}
        onChange={() => setChecked(!checked)}
        label="Checkbox label text"
        size="small"
      >
        Ipsum voluptate pariatur <Link href="#123">testlink</Link> anim officia
        minim ut mollit voluptate exercitation nulla mollit.
      </ConfirmationPanel>
      <h3>error</h3>
      <ConfirmationPanel
        checked={checked}
        onChange={() => setChecked(!checked)}
        label="Checkbox label text"
        error="Ex cupidatat do do do"
      >
        Ipsum voluptate pariatur <Link href="#123">testlink</Link> anim officia
        minim ut mollit voluptate exercitation nulla mollit.
      </ConfirmationPanel>
      <h3>error small</h3>
      <ConfirmationPanel
        checked={checked}
        onChange={() => setChecked(!checked)}
        label="Checkbox label text"
        error="Ex cupidatat do do do"
        size="small"
      >
        Ipsum voluptate pariatur <Link href="#123">testlink</Link> anim officia
        minim ut mollit voluptate exercitation nulla mollit.
      </ConfirmationPanel>
      <h2>Empty</h2>
      <ConfirmationPanel
        checked={checked}
        onChange={() => setChecked(!checked)}
        label="Checkbox label text"
      ></ConfirmationPanel>
      <h2>Uncontrolled</h2>
      <ConfirmationPanel label="Checkbox label text"></ConfirmationPanel>
      <h3>defaultChecked</h3>
      <ConfirmationPanel
        defaultChecked
        label="Checkbox label text"
      ></ConfirmationPanel>
    </div>
  );
};
