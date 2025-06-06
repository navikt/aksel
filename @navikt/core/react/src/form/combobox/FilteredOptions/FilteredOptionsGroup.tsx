import React from "react";
import { Detail } from "../../../typography";
import { ComboboxOption } from "../types";
import FilteredOptionsItem from "./FilteredOptionsItem";

const FilteredOptionsGroup = ({ group, options }) => (
  <div
    role="group"
    className="navds-combobox__list__group"
    key={group}
    aria-labelledby={`group-${group}`}
  >
    <Detail
      id={`group-${group}`}
      className="navds-combobox__list__group__heading"
      data-no-focus="true"
      weight="semibold"
    >
      {group}
    </Detail>
    {options.map((option: ComboboxOption) => (
      <FilteredOptionsItem key={option.value} option={option} />
    ))}
  </div>
);

export default FilteredOptionsGroup;
