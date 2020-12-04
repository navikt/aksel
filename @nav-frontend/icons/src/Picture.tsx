import * as React from "react";

function Picture(
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
        d="M0 24V0h24v24H0zM22 2H2v20l4.5-9 3.5 7 6-12 6 12V2zm-6 10.471L11.235 22h9.529L16 12.471zm-9.5 5L4.235 22h4.529L6.5 17.471zM8.5 4a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm0 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Picture);
export default ForwardRef;
