import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDirectionSignFilled = forwardRef(
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
          d="M13 1v2h-2V1a1 1 0 1 1 2 0ZM.518 4.777A.5.5 0 0 1 .934 4h18.53a1 1 0 0 1 .833.445L24 10l-3.703 5.555a1 1 0 0 1-.832.445H.935a.5.5 0 0 1-.417-.777L4 10 .518 4.777ZM11 17v7h2v-7h-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDirectionSignFilled;
