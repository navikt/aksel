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
    if (value === "cssValue") {
      params.delete("tokenFormat");
    } else {
      params.set("tokenFormat", value);
    }
    replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <Select
      label="Velg token-format"
      hideLabel
      style={{ width: "9rem" }}
      onChange={handleChange}
    >
      <option value="cssValue">CSS</option>
      <option value="jsValue">JS</option>
      <option value="scssValue">SCSS</option>
      <option value="lessValue">LESS</option>
    </Select>
  );
};

export default TokenFormatSelector;
