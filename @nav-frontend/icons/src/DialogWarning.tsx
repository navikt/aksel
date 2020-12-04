import * as React from "react";

function Dialogwarning(
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
        d="M0 4a4 4 0 014-4h16a4 4 0 014 4v11a4 4 0 01-4 4H7l-7 5V4zm21.994-.15A2 2 0 0020 2l-16.15.005A2 2 0 002 4v16l4-3h14c1.035-.076 2-.946 2-2l-.006-11.15zM10.5 13.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM11 4h2v6h-2V4z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Dialogwarning);
export default ForwardRef;
