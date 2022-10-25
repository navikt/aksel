import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFamilyFilled = forwardRef(
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
          d="m12 0 10 10v14H2V10L12 0ZM7.585 15.36C6.218 13.647 7.397 11 9.572 11a2.39 2.39 0 0 1 1.72.742l.708.738.707-.738A2.39 2.39 0 0 1 14.428 11c2.175 0 3.354 2.647 1.987 4.36l-.137.172L12 20l-4.278-4.468-.137-.172Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgFamilyFilled;
