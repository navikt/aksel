import * as React from "react";

function Customerservice1(
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
        d="M12 0c5.49 0 10.04 4.022 10.866 9.28.087.223.134.466.134.72v2a2 2 0 01-3.382 1.446 8.014 8.014 0 01-3.398 4.352A12.036 12.036 0 0122.824 24H1a12.04 12.04 0 016.713-6.245 8.016 8.016 0 01-3.333-4.31A2 2 0 011 12V9.999c0-.254.047-.497.134-.72C1.96 4.021 6.51 0 12 0zm0 5a6 6 0 00-5.988 6.39l3.5 1.273a2 2 0 11-.406 1.983l-2.435-.886A6 6 0 1012 5zm0-3a9.004 9.004 0 00-8.51 6.062c.341.086.647.258.893.493A7.999 7.999 0 0112 3a8.004 8.004 0 017.62 5.556c.243-.236.548-.41.888-.495A9 9 0 0012 2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Customerservice1);
export default ForwardRef;
