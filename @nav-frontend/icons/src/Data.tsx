import * as React from "react";

function Data(
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
        d="M13 2h-2v20h2V2zM9 1v21H7v-9a1 1 0 00-1-1H2a1 1 0 00-1 1v9H0v2h24v-2h-1V7a1 1 0 00-1-1h-4a1 1 0 00-1 1v15h-2V1a1 1 0 00-1-1h-4a1 1 0 00-1 1zm10 21h2V8h-2v14zM3 22v-8h2v8H3z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Data);
export default ForwardRef;
