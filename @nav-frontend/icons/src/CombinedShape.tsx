import * as React from "react";

function CombinedShape(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0h24v4H0V0zm0 9h24v4H0V9zm24 9H0v4h24v-4z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(CombinedShape);
export default ForwardRef;
