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
    if (value === "js") {
      params.set("tokenFormat", "js");
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
      <option value="css">CSS</option>
      <option value="js">JS</option>
    </Select>
  );
};

export default TokenFormatSelector;
