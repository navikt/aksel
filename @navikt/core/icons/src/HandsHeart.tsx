import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHandsHeart = forwardRef(
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
          d="M11.878 2.552a7.548 7.548 0 0 1 9.162-.006c3.737 2.852 3.974 8.387.494 11.546l-.087.079a2.612 2.612 0 0 1-.785 1.674 2.614 2.614 0 0 1-1.625.736 2.439 2.439 0 0 1-.636 1.23l-.044.045c-.387.404-.88.646-1.393.723a2.488 2.488 0 0 1-.618 1.313 2.489 2.489 0 0 1-1.603.812c-.08.519-.312 1.02-.7 1.433a2.73 2.73 0 0 1-3.865.11l-7.54-7.146C-.334 12.282-.845 7.723 1.364 4.293 3.69.682 8.638-.062 11.878 2.552Zm8.803 9.551c2.023-2.367 1.695-6.02-.857-7.968a5.54 5.54 0 0 0-7.625.87L8.823 9.081l1.16 1.04c.402.361 1.02.337 1.394-.055l3.333-3.494.718.683.018-.02 5.172 4.807.063.06Zm-5.875-2.731 4.45 4.136a.624.624 0 1 1-.855.909L16.283 12.4l-1.379 1.448 2.026 1.929c.19.17.202.465.026.65l-.044.046a.428.428 0 0 1-.602.016l-.007.007a2.54 2.54 0 0 0-.112-.11l-1.98-1.839-1.36 1.466 1.98 1.838a.499.499 0 0 1-.604.789 2.736 2.736 0 0 0-.329-.363l-.029.032-1.704-1.653-1.392 1.436 1.932 1.874a.727.727 0 0 1-.121.806.726.726 0 0 1-1.028.03l-7.539-7.147c-2.267-2.15-2.67-5.648-.97-8.285C4.69 2.817 8.13 2.263 10.452 3.975L7.28 7.807a1.998 1.998 0 0 0 .205 2.762l1.16 1.04a3.008 3.008 0 0 0 4.184-.163l1.978-2.074Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHandsHeart;
