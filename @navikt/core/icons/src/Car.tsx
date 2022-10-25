import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCar = forwardRef(
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
          d="M19.517 11H4.483a2 2 0 0 0-1.987 2.227l.229 2A2 2 0 0 0 4.712 17h14.576a2 2 0 0 0 1.987-1.773l.229-2A2 2 0 0 0 19.517 11Zm-.947-6.109 1.66 4.172a4.001 4.001 0 0 1 3.26 4.391l-.228 2A4.001 4.001 0 0 1 20 18.937V20.5a1.5 1.5 0 0 1-3 0V19H7v1.5a1.5 1.5 0 0 1-3 0v-1.563a4.001 4.001 0 0 1-3.262-3.483l-.229-2A4.001 4.001 0 0 1 3.77 9.063l1.66-4.172A3 3 0 0 1 8.217 3h7.566a3 3 0 0 1 2.787 1.891ZM18.052 9l-1.34-3.37a1 1 0 0 0-.93-.63H8.218a1 1 0 0 0-.929.63L5.948 9h12.104ZM7 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm11 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgCar;
