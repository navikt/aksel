import * as React from "react";

function Logout(
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
        d="M3 0a2 2 0 00-2 2v20a2 2 0 002 2h10a2 2 0 002-2v-3h-2v3H3V2h10v3h2V2a2 2 0 00-2-2H3zm14.375 6L23 12l-5.625 6L16 16.546 19.295 13H6v-2h13.295L16 7.455 17.375 6z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Logout);
export default ForwardRef;
