import * as React from "react";

function Helmet(
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
        d="M7.565 4.65A3 3 0 0110.493 1h3.014a3 3 0 012.928 3.65l-.056.256A11.003 11.003 0 0123 15v2.8c.643.367 1 .773 1 1.2 0 1.657-5.373 3-12 3S0 20.657 0 19c0-.427.357-.833 1-1.2V15c0-4.519 2.725-8.401 6.621-10.094l-.056-.255zM3 17.017V19c.107.032.316.065.524.097.182.028.364.056.476.084 1.971.493 4.8.819 8 .819s6.029-.326 8-.819c.24-.06 1-.181 1-.181v-4a9 9 0 00-5.065-8.097l-.737 3.314-1.952-.434 1.237-5.566A1 1 0 0013.507 3h-3.014a1 1 0 00-.976 1.217l1.237 5.566-1.952.434-.737-3.314A9 9 0 003 15v2.016z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Helmet);
export default ForwardRef;
