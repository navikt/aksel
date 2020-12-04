import * as React from "react";

function Bookmark(
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
        d="M12 18l7 6V2a2 2 0 00-2-2H7a2 2 0 00-2 2v22l7-6zm-5 1.652l5-4.286 5 4.286V2H7v17.652z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Bookmark);
export default ForwardRef;
