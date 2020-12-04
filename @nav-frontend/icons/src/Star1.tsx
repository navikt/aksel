import * as React from "react";

function Star1(
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
        d="M12 0l3.708 7.571L24 8.785l-6 5.893L19.416 23 12 19.071 4.584 23 6 14.678 0 8.785l8.292-1.214L12 0z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Star1);
export default ForwardRef;
