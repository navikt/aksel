"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select } from "@navikt/ds-react";

const TokenFormatSelector = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams?.toString());
    const value = event.target.value;
    if (value) {
      params.set("tokenFormat", value);
    } else {
      params.delete("tokenFormat");
    }
    replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <Select
      label="Velg bostedsland"
      hideLabel
      style={{ width: "9rem" }}
      onChange={handleChange}
    >
      <option>CSS</option>
      <option value="jsValue">JS</option>
      <option value="scssValue">SCSS</option>
      <option value="lessValue">LESS</option>
    </Select>
  );
};

export default TokenFormatSelector;
