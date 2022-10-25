import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFillFormsFilled = forwardRef(
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
          d="m23.172 5.787-1.398 1.7-5.315-4.503L17.86 1.28l.153-.171.03-.031c1.243-1.272 3.31-1.487 4.749-.254l.035.03.166.157.033.034c1.267 1.312 1.279 3.362.146 4.742ZM15.19 4.528l5.315 4.504-6.344 7.724-7.21 3.264 1.875-7.744 6.356-7.737.008-.01ZM0 24h23.965v-2H0v2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgFillFormsFilled;
