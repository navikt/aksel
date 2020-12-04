import * as React from "react";

function Volumeup3(
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
        d="M17.293 7.753a1 1 0 011.414 0 6 6 0 010 8.484 1 1 0 11-1.414-1.414 4 4 0 000-5.656 1 1 0 010-1.414z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.753 5.293a1 1 0 011.414 0 9.487 9.487 0 010 13.414 1 1 0 11-1.414-1.414 7.486 7.486 0 000-10.586 1 1 0 010-1.414zM12.658 2.086c.32.15.524.47.524.823v18.182a.91.91 0 01-1.491.698l-6.566-5.47H.91a.91.91 0 01-.909-.91V8.591a.91.91 0 01.91-.91h4.215l6.566-5.47a.91.91 0 01.967-.125zM11.364 4.85L6.037 9.29a.909.909 0 01-.582.21H1.818v5h3.637a.91.91 0 01.582.21l5.327 4.44V4.85z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Volumeup3);
export default ForwardRef;
