import * as React from "react";

function Delete1(
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
        d="M12 0a5.002 5.002 0 014.9 4H23v2h-2v14a4 4 0 01-4 4H7a4 4 0 01-4-4V6H1V4h6.1A5.002 5.002 0 0112 0zM9.669 4H9.17l.072-.183A3.002 3.002 0 0112 2l.176.005.203.019a2.994 2.994 0 012.374 1.783L14.83 4h-5.16zM10 9v10H8V9h2zm6 0v10h-2V9h2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Delete1);
export default ForwardRef;
