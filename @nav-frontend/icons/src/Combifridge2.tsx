import * as React from "react";

function Combifridge2(
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
        d="M6 2h12v9H8V9H6V2zM4 13V2a2 2 0 012-2h12a2 2 0 012 2v20a2 2 0 01-2 2H6a2 2 0 01-2-2v-9zm14 0v9H6v-7h2v-2h10zm-3.502 1h-2v1.696l-1.438-.899L10 16.493l1.611 1.007L10 18.507l1.06 1.696 1.438-.899V21h2v-1.696l1.438.899 1.06-1.696-1.61-1.007 1.61-1.007-1.06-1.696-1.438.899V14zm.787-7.13L13.498 3l-1.786 3.87c-.665 1.438.301 3.13 1.786 3.13s2.45-1.692 1.787-3.13z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Combifridge2);
export default ForwardRef;
