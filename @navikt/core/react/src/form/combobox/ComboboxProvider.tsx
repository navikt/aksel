import React from "react";
import Combobox from "./Combobox";
import { FilteredOptionsProvider } from "./FilteredOptions/filteredOptionsContext";

export default function ComboboxProvider(props) {
  const { children, isListOpen, ...rest } = props;
  return (
    <FilteredOptionsProvider value={{ isListOpen }}>
      <Combobox {...rest}>{children}</Combobox>
    </FilteredOptionsProvider>
  );
}
