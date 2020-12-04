import * as React from "react";

function VideoRoom(
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
        d="M2 5h20v14H2V5zM0 5a2 2 0 012-2h20a2 2 0 012 2v14a2 2 0 01-2 2H2a2 2 0 01-2-2V5zm8 2l9 5-9 5V7zm2 3.399L12.882 12 10 13.601v-3.202z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(VideoRoom);
export default ForwardRef;
