import React from "react";

export const keyDownHandler = (
  e: React.KeyboardEvent<HTMLInputElement>,
  {
    internalValue,
    selectedOptions,
    setInternalListOpen,
    setFilteredOptionsIndex,
    filteredOptions,
    setSelectedOptions,
    handleClear,
    toggleOption,
    filteredOptionsIndex,
    filteredOptionsRef,
  }
) => {
  switch (e.key) {
    case "Backspace":
      internalValue === "" && setSelectedOptions(selectedOptions.slice(0, -1));
      break;
    case "Escape":
      e.preventDefault();
      handleClear({ trigger: e.key, event: e });
      setInternalListOpen(false);
      break;
    case "Enter":
      e.preventDefault();
      toggleOption();
      break;
    case "ArrowDown": {
      e.preventDefault();
      const newIndex = Math.min(
        filteredOptionsIndex + 1,
        filteredOptions.length - 1
      );
      setFilteredOptionsIndex(newIndex);
      scrollToOption(newIndex, filteredOptionsRef);
      break;
    }
    case "ArrowUp": {
      e.preventDefault();
      const newIndex = Math.max(0, filteredOptionsIndex - 1);
      setFilteredOptionsIndex(newIndex);
      scrollToOption(newIndex, filteredOptionsRef);
      break;
    }
    default:
      break;
  }
};

const scrollToOption = (newIndex: number, filteredOptionsRef: any) => {
  const child = filteredOptionsRef.current.children[newIndex];
  const { top, bottom } = child.getBoundingClientRect();
  const parentRect = filteredOptionsRef.current.getBoundingClientRect();
  if (top < parentRect.top || bottom > parentRect.bottom)
    child.scrollIntoView({ block: "nearest" });
};
