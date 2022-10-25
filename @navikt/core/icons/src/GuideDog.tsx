import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgGuideDog = forwardRef(
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
          d="m9.038 9-1.126 5.732a22.383 22.383 0 0 0-.355 6.02l8.335-6.82-.964-3.21-.291-1.792a8.92 8.92 0 0 1-1.3.068c-.661-.013-1.364-.098-1.998-.287-.61-.182-1.282-.5-1.726-1.068-.92-1.178-.64-2.393-.226-3.168a4.473 4.473 0 0 1 .953-1.206l.026-.022.008-.008.004-.003h.001l.001-.001.643.765.644.766.002-.002.001-.001.001-.001-.004.004a2.535 2.535 0 0 0-.167.168 2.477 2.477 0 0 0-.349.483c-.192.361-.223.66.039.996.074.095.283.251.722.382.416.124.932.193 1.463.204.332.006.653-.01.94-.044l-.58-3.57C13.599 2.55 12.913 2 12.179 2H9.5c-.525 0-1.246.147-1.878.456-.643.314-.965.677-1.08.961l-.505 1.25H2v2.666C2 8.3 2.752 9 3.579 9h5.46Zm9.153 5.636.559 1.864L22 24H6a24.383 24.383 0 0 1-.05-9.653L6.606 11H3.579C1.602 11 0 9.358 0 7.333V4.5c0-1.013.801-1.833 1.79-1.833h2.899C5.417.868 7.838 0 9.5 0h2.679c1.75 0 3.242 1.296 3.53 3.064l.77 4.737.084.068 1.83-1.464a3.121 3.121 0 0 1 3.926 4.853l-4.128 3.378Zm-1.677 1.372L9.19 22h9.764l-2.086-4.813-.354-1.18Zm.354-5.821 2.774-2.22a1.121 1.121 0 0 1 1.41 1.743l-3.484 2.851-.686-2.29-.014-.085Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgGuideDog;
