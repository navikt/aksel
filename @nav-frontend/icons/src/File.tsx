import * as React from "react";

function File(
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
        d="M21 24H3V0h11l7 7v17zM12 2H5v20h14V8h-7V2zm2 .83V6l3.17-.001L14 2.83z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(File);
export default ForwardRef;
