import * as React from "react";

function Filecontent1(
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
        d="M14 0l7 7v17H3V0h11zm1 17v2H7v-2h8zm2-4v2H7v-2h10zm-4-4v2H7V9h6zm1-6.17V6l3.17-.001L14 2.83z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Filecontent1);
export default ForwardRef;
