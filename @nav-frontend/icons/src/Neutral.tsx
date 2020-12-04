import * as React from "react";

function Neutral(
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
        d="M12 3a1 1 0 11-2 0 1 1 0 012 0zm0 2.83a3.001 3.001 0 10-2 0v.041H8c-1.105 0-2 .902-2 2.014v6.043l2 3.022V24h2v-7h2v7h2.189v-5.037h2.717c.148 0 .294-.028.43-.081.556-.22.813-.812.575-1.323l-2.628-5.648V8.89c0-1.6-1.67-2.585-3.267-2.906v2.05c.747.227 1.079.652 1.079.856v3.436l2.151 4.623H12V5.83zM8 7.884h2v9.065l-2-3.27V7.886z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Neutral);
export default ForwardRef;
