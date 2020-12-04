import * as React from "react";

function Bell(
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
        d="M11 0h2v3.075a6.64 6.64 0 015.608 5.933l.127 1.36c.134 1.476.217 2.557.25 3.245L19 14c.025 1.082.746 2.922 2.165 5.52a1 1 0 01-.878 1.48h-4.413a4.002 4.002 0 01-7.748 0H3.882a1 1 0 01-.85-1.528C4.319 17.405 4.975 15.582 5 14c.018-1.106.132-2.756.342-4.95A6.69 6.69 0 0111 3.075V0zm-.732 21a2 2 0 003.464 0h-3.464zM12 5a4.688 4.688 0 00-4.667 4.241l-.105 1.15a68.325 68.325 0 00-.209 2.996l-.02.646c-.023 1.438-.434 2.961-1.21 4.582L5.598 19h13.036l-.105-.212c-.937-1.907-1.446-3.39-1.52-4.552l-.03-.697c-.048-.86-.169-2.317-.362-4.341A4.638 4.638 0 0012 5z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Bell);
export default ForwardRef;
