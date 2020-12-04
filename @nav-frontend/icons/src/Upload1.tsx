import * as React from "react";

function Upload1(
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
        d="M19 6.625L12 0 5 6.625h6V17h2V6.625h6zM3 17v3h18v-3h2v3a4 4 0 01-4 4H5a4 4 0 01-4-4v-3h2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Upload1);
export default ForwardRef;
