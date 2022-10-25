import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgService = forwardRef(
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
          d="M12 12a5 5 0 1 0-4.584-3H11a1 1 0 1 1 0 2H9c.835.628 1.874 1 3 1Zm-5.745-1a7 7 0 1 0-.965-2H4V5a1 1 0 0 0-2 0v4a2 2 0 0 0 2 2h2.255Zm14.67 13c-.926-4.008-4.57-7-8.925-7s-8 2.992-8.924 7H1c.956-5.12 5.517-9 11-9s10.044 3.88 11 9h-2.076ZM21 4a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V5a1 1 0 0 0-1-1Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgService;
