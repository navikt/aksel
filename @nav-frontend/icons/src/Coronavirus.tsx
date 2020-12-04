import * as React from "react";

function Coronavirus(
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
        d="M2 15H0V9h2l-.001 2h1.056a8.957 8.957 0 011.913-4.617L4 5.414l-.707.707-1.414-1.414L4.707 1.88l1.414 1.414L5.414 4l.969.968A8.957 8.957 0 0111 3.055V2H9V0h6v2h-2v1.055a8.958 8.958 0 014.617 1.913L18.586 4l-.707-.707 1.414-1.414 2.828 2.828-1.414 1.414L20 5.414l-.968.969A8.957 8.957 0 0120.945 11H22V9h2v6h-2v-2h-1.055a8.958 8.958 0 01-1.967 4.685l.961.961.768-.767 1.414 1.414-2.828 2.828-1.414-1.414.646-.647-.975-.974A8.956 8.956 0 0113 20.945V22h2v2H9v-2h2v-1.055a8.956 8.956 0 01-4.55-1.86l-.976.975.647.647-1.414 1.414-2.828-2.828 1.414-1.414.767.767.962-.961A8.958 8.958 0 013.055 13L2 13v2zM12 5a7 7 0 100 14 7 7 0 000-14zm-2 10a1 1 0 110 2 1 1 0 010-2zm5-1a1 1 0 110 2 1 1 0 010-2zm-5-7a3 3 0 110 6 3 3 0 010-6zm6 2a1 1 0 110 2 1 1 0 010-2zm-6 0a1 1 0 100 2 1 1 0 000-2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Coronavirus);
export default ForwardRef;
