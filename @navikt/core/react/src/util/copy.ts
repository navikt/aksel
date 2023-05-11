// https://github.com/sudodoki/copy-to-clipboard/blob/main/index.js
function copy(text) {
  let range: Range, mark: HTMLSpanElement | null;

  let selection: Selection | null;

  const debug = process.env.NODE_ENV !== "production";

  try {
    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement("span");
    mark.textContent = text;
    // avoid screen readers from reading out loud the text
    mark.ariaHidden = "true";
    // reset user styles for span element
    mark.style.all = "unset";
    // prevents scrolling to the end of the page
    mark.style.position = "fixed";
    mark.style.top = "0";
    mark.style.clipPath = "rect(0, 0, 0, 0)";
    // used to preserve spaces and line breaks
    mark.style.whiteSpace = "pre";
    // do not inherit user-select (it may be `none`)
    (mark.style as any).webkitUserSelect = "text";
    (mark.style as any).MozUserSelect = "text";
    (mark.style as any).msUserSelect = "text";
    mark.style.userSelect = "text";
    mark.addEventListener("copy", function (e) {
      e.stopPropagation();
    });

    document.body.appendChild(mark);

    range.selectNodeContents(mark);
    selection?.addRange(range);

    var successful = document.execCommand("copy");
    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }

    if (selection) {
      if (typeof selection.removeRange == "function") {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
  } catch (err) {
    debug && console.error("unable to copy using execCommand: ", err);
  }
}

export default copy;
