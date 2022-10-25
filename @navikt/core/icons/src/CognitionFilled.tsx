import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCognitionFilled = forwardRef(
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
        viewBox="0 0 25 24"
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
          d="M3.487 19v-2H1.004a1 1 0 0 1-.868-1.495L2.989 10.5c0-5.799 4.7-10.5 10.5-10.5 8.44 0 13.43 9.454 8.668 16.423l-.736 1.077V24H8.967v-2h-2.48a3 3 0 0 1-3-3ZM15.445 7a.499.499 0 1 0-.002-.998.499.499 0 0 0 .002.998Zm0 2c1.375 0 2.49-1.12 2.49-2.5S16.82 4 15.446 4a2.496 2.496 0 0 0-2.491 2.5c0 .574.192 1.103.516 1.525l-.325.544-2.186-1.17A2.495 2.495 0 0 0 8.469 5a2.495 2.495 0 0 0-2.49 2.5c0 1.38 1.115 2.5 2.49 2.5.686 0 1.306-.278 1.757-.727l1.892 1.013-.432.724a2.495 2.495 0 0 0-2.717 2.49c0 1.38 1.115 2.5 2.49 2.5 1.377 0 2.492-1.12 2.492-2.5 0-.574-.193-1.103-.518-1.525l.446-.746 2.069 1.107A2.496 2.496 0 0 0 18.434 15c1.375 0 2.49-1.12 2.49-2.5S19.81 10 18.434 10c-.596 0-1.142.21-1.57.56l-1.958-1.048.312-.522c.075.007.15.01.227.01ZM8.47 8a.5.5 0 1 0-.002-.998A.5.5 0 0 0 8.47 8Zm9.963 5a.5.5 0 1 0-.001-.998.5.5 0 0 0 .002.998Zm-6.475.5a.5.5 0 1 1-.998.002.5.5 0 0 1 .998-.002Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgCognitionFilled;
