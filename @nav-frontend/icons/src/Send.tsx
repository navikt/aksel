import * as React from "react";

function Send(
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
        d="M0 1l24 11L0 23l3-11L0 1zm3.055 3.6L4.8 11H13v2H4.8l-1.745 6.399L19.199 12 3.055 4.6z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Send);
export default ForwardRef;
