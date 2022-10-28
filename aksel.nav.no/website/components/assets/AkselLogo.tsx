import React from "react";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AkselLogo = (props): JSX.Element => (
  <svg
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 28 28"
    width="28"
    height="28"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m3 9 5.268-5.268A2.5 2.5 0 0 1 10.036 3H22.5A2.5 2.5 0 0 1 25 5.5v12.465a2.5 2.5 0 0 1-.732 1.767L19 25"
    ></path>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m3 9 5.232-5.232a2.5 2.5 0 0 1 3.536 0l12.464 12.464a2.5 2.5 0 0 1 0 3.536L19 25m-7-9-9 9"
    ></path>
  </svg>
);

export default AkselLogo;
