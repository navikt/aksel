import * as React from "react";

function ForkSpoonKnife(
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
        d="M1 0a1 1 0 011 1v7a2 2 0 104 0V1a1 1 0 012 0v7a4.002 4.002 0 01-3 3.874V24H3V11.874A4.002 4.002 0 010 8V1a1 1 0 011-1zm2 1a1 1 0 012 0v6H3V1zm12 6c0 2.267-1.234 3-2 3s-2-.733-2-3c0-1.507.235-2.929.687-3.895C12.11 2.197 12.54 2 13 2c.46 0 .889.197 1.313 1.105C14.765 4.07 15 5.493 15 7zm-1 4.857c1.725-.507 3-2.326 3-4.857 0-3.314-1-7-4-7S9 3.686 9 7c0 2.531 1.275 4.35 3 4.857V24h2V11.857zM22.006.543L22 .545a6.712 6.712 0 00-4 6.14v4.427c0 1.446.87 2.75 2.204 3.306l1.796.749V24h2V.396a.336.336 0 00-.39-.33 6.73 6.73 0 00-1.604.476zM22 2.832V13l-1.027-.428a1.582 1.582 0 01-.973-1.46V6.685a4.71 4.71 0 012-3.853z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(ForkSpoonKnife);
export default ForwardRef;
