import * as React from "react";

function Female1(
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
        d="M16 9c0-1.968-2.343-3-4-3a3 3 0 100-6 3 3 0 000 6c-1.657 0-4 1-4 3v3l-2.403 5.606A1 1 0 006.517 19H9v5h2v-5.125h2V24h2v-5h2.483a.998.998 0 00.92-1.394L16 12V9zm-5-6a1 1 0 112 0 1 1 0 01-2 0z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Female1);
export default ForwardRef;
