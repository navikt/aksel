import * as React from "react";

function Folder1(
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
        d="M21 3v4h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V4a2 2 0 012-2h7.764a2 2 0 011.732 1H21zm-2 4V5h-6.5l1 2H19z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Folder1);
export default ForwardRef;
