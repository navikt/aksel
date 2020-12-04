import * as React from "react";

function Mute3(
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
        d="M13.182 6.576V2.909a.91.91 0 00-1.491-.698L5.125 7.68H.91a.91.91 0 00-.909.91v6.818c0 .502.407.91.91.91h2.53L5.256 14.5H1.818v-5h3.637a.909.909 0 00.582-.21l5.327-4.44v3.544l1.818-1.818zm0 8.485l-1.818 1.818v2.271l-1.24-1.032-1.29 1.29 2.857 2.381a.91.91 0 001.49-.698v-6.03zM18.04 10.203a4 4 0 01-.747 4.62 1 1 0 101.414 1.414 6 6 0 00.797-7.498l-1.464 1.464z"
        fill="currentColor"
      />
      <path
        d="M23 1L1 23"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Mute3);
export default ForwardRef;
