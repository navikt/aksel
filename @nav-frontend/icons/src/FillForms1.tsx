import * as React from "react";

function Fillforms1(
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
        d="M23.166 5.804c1.246-1.514 1.076-3.75-.378-4.996-1.455-1.245-3.644-1.027-4.89.487L16.265 3.28l5.311 4.457 1.59-1.933zm-2.86 3.478l-5.312-4.457-5.902 7.174L0 12v12h24V12l-5.93-.001 2.235-2.717zm-6.161 7.49l2.279-2.773L22 14v8H2v-8l6.455-.001L7 20l7.145-3.229z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Fillforms1);
export default ForwardRef;
