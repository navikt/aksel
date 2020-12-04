import * as React from "react";

function Cantine2(
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
        d="M6.395 4.642l1.432.948L8.98 4.32A4.06 4.06 0 0112 3a4.06 4.06 0 013.019 1.319l1.154 1.271 1.432-.948a2.874 2.874 0 011.595-.475c1.6 0 2.8 1.246 2.8 2.666 0 1.028-.617 1.954-1.576 2.4l-1.06.492L18.553 20H5.448L4.635 9.725l-1.06-.492C2.618 8.787 2 7.86 2 6.833c0-1.42 1.2-2.666 2.8-2.666.6 0 1.146.177 1.595.475zM3.6 22h16.8l.867-10.954C22.883 10.296 24 8.691 24 6.833c0-2.577-2.149-4.666-4.8-4.666a4.874 4.874 0 00-2.7.808A6.06 6.06 0 0012 1a6.06 6.06 0 00-4.5 1.975 4.874 4.874 0 00-2.7-.808C2.149 2.167 0 4.256 0 6.833c0 1.858 1.117 3.463 2.733 4.213L3.6 22zM17 10H7v2h10v-2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Cantine2);
export default ForwardRef;
