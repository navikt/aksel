import * as React from "react";

function Money1(
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
        d="M24 5a5 5 0 00-8.938-3.082L15 2a5 5 0 00-5 5H0v14h24V7h-.416c.268-.612.416-1.289.416-2zM8.157 13.535v-2.403H6.834V17h1.323v-1.575l.684-.9L10.272 17h1.449l-2.097-3.528 1.773-2.34H9.939l-1.746 2.403h-.036zM12 7a3 3 0 116 0 3 3 0 01-6 0zm5.274-4.454a3 3 0 112.738 5.279l.042-.016-.123.027a4.999 4.999 0 00-2.525-5.22l-.132-.07zm-4.831 8.586V17h1.323v-2.115h.729L15.62 17h1.485l-1.332-2.349c.318-.138.57-.345.756-.621.192-.282.288-.639.288-1.071 0-.348-.06-.639-.18-.873a1.467 1.467 0 00-.486-.558 1.952 1.952 0 00-.72-.306 4.02 4.02 0 00-.873-.09h-2.115zm2.007 2.7h-.684v-1.647h.684c.348 0 .612.057.792.171.186.114.279.315.279.603s-.093.507-.279.657c-.18.144-.444.216-.792.216z"
        fill="currentColor"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(Money1);
export default ForwardRef;
