import React, { useState } from "react";
import { ConfirmationPanel } from "..";
import { Link } from "../..";

export const ConfirmationPanelExample = ({
  size = "m",
  error,
}: {
  size: "m" | "s";
  error?: string;
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <ConfirmationPanel
      checked={checked}
      onChange={() => setChecked(!checked)}
      label="Checkbox label text"
      size={size}
      error={error}
    >
      Ipsum voluptate pariatur <Link href="#123">demolink</Link> anim officia
      minim ut mollit voluptate exercitation nulla mollit.
    </ConfirmationPanel>
  );
};
