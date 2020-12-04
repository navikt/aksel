import * as React from "react";

function Man(
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
        d="M15 0a4 4 0 014 4v6a6.993 6.993 0 01-3.08 5.8 10.003 10.003 0 016.03 8.2h-2.012a8.007 8.007 0 00-6.233-6.818L13 20l.666 4h-3.334L11 20l-.705-2.818A8.007 8.007 0 004.062 24H2.049a10.008 10.008 0 016.03-8.202A6.989 6.989 0 015 10V4a4 4 0 014-4h6zm-4.785 5.143L6.999 7.977 7 10a5 5 0 009.995.217L17 10V7.618l-6.785-2.475zM15 2H9a2 2 0 00-1.995 1.85L7 4v1.311l2.785-2.454 7.214 2.632L17 4a2 2 0 00-1.85-1.995L15 2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Man);
export default ForwardRef;
