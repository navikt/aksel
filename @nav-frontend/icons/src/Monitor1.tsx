import * as React from "react";

function Monitor1(
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
        d="M12 3h10v7L12 3zM0 3a2 2 0 012-2h20a2 2 0 012 2v13a2 2 0 01-2 2h-9v3h4a2 2 0 012 2H5a2 2 0 012-2h4v-3H2a2 2 0 01-2-2V3z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Monitor1);
export default ForwardRef;
