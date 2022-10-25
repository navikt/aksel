import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgShakeHandsFilled = forwardRef(
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
          d="M5.5 3.906H0v9.52l9.912 9.64c.559.557 1.45.581 2.039.055a1.52 1.52 0 0 0 .364-1.768l.354.357a1.49 1.49 0 0 0 2.121 0 1.525 1.525 0 0 0 0-2.142l.718.725a1.49 1.49 0 0 0 2.121 0 1.525 1.525 0 0 0 0-2.142l.697.704a1.49 1.49 0 0 0 2.121 0 1.525 1.525 0 0 0 0-2.142l-8.131-8.21-2.122 2.142a2.98 2.98 0 0 1-4.242 0L3.83 8.503a2.034 2.034 0 0 1-.236-2.568L5.5 3.906Z"
          fill="currentColor"
        />
        <path
          d="m10.642 1.626-4.69 4.735a1.016 1.016 0 0 0 0 1.428l.707.714a1.987 1.987 0 0 0 2.828 0l2.829-2.856L19 12.488h5V3.906h-6.61L14.298 1.02c-.793-.697-2.25-.867-3.655.607Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgShakeHandsFilled;
