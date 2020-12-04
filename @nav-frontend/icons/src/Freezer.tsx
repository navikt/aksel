import * as React from "react";

function Freezer(
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
        d="M18 2H6v7h2v4H6v9h12V2zM6 0a2 2 0 00-2 2v20a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H6zm8.498 3h-2v1.696l-1.438-.899L10 5.493 11.611 6.5 10 7.507l1.06 1.696 1.438-.899V10h2V8.304l1.438.899 1.06-1.696-1.61-1.007 1.61-1.007-1.06-1.696-1.438.899V3z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Freezer);
export default ForwardRef;
