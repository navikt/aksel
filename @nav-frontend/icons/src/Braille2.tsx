import * as React from "react";

function Braille2(
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
        d="M6 6a2 2 0 11-4 0 2 2 0 014 0zm15 0a1 1 0 11-2 0 1 1 0 012 0zM10 7a1 1 0 100-2 1 1 0 000 2zm-4 5a2 2 0 11-4 0 2 2 0 014 0zm14 1a1 1 0 100-2 1 1 0 000 2zm-8-1a2 2 0 11-4 0 2 2 0 014 0zm3 1a1 1 0 100-2 1 1 0 000 2zM5 18a1 1 0 11-2 0 1 1 0 012 0zm15 2a2 2 0 100-4 2 2 0 000 4z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Braille2);
export default ForwardRef;
