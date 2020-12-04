import * as React from "react";

function Mute4(
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
        d="M12.658 2.086c.32.15.524.47.524.823v18.182a.91.91 0 01-1.491.698l-6.566-5.47H.91a.91.91 0 01-.909-.91V8.591a.91.91 0 01.91-.91h4.215l6.566-5.47a.91.91 0 01.967-.125zM11.364 4.85L6.037 9.29a.909.909 0 01-.582.21H1.818v5h3.637a.91.91 0 01.582.21l5.327 4.44V4.85zM23.707 8.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.293 8.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Mute4);
export default ForwardRef;
