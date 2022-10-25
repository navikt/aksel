import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSelfServiceMobileFilled = forwardRef(
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
          d="M5 2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12.64a4.869 4.869 0 0 0-2.242-.886h-.002l-.756-.1v-2.71C16 8.767 14.21 7 12 7s-4 1.766-4 3.945v3.765c-.949-.055-1.988.205-2.853 1.045-.05.05-.1.1-.147.15V2Zm4 2h6V2H9v2Zm5 7v4.386l2.497.326a2.856 2.856 0 0 1 2.495 3.032L18.038 24h-8.04l-3.58-4.443c-.578-.717-.577-1.712.133-2.4.682-.66 1.695-.566 2.339-.182l1.11.868V11a2 2 0 1 1 4 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSelfServiceMobileFilled;
