import * as React from "react";

function Email1(
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
        d="M24 3v18H0V3h24zM2 19h20V8.683l-10 5.456L2 8.684V19z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Email1);
export default ForwardRef;
