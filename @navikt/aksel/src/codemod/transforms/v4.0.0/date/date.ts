/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file) {
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
