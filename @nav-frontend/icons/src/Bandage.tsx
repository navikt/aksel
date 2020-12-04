import * as React from "react";

function Bandage(
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
        d="M2.621 2.621C5.151.091 8.445-.738 10.082.711l.114.107 12.986 12.986c1.594 1.593.787 4.985-1.803 7.575-2.53 2.53-5.824 3.359-7.461 1.91l-.114-.107L.818 10.196l-.108-.114C-.738 8.445.092 5.151 2.621 2.622zM20.04 13.34l-6.7 6.7 1.763 1.762.071.069c.725.64 2.964.07 4.866-1.832 1.884-1.884 2.45-4.073 1.864-4.827l-.06-.069-1.804-1.803zM12 5.3L5.3 12l6.7 6.7 6.7-6.7L12 5.3zm-.67 8.71a.948.948 0 111.34 1.34.948.948 0 01-1.34-1.34zm2.68-2.68a.947.947 0 111.34 1.34.947.947 0 01-1.34-1.34zm-5.36 0a.947.947 0 111.34 1.34.947.947 0 01-1.34-1.34zm2.68-2.68a.947.947 0 111.34 1.34.947.947 0 01-1.34-1.34zM3.961 3.961c-1.84 1.84-2.434 3.997-1.925 4.752l.054.071.067.073 1.804 1.803 6.7-6.699-1.763-1.763-.071-.068c-.725-.642-2.964-.071-4.866 1.831z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Bandage);
export default ForwardRef;
