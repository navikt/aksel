import * as React from "react";

function Eye(
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
        d="M12 5c4.418 0 8.418 2.333 12 7-3.582 4.667-7.582 7-12 7s-8.418-2.333-12-7c3.582-4.667 7.582-7 12-7zm-.217 2.005L12 7c-3.311 0-6.393 1.577-9.298 4.86l-.121.14.121.14c2.812 3.177 5.788 4.756 8.978 4.855L12 17a5 5 0 01-.217-9.995zm.537 0L12.002 7a5 5 0 01.217 9.995l-.217.005c3.309 0 6.39-1.577 9.296-4.86l.12-.14-.12-.14c-2.812-3.177-5.788-4.756-8.978-4.855zM12 9a3 3 0 100 6 3 3 0 000-6z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Eye);
export default ForwardRef;
