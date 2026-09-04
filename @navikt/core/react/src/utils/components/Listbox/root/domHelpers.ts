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

function getPreviousPage(
  listbox: HTMLElement,
  currentOption: HTMLElement | null,
) {
  const listboxRect = listbox.getBoundingClientRect();

  if (currentOption) {
    // Scroll down so that the currently focused option is on the bottom
    currentOption.scrollIntoView({ block: "end" });

    // Return the first option that is now fully visible
    let prevOption = findPrevOption(currentOption);
    let optionToFocus = prevOption || currentOption;
    while (prevOption) {
      const prevOptionRect = prevOption.getBoundingClientRect();
      if (prevOptionRect.top < listboxRect.top) {
        return optionToFocus;
      }
      optionToFocus = prevOption;
      prevOption = findPrevOption(prevOption);
    }
    return optionToFocus;
  }

  // No currently focused option: Return the first option that is fully visible
  // (Often more expensive than above case since we might have to check more options.)
  const allOptions = listbox.querySelectorAll<HTMLElement>('[role="option"]');
  for (let i = 0; i < allOptions.length; i++) {
    const optionRect = allOptions[i].getBoundingClientRect();
    if (optionRect.top >= listboxRect.top) {
      return allOptions[i];
    }
  }
  return null; // Should never get here
}

function getNextPage(listbox: HTMLElement, currentOption: HTMLElement | null) {
  const listboxRect = listbox.getBoundingClientRect();

  if (currentOption) {
    // Scroll down so that the currently focused option is on the top
    currentOption.scrollIntoView({ block: "start" });

    // Return the last option that is now fully visible
    let nextOption = findNextOption(currentOption);
    let optionToFocus = nextOption || currentOption;
    while (nextOption) {
      const nextOptionRect = nextOption.getBoundingClientRect();
      if (nextOptionRect.bottom > listboxRect.bottom) {
        return optionToFocus;
      }
      optionToFocus = nextOption;
      nextOption = findNextOption(nextOption);
    }
    return optionToFocus;
  }

  // No currently focused option: Return the last option that is fully visible
  // (Often more expensive than above case since we might have to check more options.)
  const allOptions = listbox.querySelectorAll<HTMLElement>('[role="option"]');
  for (let i = allOptions.length - 1; i >= 0; i--) {
    const optionRect = allOptions[i].getBoundingClientRect();
    if (optionRect.bottom <= listboxRect.bottom) {
      return allOptions[i];
    }
  }
  return null; // Should never get here
}

export { findNextOption, findPrevOption, getPreviousPage, getNextPage };
