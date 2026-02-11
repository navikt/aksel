import { isArrowKey } from "./key-handler";

function shouldBlockArrowKeyNavigation(event: KeyboardEvent): boolean {
  const key = event.key;
  if (!isArrowKey(key)) {
    return false;
  }

  const el = event.target as HTMLElement | null;
  if (!el) {
    return false;
  }

  if (el.isContentEditable) {
    return true;
  }

  const editable = el.closest(
    'input, textarea, select, [contenteditable="true"]',
  );
  if (!editable) {
    return false;
  }

  if (editable instanceof HTMLInputElement) {
    return shouldBlockInputArrow(editable, key);
  }

  if (editable instanceof HTMLTextAreaElement) {
    return shouldBlockTextAreaArrow(editable, key);
  }

  if (editable instanceof HTMLSelectElement) {
    if (key === "ArrowDown" || key === "ArrowUp") {
      return true;
    }
    return false;
  }

  return editable.hasAttribute("contenteditable");
}

function shouldBlockInputArrow(input: HTMLInputElement, key: string): boolean {
  if (input.type === "checkbox" || input.type === "radio") {
    return false;
  }

  if (!isTextInputType(input.type)) {
    return false;
  }

  const start = input.selectionStart;
  const end = input.selectionEnd;
  if (start === null || end === null) {
    return true;
  }

  return shouldBlockBySelection(key, start, end, input.value.length);
}

function shouldBlockTextAreaArrow(
  textarea: HTMLTextAreaElement,
  key: string,
): boolean {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  return shouldBlockBySelection(key, start, end, textarea.value.length);
}

function shouldBlockBySelection(
  key: string,
  start: number,
  end: number,
  valueLength: number,
): boolean {
  if (key === "ArrowLeft" || key === "ArrowUp") {
    return start > 0 || end > 0;
  }
  if (key === "ArrowRight" || key === "ArrowDown") {
    return end < valueLength;
  }
  return false;
}

function isTextInputType(type: string): boolean {
  switch (type) {
    case "text":
    case "search":
    case "url":
    case "tel":
    case "password":
    case "email":
    case "number":
      return true;
    default:
      return false;
  }
}

export { shouldBlockArrowKeyNavigation };
