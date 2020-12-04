import * as React from "react";

function Car(
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
        d="M19.517 11H4.483a2 2 0 00-1.987 2.227l.229 2A2 2 0 004.712 17h14.576a2 2 0 001.987-1.773l.229-2A2 2 0 0019.517 11zm-.947-6.109l1.66 4.172a4.001 4.001 0 013.26 4.391l-.228 2A4.001 4.001 0 0120 18.937V20.5a1.5 1.5 0 01-3 0V19H7v1.5a1.5 1.5 0 01-3 0v-1.563a4.001 4.001 0 01-3.262-3.483l-.229-2A4.001 4.001 0 013.77 9.063l1.66-4.172A3 3 0 018.217 3h7.566a3 3 0 012.787 1.891zM18.052 9l-1.34-3.37a1 1 0 00-.93-.63H8.218a1 1 0 00-.929.63L5.948 9h12.104zM7 14a1 1 0 11-2 0 1 1 0 012 0zm11 1a1 1 0 100-2 1 1 0 000 2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Car);
export default ForwardRef;
