import * as React from "react";

function Building2(
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
        d="M23 0v24H1V11h8V0h14zm-2 2H11v9h4v11h6V2zm-8 11H3v9h10v-9zm-2 2v2H5v-2h6zm8-11v14h-2V4h2zm-4 0v5h-2V4h2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Building2);
export default ForwardRef;
