import * as React from "react";

function Externallink(
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
        d="M12 4v2H2v16h16V12h2v12H0V4h12zm12-4v9h-2V3.414L10.343 15.071 8.93 13.657 20.584 2H15V0h9z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Externallink);
export default ForwardRef;
