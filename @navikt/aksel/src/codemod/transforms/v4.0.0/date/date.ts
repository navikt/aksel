/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const names = [
    "UNSAFE_useDatepicker",
    "UNSAFE_DatePicker",
    "UNSAFE_useRangeDatepicker",
    "UNSAFE_MonthPicker",
    "UNSAFE_useMonthpicker",
  ];

  let src = file.source;

  names.forEach((name) => {
    const rgx = new RegExp(`${name}`, "gm");
    src = src.replace(rgx, name.replace("UNSAFE_", ""));
  });

  return src;
}
