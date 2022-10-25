import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgWarningColored = forwardRef(
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
          d="M11.126.564a.962.962 0 0 1 1.741-.021l11.011 21.912c.358.695-.117 1.54-.865 1.54H.987c-.738 0-1.215-.826-.876-1.519L11.126.564Z"
          fill="#D47B00"
        />
        <path d="M11 7.996h2v7h-2v-7Z" fill="#fff" />
        <circle cx={12} cy={18.496} r={1.5} fill="#fff" />
      </svg>
    );
  }
);
export default SvgWarningColored;
