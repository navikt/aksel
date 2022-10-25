import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgShakeHands = forwardRef(
  (
    { title, titleId: _titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>
  ) => {
    let titleId: string | undefined = useId();
    titleId = title ? (_titleId ? _titleId : "title-" + titleId) : undefined;
    return (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable={false}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.18 2.3a1 1 0 0 1 1.393-.035l4.036 3.728H22v6.109h-3.399l-5.717-5.718L11.47 4.97 8.288 8.152a1 1 0 0 1-1.414 0l-.715-.715 5.02-5.136Zm.29 5.498L9.702 9.566a3 3 0 0 1-4.243 0l-.715-.715a2 2 0 0 1-.016-2.812l.045-.046H2v6.582l8.395 8.284a.497.497 0 0 0 .701-.706l-1.04-1.04 1.414-1.415 1.767 1.768a.5.5 0 1 0 .707-.707l-1.767-1.768 1.414-1.415 1.768 1.768.707.707a.5.5 0 1 0 .707-.707l-2.475-2.475 1.414-1.414 2.475 2.475.707.707a.5.5 0 0 0 .707-.707L11.47 7.798ZM6.728 3.993 9.75.903a3 3 0 0 1 4.18-.107l3.462 3.197H24v10.109h-3.399l.415.414a2.5 2.5 0 0 1-2.316 4.207 2.498 2.498 0 0 1-2.828 1.414 2.498 2.498 0 0 1-2.856 1.408 2.498 2.498 0 0 1-4.025.737L0 13.412V3.992h6.728Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgShakeHands;
