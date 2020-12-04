import * as React from "react";

function Place(
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
        d="M12 0c4.418 0 8 3.597 8 8.034l-.001.622c-.011 1.579-.11 2.566-.999 4.344l-.16.305-.293.523C17.537 15.578 15.354 18.968 12 24l-2.245-3.389-1.581-2.422C6.472 15.56 5.414 13.83 5 13c-1-2-1-3-1-4.966C4 3.597 7.582 0 12 0zm0 2C8.688 2 6 4.7 6 8.034l.007.984.012.395c.014.292.037.505.074.733.093.574.29 1.148.696 1.96l.104.2.203.368c.592 1.042 1.738 2.87 3.42 5.45L12 20.383l1.705-2.599 1.032-1.598c1.139-1.777 1.913-3.041 2.315-3.778l.16-.302c.405-.812.602-1.386.695-1.96l.04-.286.019-.203c.027-.354.034-.809.034-1.623C18 4.699 15.312 2 12 2zm0 2a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Place);
export default ForwardRef;
