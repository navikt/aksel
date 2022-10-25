import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCarFilled = forwardRef(
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
          d="M3.77 9.063A4.001 4.001 0 0 0 .51 13.454l.229 2A4.001 4.001 0 0 0 4 18.937V20.5a1.5 1.5 0 0 0 3 0V19h10v1.5a1.5 1.5 0 0 0 3 0v-1.563a4.001 4.001 0 0 0 3.262-3.483l.229-2a4.001 4.001 0 0 0-3.261-4.391l-1.66-4.172A3 3 0 0 0 15.783 3H8.216A3 3 0 0 0 5.43 4.891L3.77 9.063ZM18.052 9l-1.34-3.37a1 1 0 0 0-.93-.63H8.218a1 1 0 0 0-.929.63L5.948 9h12.104ZM7 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm12 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgCarFilled;
