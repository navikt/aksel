import * as React from "react";

function Law(
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
        d="M12 19a2 2 0 012 2v3H0v-3a2 2 0 012-2h10zm0 2H2v1h10v-1zm-.065-21l8.517 8.516-2.84 2.839a1.004 1.004 0 01-1.418 0l-.71-.71-.71.71L24 20.58 22.58 22l-9.225-9.226-.71.71.71.71a1.004 1.004 0 010 1.419l-2.839 2.839L2 9.935l2.839-2.838a1.004 1.004 0 011.42 0l.709.71 2.838-2.84-.71-.709a1.004 1.004 0 010-1.42L11.937 0zM5.548 9.226l-.71.71 5.678 5.677.71-.71-5.678-5.677zm5.678-2.839L8.387 9.226l2.839 2.838 2.838-2.838-2.838-2.839zm.71-3.548l-.71.71 5.677 5.677.71-.71-5.678-5.677z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Law);
export default ForwardRef;
