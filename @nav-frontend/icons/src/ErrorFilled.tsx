import * as React from "react";

function ErrorFilled(
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
        d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm3.571 7L17 8.429 13.428 12 17 15.571 15.571 17 12 13.428 8.429 17 7 15.571 10.572 12 7 8.429 8.429 7 12 10.572 15.571 7z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(ErrorFilled);
export default ForwardRef;
