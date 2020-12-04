import * as React from "react";

function Home1(
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
        d="M12 0l10 10v14h-8v-8h-4v8H2V10L12 0z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Home1);
export default ForwardRef;
