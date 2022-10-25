import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPregnant = forwardRef(
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
          d="M14 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-3.971 9c-.87 0-1.342 1.177-.795 1.938l.055.076L11 21l1.711-1.986.055-.076c.547-.761.075-1.938-.795-1.938a.913.913 0 0 0-.688.33l-.283.328-.283-.328a.913.913 0 0 0-.688-.33ZM12 14.85l-1.82.164a3.5 3.5 0 0 0 0 6.972l.159.014h.161v2H10v-.022a5.5 5.5 0 0 1 0-10.956V13a4 4 0 0 1 8 0v11h-2V13a2 2 0 1 0-4 0v1.85Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgPregnant;
