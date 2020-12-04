import * as React from "react";

function Money(
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
        d="M19 0a5 5 0 014.584 7H24v14H0V7h10a5 5 0 015-5l.063-.082A4.991 4.991 0 0119 0zm3 9c-.836.628-1.875 1-3 1l.033-.044a5.012 5.012 0 01-2.394 1.77c.098.103.182.223.253.36.12.234.18.525.18.873 0 .432-.095.787-.284 1.066-.157.233-.36.416-.607.551l-.154.075L17.36 17h-1.485l-1.125-2.115h-.729V17h-1.322v-5.56a5.02 5.02 0 01-2.281-2.438L2 9v10h20V9zM8.157 11.132v2.403h.036l1.746-2.403h1.458l-1.773 2.34L11.721 17h-1.449l-1.431-2.475-.684.9V17H6.834v-5.868h1.323zm6.547 1.053h-.684v1.647h.684c.348 0 .614-.074.797-.22.183-.148.274-.365.274-.653 0-.288-.091-.489-.274-.603-.152-.095-.362-.15-.63-.166l-.167-.005zM15 4a3 3 0 100 6 3 3 0 000-6zm4-2c-.643 0-1.238.202-1.726.546l.132.07a4.999 4.999 0 012.524 5.22l.124-.027-.042.016A3.001 3.001 0 0019 2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Money);
export default ForwardRef;
