import {
  isInList,
  mapToComboboxOptionArray,
  toComboboxOption,
} from "../combobox-utils";

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

describe("mapToComboboxOptionArray", () => {
  test("maps an array of strings to an array of ComboboxOptions", () => {
    const stringArray = ["Hjelpemidler", "Oppfølging", "Sykepenger"];
    const comboboxOptions = [
      { label: "Hjelpemidler", value: "Hjelpemidler" },
      { label: "Oppfølging", value: "Oppfølging" },
      { label: "Sykepenger", value: "Sykepenger" },
    ];
    expect(mapToComboboxOptionArray(stringArray)).toEqual(comboboxOptions);
  });

  test("does not change an array of ComboboxOptions", () => {
    const comboboxOptions = [
      { label: "Hjelpemidler", value: "Hjelpemidler" },
      { label: "Oppfølging", value: "Oppfølging" },
      { label: "Sykepenger", value: "Sykepenger" },
    ];
    expect(mapToComboboxOptionArray(comboboxOptions)).toEqual(comboboxOptions);
  });
});

describe("toComboboxOption", () => {
  test("creates a ComboboxOption from a string", () => {
    expect(toComboboxOption("Hjelpemidler")).toEqual({
      label: "Hjelpemidler",
      value: "Hjelpemidler",
    });
  });
});
