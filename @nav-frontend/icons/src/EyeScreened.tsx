import * as React from "react";

function Eyescreened(
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
        d="M20.414 2.172l1.414 1.414-3.295 3.294C20.453 8.046 22.275 9.752 24 12c-3.582 4.667-7.582 7-12 7-1.608 0-3.16-.309-4.657-.927l-3.757 3.755-1.414-1.414 3.295-3.294C3.547 15.954 1.725 14.248 0 12c3.582-4.667 7.582-7 12-7 1.608 0 3.16.309 4.657.927l3.757-3.755zm-8.63 4.833L12 7c-3.311 0-6.393 1.577-9.298 4.86l-.121.14.121.14c2.812 3.177 5.788 4.756 8.978 4.855L12 17a5 5 0 01-.217-9.995zm.536 0L12.002 7a5 5 0 01.217 9.995l-.217.005c3.309 0 6.39-1.577 9.296-4.86l.12-.14-.12-.14c-2.812-3.177-5.788-4.756-8.978-4.855zm2.388 3.702l-4.002 4a3 3 0 004.001-4.001zM12 9a3 3 0 00-2.708 4.293l4-4.001A2.988 2.988 0 0012 9z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Eyescreened);
export default ForwardRef;
