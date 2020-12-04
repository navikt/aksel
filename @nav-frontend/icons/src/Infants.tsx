import * as React from "react";

function Infants(
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
        d="M12 0a8 8 0 018 8v8a8 8 0 11-16 0V8a8 8 0 018-8zM6.02 7.5l-.004.052c-.005.074-.01.148-.012.223L6 8v8a6 6 0 007.999 5.66v-7.31c0-.551-.328-.978-1.154-1.343l-.12-.05A6 6 0 016.02 7.5zm11.96 0l-.017.168a6 6 0 01-2.868 4.473c.543.55.853 1.223.898 2.006l.006.202v6.124a5.985 5.985 0 001.997-4.248L18 16V8c0-.169-.007-.336-.02-.5zM12 3a4 4 0 100 8 4 4 0 000-8zm-2 3a1 1 0 110 2 1 1 0 010-2zm4 0a1 1 0 110 2 1 1 0 010-2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Infants);
export default ForwardRef;
