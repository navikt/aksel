import * as React from "react";

function Shredding(
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
        d="M3 10V0h11l7 7v3h-2V8h-7V2H5v8H3zm11-4V2.83l3.17 3.169L14 6zm-3 8H9v10H7V14H5v10H3V14H0v-2h24v2h-3v10h-2V14h-2v10h-2V14h-2v10h-2V14z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Shredding);
export default ForwardRef;
