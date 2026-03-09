function findNextOption(currentOption: HTMLElement) {
  const nextElement = currentOption.nextElementSibling as HTMLElement | null;
  if (nextElement) {
    if (nextElement.role === "group") {
      return nextElement.querySelector<HTMLElement>('[role="option"]');
    }
    if (nextElement.role === "option") {
      return nextElement;
    }
  }

  // No next element: Current element might be inside a group.
  // Check if the parent has a next sibling
  const parentNextElement = currentOption.parentElement
    ?.nextElementSibling as HTMLElement | null;
  if (parentNextElement) {
    if (parentNextElement.role === "group") {
      return parentNextElement.querySelector<HTMLElement>('[role="option"]');
    }
    if (parentNextElement.role === "option") {
      return parentNextElement;
    }
  }

  return null;
}

function findPrevOption(currentOption: HTMLElement) {
  const prevElement =
    currentOption.previousElementSibling as HTMLElement | null;
  if (prevElement) {
    if (prevElement.role === "group") {
      return prevElement.querySelector<HTMLElement>(
        '[role="option"]:last-of-type',
      );
    }
    if (prevElement.role === "option") {
      return prevElement;
    }
  }

  // No previous element: Current element might be inside a group.
  // Check if the parent has a previous sibling.
  const parentPrevElement = currentOption.parentElement
    ?.previousElementSibling as HTMLElement | null;
  if (parentPrevElement) {
    if (parentPrevElement.role === "group") {
      return parentPrevElement.querySelector<HTMLElement>(
        '[role="option"]:last-of-type',
      );
    }
    if (parentPrevElement.role === "option") {
      return parentPrevElement;
    }
  }

  return null;
}

export { findNextOption, findPrevOption };
