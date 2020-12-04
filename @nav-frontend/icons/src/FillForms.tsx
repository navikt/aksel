import * as React from "react";

function Fillforms(
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
        d="M22.788.808c1.454 1.245 1.624 3.482.378 4.996L18.07 12 24 12v12H0V12l9.092-.001 8.806-10.704c1.246-1.514 3.435-1.732 4.89-.487zm-6.364 13.191l-2.28 2.772L7 20l1.455-6.001L2 14v8h20v-8l-5.576-.001zm.312-8.174l-6.061 7.368-.805 3.317 3.063-1.385 6.079-7.39-2.276-1.91zm2.763-3.348l-.096.107-1.396 1.696 2.276 1.91 1.378-1.674c.523-.636.486-1.538-.039-2.08l-.097-.093c-.583-.498-1.463-.441-2.026.134z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Fillforms);
export default ForwardRef;
