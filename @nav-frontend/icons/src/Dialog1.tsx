import * as React from "react";

function Dialog1(
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
        d="M20 5a4 4 0 014 4v15l-5.25-3H8a4 4 0 01-4-4V9a4 4 0 014-4h12zm-6-5a4 4 0 013.995 3.8L18 5h-2l-.005-1.15a2 2 0 00-1.838-1.844L14 2H4l-.15.005a2 2 0 00-1.844 1.838L2 4v10.553l2-1.143v2.304L0 18V4A4 4 0 013.8.005L4 0h10zm-4 12a1 1 0 110 2 1 1 0 010-2zm4 0a1 1 0 110 2 1 1 0 010-2zm4 0a1 1 0 110 2 1 1 0 010-2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Dialog1);
export default ForwardRef;
