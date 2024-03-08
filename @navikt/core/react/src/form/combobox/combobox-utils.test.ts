import { isInList } from "./combobox-utils";

const list = [
  { label: "Hjelpemidler", value: "HJE" },
  { label: "Oppfølging", value: "OPP" },
  { label: "Sykepenger", value: "SYK" },
  { label: "Sykemelding", value: "SYM" },
];

describe("isInList", () => {
  test("finds a string value in a list of ComboboxOptions", () => {
    expect(isInList("Oppfølging", list)).toBe(true);
    expect(isInList("SYM", list)).toBe(true);
    expect(isInList("Arbeidsavklaringspenger", list)).toBe(false);
    expect(isInList("AAP", list)).toBe(false);
  });

  test("finds a ComboboxOption in a list of ComboboxOptions", () => {
    expect(isInList({ label: "Oppfølging", value: "OPP" }, list)).toBe(true);
    expect(isInList({ label: "Sykemelding", value: "SYM" }, list)).toBe(true);
    expect(
      isInList({ label: "Arbeidsavklaringspenger", value: "AAP" }, list),
    ).toBe(false);
    expect(
      isInList({ label: "Arbeidsavklaringspenger", value: "AAP" }, list),
    ).toBe(false);
  });

  test("returns false for ComboboxOptions which do not match both label and value", () => {
    expect(isInList({ label: "Oppfølging", value: "SYM" }, list)).toBe(false);
    expect(isInList({ label: "Sykemelding", value: "OPP" }, list)).toBe(false);
  });
});
