import { describe, expect, test } from "vitest";
import { parseIcon } from "../config/parse-svg";

describe(`SVG should be correctly parsed`, () => {
  const simpleSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="18.1559 9.81056 17.4392Z" fill="#202733"/>
  </svg>
  `;

  const simpleSvgResult = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="18.1559 9.81056 17.4392Z" fill="currentColor"/>
  </svg>
  `;

  const advancedSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="18.1559 9.81056 17.4392Z" fill="#202733"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="18.1559 9.81056 17.4392Z" fill="#202733"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="18.1559 9.81056 17.4392Z" fill="#202733"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="18.1559 9.81056 17.4392Z" fill="#202733"/>
  </svg>
  `;

  const advancedSvgResult = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="18.1559 9.81056 17.4392Z" fill="currentColor"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="18.1559 9.81056 17.4392Z" fill="currentColor"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="18.1559 9.81056 17.4392Z" fill="currentColor"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="18.1559 9.81056 17.4392Z" fill="currentColor"/>
  </svg>
  `;

  test("a", () => {
    expect(parseIcon(simpleSvg)).toEqual(simpleSvgResult);
    expect(parseIcon(advancedSvg)).toEqual(advancedSvgResult);
  });
});
