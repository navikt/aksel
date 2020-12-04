import * as React from "react";

function Pensionsaving1(
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
        d="M17.34 1.372A1 1 0 0016.247.014l-2.932.489a8 8 0 01-2.63 0L7.753.014A1 1 0 006.66 1.372l1.12 2.802A8.508 8.508 0 0112.106 3c1.503 0 2.92.39 4.153 1.076l1.082-2.704zM12.105 5a8.543 8.543 0 00-8.531 8.094l-.26 4.942A3.99 3.99 0 002 21a3 3 0 003 3h14.152c.296 0 .578-.06.834-.166A3.001 3.001 0 0022 21c0-.982-.354-1.88-.94-2.577l-.439-5.552A8.543 8.543 0 0012.105 5zM9 20V9.568h3.084a7.08 7.08 0 011.616.176c.442.094.657.25.958.469l.126.091c.373.256.667.603.88 1.04.224.427.336.955.336 1.584 0 .608-.112 1.136-.336 1.584a2.997 2.997 0 01-.88 1.104l-.174.138c-.275.219-.485.386-.894.502a5.74 5.74 0 01-1.568.208H11V20H9zm2-5.408h1.004c1.28 0 1.92-.555 1.92-1.664 0-.544-.17-.928-.512-1.152-.341-.224-.832-.336-1.472-.336H11v3.152z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Pensionsaving1);
export default ForwardRef;
