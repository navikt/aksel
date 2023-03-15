// the following is a usereducer function for keyboard events, taking in a keyboard event as an action and a state

/* 

setOptions
setSelectedOptions
setFilteredOptions
setCustomFilteredOptions
setInternalValue
setInternalListOpen
setFilteredOptionsIndex

toggleListButton
toggleListButtonLabel


Find a way to organise and/or merge methods that come from both user and us (external and internal methods and values)

Should preventDefault() be called in the reducer, since it's a side effect?

"Escape" and "Enter_Add_New" are special cases, since they have side effects
*/
export function eventReducer(state, action, e) {
  switch (action.type) {
    case "Backspace":
      if (state.internalValue === "")
        return {
          ...state,
          selectedOptions: state.selectedOptions.slice(0, -1),
        };
      break;
    case "Escape":
      e.preventDefault();
      /* side effects called here
       * 1. handleClear({ trigger: e.key, event: e })
       *   a. onClear // from user
       *   b. handleChange
       *     i. onChange // from user
       */
      return { ...state, isInternalListOpen: false };
    case "Enter_Remove_Selected":
      e.preventDefault();
      return {
        ...state,
        selectedOptions: state.selectedOptions.filter(
          (o) => o !== state.filteredOptions[state.filteredOptionsIndex]
        ),
      };
    case "Enter_Add_Selected":
      e.preventDefault();
      return {
        ...state,
        selectedOptions: [
          ...state.selectedOptions,
          state.filteredOptions[state.filteredOptionsIndex],
        ],
      };
    case "Enter_Add_New":
      // side effect: focusInput
      return {
        ...state,
        selectedOptions: [...state.selectedOptions, state.internalValue],
        internalValue: "",
      };
    case "ArrowDown":
      e.preventDefault();
      return {
        ...state,
        filteredOptionsIndex: Math.min(
          state.filteredOptionsIndex + 1,
          state.filteredOptions.length - 1
        ),
      };
    case "ArrowUp":
      e.preventDefault();
      return {
        ...state,
        filteredOptionsIndex: Math.max(state.filteredOptionsIndex - 1, 0),
      };
    default:
      return state;
  }
}
