import * as React from "react";

function Feedingbottle1(
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
        d="M23.125.875a2.989 2.989 0 01-1.53 5.045 4.976 4.976 0 01-1.288 4.817.996.996 0 010 1.409l-.704.704-.803-.802-.54 2.29a5.977 5.977 0 01-1.59 2.854l-6.225 6.224a1.992 1.992 0 01-2.817 0L.584 16.372a1.992 1.992 0 010-2.817L6.807 7.33A5.977 5.977 0 019.661 5.74l2.29-.541-.801-.802.704-.704a.996.996 0 011.409 0 4.98 4.98 0 014.818-1.288 2.989 2.989 0 015.044-1.53zm-9.518 5.98l-3.488.824a3.985 3.985 0 00-1.723.892l-.18.169L6.955 10h9.798l-3.146-3.145zm1.065-1.753l4.226 4.226a2.989 2.989 0 00-4.226-4.226zm5.635-2.818a.996.996 0 101.409 1.409.996.996 0 00-1.409-1.409z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Feedingbottle1);
export default ForwardRef;
