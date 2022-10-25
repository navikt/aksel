import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgVolumeUp = forwardRef(
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
          d="M13.182 2.91a.91.91 0 0 0-1.491-.7L5.125 7.683H.91A.91.91 0 0 0 0 8.59v6.818c0 .502.407.91.91.91h4.215l6.566 5.47a.91.91 0 0 0 1.49-.698V2.909ZM6.037 9.29l5.327-4.44v14.3l-5.327-4.44a.91.91 0 0 0-.582-.21H1.818v-5h3.637a.909.909 0 0 0 .582-.21Zm13.716-3.997a1 1 0 0 1 1.414 0 9.487 9.487 0 0 1 0 13.414 1 1 0 1 1-1.414-1.414 7.486 7.486 0 0 0 0-10.586 1 1 0 0 1 0-1.414Zm-2.46 2.46a1 1 0 0 1 1.414 0 6 6 0 0 1 0 8.484 1 1 0 1 1-1.414-1.414 4 4 0 0 0 0-5.656 1 1 0 0 1 0-1.414Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgVolumeUp;
