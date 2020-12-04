import * as React from "react";

function Pregnant(
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
        d="M15 0a4 4 0 011.936 7.501A3.991 3.991 0 0119 11v13h-2V11a2 2 0 00-1.85-1.995L15 9a2 2 0 00-1.995 1.85L13 11v3h-1a4 4 0 000 8v2a6 6 0 01-1-11.917V11c0-1.507.833-2.82 2.065-3.501A4 4 0 0115 0zm-1.468 16.287l.055.05.051.051c.232.25.361.583.362.933 0 .368-.142.722-.395.996l-.564.6L12 20l-1.202-1.253-.403-.43a1.465 1.465 0 01-.395-.995c0-.35.13-.683.362-.934a1.167 1.167 0 011.527-.184l.059.042.052.042.052-.042a1.163 1.163 0 011.48.04zM15 2a2 2 0 100 4 2 2 0 000-4z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Pregnant);
export default ForwardRef;
