import * as React from "react";

function Pregnant1(
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
        d="M15 0a4 4 0 011.936 7.501A3.991 3.991 0 0119 11v13h-7a6 6 0 01-1-11.917V11c0-1.507.833-2.82 2.065-3.501A4 4 0 0115 0zm-1.413 16.337l-.055-.05a1.163 1.163 0 00-1.48-.041l-.052.042-.053-.042-.058-.042a1.167 1.167 0 00-1.527.184 1.37 1.37 0 00-.362.934c0 .367.142.722.395.995l.403.43L12 20l1.041-1.083.564-.6c.253-.274.396-.628.395-.996 0-.35-.13-.682-.362-.933l-.05-.052zM13 4a2 2 0 114 0 2 2 0 01-4 0z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Pregnant1);
export default ForwardRef;
