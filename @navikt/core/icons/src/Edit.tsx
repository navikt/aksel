import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgEdit = forwardRef(
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
          d="M22.835 1.165a3.976 3.976 0 0 1 0 5.623L8.073 21.549.682 24 0 23.318l2.45-7.392L17.21 1.165a3.977 3.977 0 0 1 5.624 0Zm-4.218 7.029-2.811-2.812L4.188 17l-1.393 4.205 4.207-1.395L18.618 8.194ZM21.43 2.57a1.989 1.989 0 0 0-2.703-.1l-.108.1-1.406 1.406 2.811 2.812 1.406-1.406a1.988 1.988 0 0 0 .101-2.703l-.1-.109Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgEdit;
