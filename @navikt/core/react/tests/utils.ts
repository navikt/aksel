// https://github.com/mui/material-ui/blob/d14be1cb1e4c7275a1f356dec98667c7ad491983/test/utils/focusVisible.ts#L3
import { act, fireEvent } from "@testing-library/react";
import { render } from "@testing-library/react";
import fs from "fs";
import path from "path";
import { ReactElement } from "react";

export function focusVisible(element: HTMLElement) {
  act(() => {
    element.blur();
    fireEvent.keyDown(document.body, { key: "Tab" });
    element.focus();
  });
}

export function simulatePointerDown(element?: HTMLElement) {
  // first focus on a page triggers focus visible until a pointer event
  // has been dispatched
  fireEvent.pointerDown(element ?? document.body);
}

export async function simulateHover(el: HTMLElement, user: any) {
  await user.hover(el);
}

export const renderWithStyles = (element: ReactElement) => {
  const stylesheetFile = fs.readFileSync(
    path.resolve(__dirname, "../../css/dist/index.css"),
    "utf-8"
  );

  const styleTag = document.createElement("style");
  styleTag.innerHTML = stylesheetFile;

  const { container, ...rest } = render(element);

  container.append(styleTag);

  return { container, ...rest };
};
