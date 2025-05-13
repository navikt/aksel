"use client";

import { useState } from "react";
import { Chips } from "@navikt/ds-react";

const FilterChips = () => {
  const startYear = 2022;
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState([`${currentYear}`]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <Chips aria-label="Filtrer på kategori">
        {["Kode", "Design", "Dokumentasjon"].map((category) => (
          <Chips.Toggle
            key={category}
            selected={category === selectedCategory}
            checkmark={false}
            onClick={() => {
              category === selectedCategory
                ? setSelectedCategory(null)
                : setSelectedCategory(category);
            }}
          >
            {category}
          </Chips.Toggle>
        ))}
      </Chips>
      <Chips aria-label="Filtrer på år">
        {Array.from(
          { length: currentYear + 1 - startYear },
          (_, value) => `${startYear + value}`,
        )
          .reverse()
          .map((year) => (
            <Chips.Toggle
              key={year}
              selected={selectedYear.includes(year)}
              checkmark={false}
              onClick={() => {
                setSelectedYear(
                  selectedYear.includes(year)
                    ? selectedYear.filter((item) => item !== year)
                    : [...selectedYear, year],
                );
              }}
            >
              {year}
            </Chips.Toggle>
          ))}
      </Chips>
    </>
  );
};

export default FilterChips;
