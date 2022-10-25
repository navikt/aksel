import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCombifridge1 = forwardRef(
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
          d="M6 2h12v9H8V9H6V2ZM4 13V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Zm14 0v9H6v-7h2v-2h10Zm-4.502 1 1.787 3.87c.664 1.438-.302 3.13-1.787 3.13-1.485 0-2.45-1.692-1.786-3.13L13.498 14Zm-1-11h2v1.696l1.438-.899 1.06 1.696-1.61 1.007 1.61 1.007-1.06 1.696-1.438-.899V10h-2V8.304l-1.438.899L10 7.507 11.611 6.5 10 5.493l1.06-1.696 1.438.899V3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgCombifridge1;
