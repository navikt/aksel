import * as React from "react";

function Save2(
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
        d="M14 14l6-5.625L18.546 7 15 10.295V0h-2v10.295L9.455 7 8 8.375 14 14zM5.521 24a2 2 0 01-1.872-1.296L0 14.352l.004-.209C.024 13.71.158 13 1 13l3-.001v-3.11C4 8.846 4.895 8 6 8h1v2H6v2.999L8.586 13a1 1 0 01.707.293L12 16h8.182a1 1 0 01.93.635L22 18.9V9.833h-1v-2h1c1.105 0 2 .846 2 1.89v13.269C24 23.5 23.496 24 23 24H5.521zm2.65-9H2.5l3.021 7h15.546l-1.568-4h-8.327L8.17 15z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Save2);
export default ForwardRef;
