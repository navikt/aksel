import * as React from "react";

function Boy(
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
        d="M13 0a8 8 0 014.095 14.874A10.002 10.002 0 0123 24h-2a8 8 0 10-16 0H3c0-4.064 2.424-7.562 5.905-9.126A7.995 7.995 0 015 8H2a1 1 0 010-2h3.252C6.14 2.55 9.272 0 13 0zm6 8H7a6 6 0 0012 0zm-6-6a6.002 6.002 0 00-5.659 4H18.66A6.002 6.002 0 0013 2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Boy);
export default ForwardRef;
