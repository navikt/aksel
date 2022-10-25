import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSelection = forwardRef(
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
          d="M12 0a3 3 0 0 1 3 3v6l4.758.465c2.558.34 4.414 2.673 4.23 5.317L22.37 24H8.742l-6.068-7.791c-.98-1.258-.976-3.003.227-4.209 1.155-1.158 2.872-.992 3.964-.32L9 13V3a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-.993.883L11 3v13.58l-5.051-3.11-.085-.055c-.508-.35-1.2-.35-1.547-.002-.412.412-.462.965-.145 1.455l.08.112 5.466 7.019h10.971l1.306-7.438.005-.102c.017-1.462-.976-2.715-2.273-2.976l-.164-.027L13 10.814V3a1 1 0 0 0-.883-.993L12 2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSelection;
