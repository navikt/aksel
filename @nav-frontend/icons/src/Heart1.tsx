import * as React from "react";

function Heart1(
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
        d="M17 1c3.866 0 7 3.283 7 7.333a7.486 7.486 0 01-2.103 5.24l.103-.002L12 23 2 13.571l.103.002A7.486 7.486 0 010 8.333C0 4.283 3.134 1 7 1c1.959 0 3.73.843 5 2.202C13.27 1.843 15.042 1 17 1z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Heart1);
export default ForwardRef;
