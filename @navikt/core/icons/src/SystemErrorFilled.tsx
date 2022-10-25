import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSystemErrorFilled = forwardRef(
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
          d="m13.808.4-8.72 15.524c-.268.49.109 1.076.693 1.076H23.22c.592 0 .968-.6.685-1.091L15.187.385c-.3-.52-1.092-.511-1.379.014ZM13.5 6h2v4h-2V6Zm1 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm8.5 7c0 1.105-.858 2-1.917 2H1.917C.858 24 0 23.105 0 22h23ZM3 6h5.98L3.107 16.67c-.325.607.131 1.33.839 1.33H22v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSystemErrorFilled;
