import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHeart = forwardRef(
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
          d="M17 1c3.866 0 7 3.283 7 7.333a7.486 7.486 0 0 1-2.103 5.24l.103-.002L12 23 2 13.571l.103.002A7.486 7.486 0 0 1 0 8.333C0 4.283 3.134 1 7 1c1.959 0 3.73.843 5 2.202C13.27 1.843 15.042 1 17 1Zm0 2c-1.26 0-2.445.498-3.359 1.385l-.179.182-1.46 1.564-1.462-1.563C9.603 3.566 8.344 3 7 3 4.26 3 2 5.368 2 8.333c0 1.383.494 2.674 1.357 3.653l.178.191 1.102 1.131L12 20.25l7.362-6.942 1.103-1.13a5.469 5.469 0 0 0 1.529-3.57L22 8.334C22 5.368 19.74 3 17 3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHeart;
