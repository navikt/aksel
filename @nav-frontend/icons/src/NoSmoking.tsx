import * as React from "react";

function Nosmoking(
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
        d="M18 1.788c0 1.09.635 2.08 1.624 2.534V4.32a4.789 4.789 0 012.845 4.376V11h-2V8.697c0-1.09-.636-2.08-1.625-2.534A4.789 4.789 0 0116 1.789V0h2v1.788zM15.385 13L18 10.385 16.615 9l-4 4h-3.23l-4-4L4 10.385 6.615 13H0v6h6.615L4 21.615 5.385 23l4-4h3.23l4 4L18 21.615 15.385 19H22a2 2 0 002-2v-2a2 2 0 00-2-2h-6.615zm-6.77 2H2v2h6.615l1-1-1-1zm4.77 2l-1-1 1-1H19v2h-5.615zM22 17h-1v-2h1v2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Nosmoking);
export default ForwardRef;
