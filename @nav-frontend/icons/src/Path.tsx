import * as React from "react";

function Path(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.245.874l2.948 4.197a2.045 2.045 0 01-.505 2.854l-.842.587a1.022 1.022 0 00-.252 1.427l2.948 4.197a1.03 1.03 0 001.432.251l.842-.587a2.06 2.06 0 012.864.503l2.948 4.196a2.045 2.045 0 01-.505 2.854l-2.73 1.906a4.123 4.123 0 01-5.05-.258c-1.865-1.608-3.884-3.958-6.055-7.049C2.975 12.66 1.304 9.688.277 7.038a4.09 4.09 0 011.477-4.834L4.38.371a2.06 2.06 0 012.864.503z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Path);
export default ForwardRef;
