import React, { SVGProps } from "react";

export type DefaultSpeechBubbleArrowType = React.FunctionComponent<
  SVGProps<SVGSVGElement>
>;

export const SpeechBubbleArrow: DefaultSpeechBubbleArrowType = ({
  ...props
}) => {
  return (
    <svg
      width="22"
      height="33"
      viewBox="0 0 22 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="navds-guide-panel__arrow"
      {...props}
    >
      <path d="M22 0H19L20 33H22V0Z" fill="currentColor" />
      <path
        d="M20.0001 31V2C10.0296 2.09817 7.00012 3 2.00012 6C12.5001 8 20.0001 20 20.0001 31Z"
        fill="currentColor"
      />
      <path
        className="strokePath"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.0001 0C19.9936 0 19.987 3.44219e-05 19.9804 9.91821e-05C14.9659 0.0494747 11.5341 0.299242 8.68213 0.964027C5.77218 1.64231 3.56368 2.72947 0.971101 4.28501C0.2597 4.71185 -0.114319 5.53358 0.0310233 6.35038C0.176366 7.16718 0.810891 7.80944 1.62587 7.96468C6.22897 8.84146 10.3172 11.9453 13.2908 16.2599C16.2623 20.5715 18.0001 25.9294 18.0001 31C18.0001 32.1046 18.8955 33 20.0001 33C20.0001 33 20.0001 33 20.0001 33L20.0001 0ZM4.70521 6.755C10.7068 8.97688 15.469 14.4934 18.0001 20.8803C19.2897 24.1345 20.0001 27.6146 20.0001 31V2C19.3003 2.00689 18.6346 2.01774 18.0001 2.033C11.2107 2.19625 7.98364 2.86405 4.54372 4.5848C3.72488 4.9944 2.894 5.46367 2.00012 6C2.9262 6.1764 3.8289 6.43058 4.70521 6.755Z"
        fill="currentColor"
      />
    </svg>
  );
};
