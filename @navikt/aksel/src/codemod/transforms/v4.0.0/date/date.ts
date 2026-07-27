import type { FileInfo } from "jscodeshift";

export default function transformer(file: FileInfo) {
  const names = [
    "UNSAFE_useDatepicker",
    "UNSAFE_DatePicker",
    "UNSAFE_useRangeDatepicker",
    "UNSAFE_MonthPicker",
    "UNSAFE_useMonthpicker",
  ];

  let src = file.source;

  names.forEach((name) => {
    src = src.replaceAll(name, name.replace("UNSAFE_", ""));
  });

  return src;
}
