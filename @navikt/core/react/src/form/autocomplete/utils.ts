export const set_virtual_focus = (
  node_to_focus: HTMLElement,
  node_to_blur?: HTMLElement,
) => {
  node_to_blur?.removeAttribute("data-aksel-virtualfocus");
  node_to_focus?.setAttribute("data-aksel-virtualfocus", "true");
};

export const remove_virtual_focus = (node_to_blur: HTMLElement) => {
  node_to_blur?.removeAttribute("data-aksel-virtualfocus");
};
