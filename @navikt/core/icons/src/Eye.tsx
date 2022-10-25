import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgEye = forwardRef(
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
          d="M12 5c4.418 0 8.418 2.333 12 7-3.582 4.667-7.582 7-12 7s-8.418-2.333-12-7c3.582-4.667 7.582-7 12-7Zm-.217 2.005L12 7c-3.311 0-6.393 1.577-9.298 4.86l-.121.14.121.14c2.812 3.177 5.788 4.756 8.978 4.855L12 17a5 5 0 0 1-.217-9.995Zm.537 0L12.002 7a5 5 0 0 1 .217 9.995l-.217.005c3.309 0 6.39-1.577 9.296-4.86l.12-.14-.12-.14c-2.812-3.177-5.788-4.756-8.978-4.855ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgEye;
