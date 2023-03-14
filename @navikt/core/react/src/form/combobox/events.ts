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
    case "ArrowDown":
      e.preventDefault();
      setFilteredOptionsIndex(
        Math.min(filteredOptionsIndex + 1, filteredOptions.length - 1)
      );
      break;
    case "ArrowUp":
      e.preventDefault();
      setFilteredOptionsIndex(Math.max(0, filteredOptionsIndex - 1));
      break;
    default:
      break;
  }
};
