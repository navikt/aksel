import * as React from "react";

function Exclude(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 24a2 2 0 002-2H6l.005.15A2 2 0 008 24zm3-3v-2H5v2h6zm5-12.9C16 3.626 12.418 0 8 0S0 3.626 0 8.1a8.13 8.13 0 001.6 4.861l.217.305c.543.794 1.241 2.02 2.094 3.681L4.444 18h7.112c1.107-2.215 1.987-3.798 2.639-4.75l.392-.552A8.133 8.133 0 0016 8.1zM11 8a2 2 0 100-4 2 2 0 000 4z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Exclude);
export default ForwardRef;
