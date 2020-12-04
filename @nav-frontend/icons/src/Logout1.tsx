import * as React from "react";

function Logout1(
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
        d="M1 2a2 2 0 012-2h10a2 2 0 012 2v3h-2V2H3v20h10v-3h2v3a2 2 0 01-2 2H3a2 2 0 01-2-2V2zm16.375 4L23 12l-5.625 6v-5H6v-2h11.375V6z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Logout1);
export default ForwardRef;
