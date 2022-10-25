import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgGuideDogFilled = forwardRef(
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
          d="M6.616 24H22l-3.25-7.5-.561-1.87 4.13-3.372a3.121 3.121 0 0 0-3.926-4.853l-.752.798L18 9.5l1.642-1.533a1.121 1.121 0 0 1 1.41 1.743l-3.501 2.793-.67-2.231-.327-2.013a2.258 2.258 0 0 1-.525.317 4.26 4.26 0 0 1-.807.254 8.298 8.298 0 0 1-1.886.168c-.66-.013-1.363-.098-1.997-.287-.61-.182-1.282-.5-1.726-1.068-.92-1.178-.64-2.393-.226-3.168a4.473 4.473 0 0 1 .953-1.206l.026-.022.008-.008.004-.003h.001s.002-.002.645.764l.643.766a2.539 2.539 0 0 0-.167.168 2.477 2.477 0 0 0-.349.483c-.192.361-.223.66.039.996.074.095.283.251.722.382.416.124.932.193 1.463.204.531.01 1.035-.038 1.42-.123.192-.042.333-.088.423-.128.506-.225.819-.382 1.01-.493l-.519-3.191C15.421 1.296 13.929 0 12.179 0H9.5C7.838 0 5.417.868 4.689 2.667h-2.9C.801 2.667 0 3.487 0 4.5v2.833C0 9.358 1.602 11 3.579 11h3.028l-.658 3.347a24.383 24.383 0 0 0-.256 7.827l11.834-9.603.624 2.069L6.616 24Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgGuideDogFilled;
