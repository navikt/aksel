import * as React from "react";

function Telephone(
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
        d="M9.245.874l2.948 4.197a2.045 2.045 0 01-.505 2.854l-.842.587a1.022 1.022 0 00-.252 1.427l2.948 4.197a1.03 1.03 0 001.432.251l.842-.587a2.06 2.06 0 012.864.503l2.948 4.196a2.045 2.045 0 01-.505 2.854l-2.73 1.906a4.123 4.123 0 01-5.05-.258c-1.865-1.608-3.884-3.958-6.055-7.049-2.313-3.292-3.984-6.264-5.011-8.914a4.09 4.09 0 011.477-4.834L6.38.371a2.06 2.06 0 012.864.503zM7.56 2.049L4.933 3.883A2.045 2.045 0 004.195 6.3c.961 2.48 2.553 5.31 4.777 8.477 2.082 2.963 3.995 5.19 5.717 6.674a2.062 2.062 0 002.377.223l.147-.094 2.73-1.905-2.948-4.197-.842.588a3.091 3.091 0 01-4.178-.6l-.117-.155-2.949-4.196A3.067 3.067 0 019.51 6.95l.157-.116.842-.588L7.56 2.049z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Telephone);
export default ForwardRef;
