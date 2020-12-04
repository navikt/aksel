import * as React from "react";

function Disability1(
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
        d="M12.637 8.212L13.438 11h5.61c.554 0 1.003.448 1.003 1s-.449 1-1.003 1h-4.823a6.468 6.468 0 011.814 4.5c0 3.59-2.919 6.5-6.52 6.5C5.92 24 3 21.09 3 17.5a6.504 6.504 0 014.29-6.11l-.438-1.524a2.999 2.999 0 012.063-3.711 3.01 3.01 0 013.722 2.057zm6.834 6.48l2.48 7.608a1.004 1.004 0 01-1.908.618l-2.48-7.609a1.004 1.004 0 011.908-.618zm-9.888-6.64l-.115.025A1 1 0 008.755 9.2l.026.114L9.265 11h2.087l-.643-2.237a1.003 1.003 0 00-1.126-.711zM9.018 0a3.005 3.005 0 013.01 3c0 1.657-1.348 3-3.01 3A3.005 3.005 0 016.01 3c0-1.657 1.347-3 3.01-3zm0 2c-.554 0-1.003.448-1.003 1s.45 1 1.003 1c.554 0 1.003-.448 1.003-1s-.449-1-1.003-1z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Disability1);
export default ForwardRef;
