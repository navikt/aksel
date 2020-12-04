import * as React from "react";

function Edit1(
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
        d="M22.835 6.788a3.976 3.976 0 10-5.623-5.623L15.895 2.48l5.624 5.624 1.316-1.317zm-2.73 2.73L8.073 21.55.682 24 0 23.318l2.45-7.392 12.03-12.03 5.625 5.623z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Edit1);
export default ForwardRef;
