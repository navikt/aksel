import * as React from "react";

function Home(
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
        d="M12 0l10 10v14h-9v-6h-2v6H2V10L12 0zm0 2.829l-8 7.999V22h5v-6h6v6h5V10.829l-8-8z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Home);
export default ForwardRef;
