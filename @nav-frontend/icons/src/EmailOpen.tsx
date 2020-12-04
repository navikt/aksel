import * as React from "react";

function Emailopen(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 .363L24 7v18H0V7L12 .363zm1.798 16.795L12 18.139l-1.798-.981L3.629 23H20.37l-6.572-5.842zM22 12.683l-6.337 3.457L22 21.773v-9.09zm-20 .001v9.088l6.336-5.632L2 12.684zM12 2.637L2 8.054v2.353l10 5.454 10-5.455V8.054L12 2.637z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Emailopen);
export default ForwardRef;
