import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPrinterRoom = forwardRef(
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
          d="M18 17.196v-2.642l3.53-2.206a1 1 0 1 0-1.06-1.696L18 12.196V7.027a1.004 1.004 0 0 0-.554-.922L5.926.113a1 1 0 1 0-.922 1.774L12.911 6H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3.446l3.53-2.206a1 1 0 0 0-1.06-1.696L18 17.196Zm-2 1.801V8H4v14h12v-3.003ZM7 18a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgPrinterRoom;
