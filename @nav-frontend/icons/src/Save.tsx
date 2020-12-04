import * as React from "react";

function Save(
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
        d="M8 2.75v2.186a9 9 0 108.001 0V2.75C20.098 4.35 23 8.336 23 13c0 6.075-4.925 11-11 11S1 19.075 1 13C1 8.44 3.775 4.527 7.729 2.86L8 2.75zM13 0v14.295L17.546 10 19 11.375 12 18l-7-6.625L6.455 10 11 14.295V0h2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Save);
export default ForwardRef;
