import * as React from "react";

function HandbandageFill(
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
        d="M12.296 1.456a1.456 1.456 0 112.911 0V9h-2.911V1.456zm-3.882 1a1.456 1.456 0 012.911 0V9H8.414V2.456zM21.03 3a.97.97 0 00-.97.97V9H22V3.97a.97.97 0 00-.97-.97zm-4.852-.544a1.456 1.456 0 012.911 0V9h-2.911V2.456zM22 10H8.414v.813l2.836 2.093L22 15.5V10zM6.078 16.578l3.882-3.437-2.822-2.124a3.724 3.724 0 00-4.864.333.931.931 0 00-.01 1.31l3.814 3.918zm4.625-2.797l3.352.813-5.277 4.64-2.032-1.968 3.957-3.485zm4.489 1.094L22 16.5c-.485 1.5-2.426 2.5-2.426 2.5l-10.19 1 5.808-5.125zm4.868 5.063L9.384 21v3H20.06v-4.063z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(HandbandageFill);
export default ForwardRef;
