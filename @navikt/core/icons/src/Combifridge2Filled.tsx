import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCombifridge2Filled = forwardRef(
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
          d="M4 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9H8V9H6v2H4V2Zm0 11v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9H8v2H6v-2H4Zm10.498 1v1.696l1.438-.899 1.06 1.696-1.61 1.007 1.61 1.007-1.06 1.696-1.438-.899V21h-2v-1.696l-1.438.899L10 18.507l1.611-1.007L10 16.493l1.06-1.696 1.438.899V14h2Zm-1-11 1.787 3.87c.664 1.438-.302 3.13-1.787 3.13-1.485 0-2.45-1.692-1.786-3.13L13.498 3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgCombifridge2Filled;
