import * as React from "react";

function Recycle2(
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
        d="M7.273 4.063L8.48 2c1.565-2.667 5.477-2.667 7.043 0l2.944 5.018 2.201-1.25-.031 6.946-6.13-3.446 2.2-1.25L13.762 3c-.783-1.333-2.739-1.333-3.521 0L9.048 5.032l-1.775-.97zM4.072 21.463h2.375v-2H4.072c-1.565 0-2.543-1.666-1.76-3l2.944-5.018 2.2 1.25-.03-6.946-6.131 3.446 2.2 1.25-2.944 5.018c-1.565 2.667.391 6 3.52 6zM23.449 15.5l-1.216-2.094-1.737 1.062 1.193 2.032c.782 1.333-.196 3-1.761 3h-5.89V17L7.94 20.5l6.098 3.5v-2.5h5.89c3.13 0 5.086-3.334 3.521-6z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Recycle2);
export default ForwardRef;
