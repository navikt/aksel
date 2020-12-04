import * as React from "react";

function Delete(
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
        d="M12 0a5.002 5.002 0 014.9 4H23v2h-2v14a4 4 0 01-4 4H7a4 4 0 01-4-4V6H1V4h6.1A5.002 5.002 0 0112 0zM9.17 4H14.829l-.076-.193a3.002 3.002 0 00-2.374-1.783l-.203-.019L12 2a2.992 2.992 0 00-2.758 1.817L9.17 4zM5 6h14v14l-.006.15A2 2 0 0117 22H7l-.15-.006A2 2 0 015 20V6zm5 3v10H8V9h2zm6 0v10h-2V9h2z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Delete);
export default ForwardRef;
