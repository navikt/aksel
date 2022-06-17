// https://github.com/mui/material-ui/blob/d14be1cb1e4c7275a1f356dec98667c7ad491983/test/utils/focusVisible.ts#L3
import { act, fireEvent } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event/dist/types/setup";

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

export async function simulateHover(el: HTMLElement, user: UserEvent) {
  await user.hover(el);
}
