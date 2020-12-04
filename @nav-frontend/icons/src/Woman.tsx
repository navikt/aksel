import * as React from "react";

function Woman(
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
        d="M12.024 0c3.604 0 6.727 2.5 7.515 6.017L22 17h-2.858A9.967 9.967 0 0122 24h-2a8 8 0 10-16 0H2a9.968 9.968 0 012.858-7H2L4.493 6.014A7.723 7.723 0 0112.023 0zm4.074 14.676l-.176.123c.149.063.296.13.44.2l3.14.001-.852-3.808a7.015 7.015 0 01-2.552 3.484zM5.36 11.223L4.504 15h3.133c.145-.071.292-.138.44-.201a7.018 7.018 0 01-2.717-3.576zm6.642-5.857L7 8.546V9a5 5 0 009.995.217L17 9v-.489l-4.998-3.145zM12.024 2a5.723 5.723 0 00-5.522 4.222l-.059.234-.02.087L11.997 3l5.606 3.527-.016-.072a5.702 5.702 0 00-5.322-4.45L12.024 2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Woman);
export default ForwardRef;
