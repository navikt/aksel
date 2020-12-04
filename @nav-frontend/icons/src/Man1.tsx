import * as React from "react";

function Man1(
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
        d="M19 4a4 4 0 00-4-4H9a4 4 0 00-4 4v6a6.989 6.989 0 003.079 5.798A10.008 10.008 0 002.049 24h8.283L11 20l-.705-2.818h3.41L13 20l.666 4h8.285a10.003 10.003 0 00-6.03-8.2A6.993 6.993 0 0019 10V4zM7 7.977l3.215-2.834 6.784 2.475L17 10l-.005.217A5 5 0 017 10V7.977z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Man1);
export default ForwardRef;
