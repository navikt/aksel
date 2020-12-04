import * as React from "react";

function Dialogsuccess1(
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
        d="M20 0a4 4 0 013.995 3.8L24 4v11a4 4 0 01-3.8 3.995L20 19H7l-7 5V4A4 4 0 013.8.005L4 0h16zm-2.953 5l1.399 1.43-8.728 8.398L6 11.347l1.395-1.433 2.319 2.118L17.047 5z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Dialogsuccess1);
export default ForwardRef;
