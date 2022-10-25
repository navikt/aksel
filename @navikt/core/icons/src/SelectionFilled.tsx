import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSelectionFilled = forwardRef(
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
          d="M12 0a3 3 0 0 1 3 3v6l4.758.465c2.558.34 4.414 2.673 4.23 5.317L22.37 24H8.742l-6.068-7.791c-.98-1.258-.976-3.003.227-4.209 1.155-1.158 2.872-.992 3.964-.32L9 13V3a3 3 0 0 1 3-3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSelectionFilled;
