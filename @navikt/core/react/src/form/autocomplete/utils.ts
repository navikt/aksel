export const set_virtual_focus = (
  node_to_focus: HTMLElement,
  node_to_blur?: HTMLElement,
) => {
  node_to_blur?.classList.remove("vfocus");
  node_to_focus.classList.add("vfocus");
};

export const remove_virtual_focus = (node_to_blur: HTMLElement) => {
  node_to_blur.classList.remove("vfocus");
};
