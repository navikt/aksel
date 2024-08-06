import React from "react";

type Props = {
  /**
   * The phonenumber itself as a raw string, it will
   * be split up and represented in accordance with the guidelines
   * we have for formatting phone numbers.
   *
   * https://aksel.nav.no/god-praksis/artikler/skriveregler-i-nav
   *
   * If you want to escape a country code, it's recommended to use
   * a '+' and not a leading '00', this is why we have it as a separate
   * prop `prefixCode`.
   */
  number: string;
  /**
   * Setting this will add `+prefixCode` to the
   * beginning of the phone number.
   */
  prefixCode?: string;
};

/**
 * A component that displays a phone number in accordance with
 * our best practice guidelines for displaying phone numbers.
 *
 * https://aksel.nav.no/god-praksis/artikler/skriveregler-i-nav
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/phone)
 * @see 🏷 {@link Props}
 *
 * @example
 * ```jsx
 * <Phone number=“04045” />
 * <Phone number=“22222222” />
 * <Phone number=“80030300” />
 * <Phone number=“116117” prefixCode=“47” />
 * ```
 */
export const Phone = ({ number, prefixCode }: Props) => {
  let _number = number.trim();
  if (_number.startsWith("00")) {
    // this is to discourage 00, and instead use '+'
    _number = _number.substring(2);
  }
  _number = _number.replace(/[^0-9]/g, "");
  let numberGroups: string[] = [];
  if (_number.length === 8 && _number.startsWith("8")) {
    numberGroups.push(_number.substring(0, 3));
    numberGroups.push(_number.substring(3, 5));
    numberGroups.push(_number.substring(5, 8));
  } else if (_number.length >= 7) {
    for (let i = 0; i < _number.length; i += 2) {
      numberGroups.push(_number.substring(i, i + 2));
    }
  } else if (_number.length === 6) {
    numberGroups.push(_number.substring(0, 3));
    numberGroups.push(_number.substring(3, 6));
  } else if (_number.length <= 5) {
    numberGroups = [_number];
  }
  return (
    <span className="navds-phone">
      {prefixCode && <span>+{prefixCode}</span>}
      {numberGroups.map((n, idx) => (
        <span key={idx}>{n}</span>
      ))}
    </span>
  );
};
