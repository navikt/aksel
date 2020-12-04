import * as React from "react";

function Female(
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
        d="M12 6c1.657 0 4 1.032 4 3v3l2.403 5.606a1 1 0 01-.92 1.394H15v5h-2v-7h2.967L14 12.41V9c0-.285-.596-1-2-1s-2 .706-2 1v3.41L8.032 17H11v7H9v-5H6.517a1 1 0 01-.92-1.394L8 12V9c0-2 2.343-3 4-3zm0-6a3 3 0 110 6 3 3 0 010-6zm0 2a1 1 0 100 2 1 1 0 000-2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Female);
export default ForwardRef;
