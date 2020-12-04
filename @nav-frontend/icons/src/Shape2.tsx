import * as React from "react";

function Shape2(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 13 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 0v6.5A6.495 6.495 0 019.965 12a6.494 6.494 0 013.03 5.234L13 17.5V24H0v-6.5A6.495 6.495 0 013.035 12 6.493 6.493 0 010 6.5V0h13zM5.5 13.111a4.502 4.502 0 00-3.495 4.169L2 17.5v.5h3.5v-1.5h2V18H11v-.5l-.005-.212a4.502 4.502 0 00-3.494-4.176L7.5 14.5h-2v-1.389zM11 2H2v4.5c0 .17.01.336.028.501h8.944c.011-.096.019-.192.023-.29L11 6.5V2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Shape2);
export default ForwardRef;
