import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBabyChangingRoomFilled = forwardRef(
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
          d="M13 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11 11.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM5.686 6c-.705 0-1.322.474-1.505 1.155L1 19h3.257v5h2v-5h2v5h2v-5H13.002l-1.813-8H14a1 1 0 1 0 0-2h-3.432a5.472 5.472 0 0 0-4.882-3ZM21 12a1 1 0 1 0-2 0v2h-1.382l-.447-.894A2 2 0 0 0 15.382 12H15a1 1 0 1 0 0 2h.382l.447.894A2 2 0 0 0 17.618 16H19a2 2 0 0 0 2-2v-2Zm-7 6a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgBabyChangingRoomFilled;
