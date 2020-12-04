import * as React from "react";

function Sandglass(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 0v6.5a6.495 6.495 0 01-3.035 5.5 6.494 6.494 0 013.03 5.234L19 17.5V24H6v-6.5A6.495 6.495 0 019.035 12 6.493 6.493 0 016 6.5V0h13zm-2 20H8v2h9v-2zm-5.5-6.889a4.502 4.502 0 00-3.495 4.169L8 17.5v.5h3.5v-1.5h2V18H17v-.5l-.005-.212a4.502 4.502 0 00-3.494-4.176L13.5 14.5h-2v-1.389zm4.742-4.11H8.759a4.496 4.496 0 003.53 1.994L12.5 11c1.56 0 2.934-.794 3.742-2zM17 2H8v4.5c0 .17.01.336.028.501h8.944c.011-.096.019-.192.023-.29L17 6.5V2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Sandglass);
export default ForwardRef;
