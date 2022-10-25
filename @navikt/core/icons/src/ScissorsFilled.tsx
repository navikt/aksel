import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgScissorsFilled = forwardRef(
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
          d="M4.75 10.5a3.74 3.74 0 0 0 2.73-1.18c.243.316.442.685.581 1.093.062.202.11.382.146.545a4.334 4.334 0 0 1-.026 1.761l-.048.209c-.134.483-.35.917-.623 1.283a3.75 3.75 0 1 0 .964 2.1l13.358-7.916a.75.75 0 0 0-.236-1.38l-2.02-.405a2.75 2.75 0 0 0-1.305.055l-7.527 2.18L8.457 7.32A3.75 3.75 0 1 0 4.75 10.5ZM2.5 6.75a2.25 2.25 0 1 1 4.362.78l-.231.455A2.25 2.25 0 0 1 2.5 6.75Zm0 10a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Zm8.25-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          fill="currentColor"
        />
        <path
          d="M18.124 12.1a.75.75 0 0 0-.746-.001l-4 2.287a.75.75 0 0 0 .255 1.393l5.997.942c.321.05.648.044.967-.02l2.15-.43a.75.75 0 0 0 .226-1.385l-4.85-2.786Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgScissorsFilled;
