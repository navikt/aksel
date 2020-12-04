import * as React from "react";

function Baby(
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
        d="M13 0l.001 2.071c.341.049.675.122.998.219l.698-1.567 1.827.813-.709 1.594A6.994 6.994 0 0119 9a6.997 6.997 0 01-3.55 6.092A5.99 5.99 0 0118 20v4h-2v-4c0-.122-.005-.244-.016-.363C14.982 20.785 13.568 21.5 12 21.5s-2.982-.716-3.983-1.864l-.012.163L8 20v4H6v-4a5.993 5.993 0 012.55-4.91A6.994 6.994 0 015 9a6.994 6.994 0 013.185-5.87l-.709-1.594L9.303.723l.698 1.567c.324-.097.657-.17.999-.22V0h2zm-1 16a3.993 3.993 0 00-3.154 1.54c.64 1.175 1.812 1.96 3.154 1.96 1.342 0 2.515-.785 3.154-1.959a3.99 3.99 0 00-2.954-1.536L12 16zm0-12a5 5 0 100 10 5 5 0 000-10zm-2 4a1 1 0 110 2 1 1 0 010-2zm4 0a1 1 0 110 2 1 1 0 010-2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Baby);
export default ForwardRef;
