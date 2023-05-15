import React, { createContext } from "react";
import Combobox from "./Combobox";
import { FilteredOptionsProvider } from "./FilteredOptions/filteredOptionsContext";
import { CustomOptionsProvider } from "./customOptionsContext";
import { SelectedOptionsProvider } from "./SelectedOptions/selectedOptionsContext";
import { InputContextProvider } from "./Input/inputContext";

export interface RootContextType {
  singleSelect: boolean;
}

const RootContext = createContext<RootContextType>({} as RootContextType);

export const RootProvider = ({ children, ...rest }) => {
  const { singleSelect } = rest;
  return (
    <RootContext.Provider value={{ singleSelect }}>
      {children}
    </RootContext.Provider>
  );
};

export default function ComboboxProvider(props) {
  const {
    children,
    isListOpen,
    onToggleSelected,
    selectedOptions,
    options,
    value,
    onChange,
    singleSelect,
    ...rest
  } = props;
  return (
    <RootProvider value={{ value, singleSelect }}>
      <InputContextProvider value={{ value, onChange }}>
        <SelectedOptionsProvider value={{ selectedOptions, onToggleSelected }}>
          <CustomOptionsProvider>
            <FilteredOptionsProvider value={{ isListOpen, options }}>
              <Combobox {...rest}>{children}</Combobox>
            </FilteredOptionsProvider>
          </CustomOptionsProvider>
        </SelectedOptionsProvider>
      </InputContextProvider>
    </RootProvider>
  );
}
