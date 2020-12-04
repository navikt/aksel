import * as React from "react";

function Upload(
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
        d="M3 17v3a2 2 0 001.85 1.994L5 22h14a2 2 0 001.994-1.85L21 20v-3h2v3a4 4 0 01-4 4H5a4 4 0 01-4-4v-3h2zm9-17l7 6.625L17.546 8 13 3.705V17h-2V3.705L6.455 8 5 6.625 12 0z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Upload);
export default ForwardRef;
