import * as React from "react";

function Selection1(
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
        d="M15 3a3 3 0 10-6 0v10l-2.135-1.32c-1.092-.672-2.809-.838-3.964.32-1.203 1.206-1.206 2.951-.227 4.209L8.742 24H22.37l1.617-9.218c.185-2.644-1.67-4.977-4.23-5.317L15 9V3zm-3.993-.117A1 1 0 0112 2l.117.007A1 1 0 0113 3v7.814l2.411.236-5.914 10.666-5.245-6.736-.08-.112c-.317-.49-.267-1.043.145-1.455.346-.347 1.04-.348 1.547.002l.085.055L11 16.58V3l.007-.117z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Selection1);
export default ForwardRef;
