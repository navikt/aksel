import * as React from "react";

function Baby1(
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
        d="M13.001 2.071L13 0h-2v2.07a6.957 6.957 0 00-.999.22L9.303.723l-1.827.813.709 1.594A6.994 6.994 0 005 9a6.994 6.994 0 003.55 6.09A5.993 5.993 0 006 20v4h12v-4a5.99 5.99 0 00-2.55-4.908A6.997 6.997 0 0019 9a6.994 6.994 0 00-3.185-5.87l.709-1.594-1.827-.813-.698 1.567a6.96 6.96 0 00-.998-.219zM8.846 17.54A3.993 3.993 0 0112 16l.2.005a3.99 3.99 0 012.954 1.536c-.639 1.174-1.812 1.96-3.154 1.96-1.342 0-2.515-.787-3.154-1.961zM7 9a5 5 0 1110 0A5 5 0 017 9zm4 0a1 1 0 10-2 0 1 1 0 002 0zm4 0a1 1 0 10-2 0 1 1 0 002 0z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Baby1);
export default ForwardRef;
