import * as React from "react";

function Bandagefill(
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
        d="M10.082.71C8.445-.738 5.151.092 2.622 2.621.091 5.151-.739 8.445.71 10.082l.108.114.796.797 9.379-9.38-.797-.795-.114-.108zm2.325 2.318l-9.379 9.379 8.586 8.586 9.379-9.38-8.586-8.585zm10 10l-9.379 9.379.776.775.114.108c1.637 1.448 4.931.619 7.46-1.911 2.59-2.59 3.398-5.982 1.804-7.575l-.775-.776zm-9.737.982a.948.948 0 10-1.34 1.34.948.948 0 001.34-1.34zm2.68-2.68a.947.947 0 10-1.34 1.34.947.947 0 001.34-1.34zm-5.36 0a.947.947 0 10-1.34 1.34.947.947 0 001.34-1.34zm2.68-2.68a.947.947 0 10-1.34 1.34.947.947 0 001.34-1.34z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Bandagefill);
export default ForwardRef;
