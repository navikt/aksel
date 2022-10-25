import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgWrenchFilled = forwardRef(
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
        viewBox="0 0 25 25"
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
          d="M12.349 2.119A7.228 7.228 0 0 0 5.77.149c-1.018.21-1.278 1.428-.62 2.086l3.416 3.416-2.915 2.915L2.235 5.15C1.577 4.492.358 4.752.15 5.77a7.235 7.235 0 0 0 9.724 8.2l8.152 9.554a3.9 3.9 0 1 0 5.499-5.499L13.97 9.873a7.235 7.235 0 0 0-1.622-7.754Zm8.502 19.77a1.037 1.037 0 1 0 0-2.075 1.037 1.037 0 0 0 0 2.074Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgWrenchFilled;
