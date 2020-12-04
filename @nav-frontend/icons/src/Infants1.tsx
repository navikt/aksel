import * as React from "react";

function Infants1(
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
        d="M20 8A8 8 0 104 8v8a8 8 0 0010.261 7.676v-1.539l-.001-.005v-7.208c0-.55-.327-.978-1.153-1.343l-.044-.018s.687-.141 1.25-.344a6.466 6.466 0 001.046-.5c.54.549.85 1.22.895 2.003l.006.202v6.124l.001-.001v1.725A7.994 7.994 0 0020 16V8zM7 7c0-2.969 2-5 5-5s5 2 5 5-2 5-5 5-5-2.031-5-5zm4 0a1 1 0 10-2 0 1 1 0 002 0zm4 0a1 1 0 10-2 0 1 1 0 002 0z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Infants1);
export default ForwardRef;
