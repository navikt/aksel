import * as React from "react";

function Data1(
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
      <g fill="currentColor">
        <path d="M0 22h24v2H0z" />
        <path
          d="M2 13h4v6H2v-6zM10 1h4v18h-4V1zM18 7h4v12h-4V7z"
          stroke="currentColor"
          strokeWidth={2}
        />
      </g>
    </svg>
  );
}

const ForwardRef = React.forwardRef(Data1);
export default ForwardRef;
