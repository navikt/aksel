import * as React from "react";

function Hanger1(
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
        d="M16 3.693C16 1.657 14.205 0 12 0 9.793 0 8 1.657 8 3.693h1.991l.006-.145c.08-.955.948-1.71 2.002-1.71 1.109 0 2.01.832 2.01 1.855 0 .495-.21.961-.59 1.312l-.74.679c-.745.703-1.495 1.544-1.647 2.607l-3.818 1.16a4.972 4.972 0 01-.172-.799l-4.307 1.436A4 4 0 000 13.883V24h4v-6h2v6h12v-6h2v6h4V13.883a4 4 0 00-2.735-3.795l-4.307-1.436c-.036.274-.093.54-.171.798l-3.728-1.13c.137-.402.48-.802.882-1.195l.294-.28.593-.54C15.584 5.607 16 4.679 16 3.693zm-7.805 7.55L12 10.09l3.806 1.153A4.989 4.989 0 0112 13a4.989 4.989 0 01-3.805-1.757z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Hanger1);
export default ForwardRef;
