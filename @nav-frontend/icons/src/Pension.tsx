import * as React from "react";

function Pension(
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
        d="M12.768 4a1 1 0 100-2 1 1 0 000 2zm0 2a3 3 0 100-6 3 3 0 000 6zm-4.135 6.777l1.092-5.07a1.008 1.008 0 00-1.97-.43l-.74 3.334a.615.615 0 00.002.276l.025-.02 1.32 1.614.27.296zm-2.953-.274l1.168 1.284 2.242 2.741a3 3 0 01.678 1.9V24h2v-5.572a5 5 0 00-1.13-3.166l-.392-.48 1.187-5.504.766.875a5.403 5.403 0 001.694 1.297c-.08.18-.125.365-.125.55v1a1 1 0 002 0v-.5a.5.5 0 011 0V24h2V12.5a2.5 2.5 0 00-2.5-2.5 3.408 3.408 0 01-2.564-1.164L11.52 6.341l-.002.002a3.008 3.008 0 00-5.716.5l-.74 3.334c-.185.83.045 1.697.617 2.326z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Pension);
export default ForwardRef;
