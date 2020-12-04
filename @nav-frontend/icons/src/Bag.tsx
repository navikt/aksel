import * as React from "react";

function Bag(
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
        d="M15 1a2 2 0 012 2v2h5a2 2 0 012 2v5c0 1.014-.518 1.465-.999 2L23 21a2 2 0 01-2 2H3a2 2 0 01-2-2v-7c-.537-.51-1-.986-1-2V7a2 2 0 012-2h5V3a2 2 0 012-2h6zm-4 14H3v6h18v-6h-8v2h-2v-2zm11-8H2v4a2 2 0 001.85 1.995L4 13h16a2 2 0 001.994-1.85L22 11V7zm-7-4H9v2h6V3z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Bag);
export default ForwardRef;
