import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgThermometerFilled = forwardRef(
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
          d="M23.404 3.471a2.033 2.033 0 0 1 0 2.876l-9.33 9.33a4.067 4.067 0 0 1-2.637 1.185l-2.284.134a2.032 2.032 0 0 1-.665-.07l-3.78 3.781-1.415-1.414 3.78-3.781a2.032 2.032 0 0 1-.07-.665l.135-2.284a4.067 4.067 0 0 1 1.184-2.636L17.653.596a2.033 2.033 0 0 1 2.876 0l2.875 2.875ZM13.293 9.293l5-5 1.414 1.414-5 5-1.414-1.414Zm-13 13 2-2 1.414 1.414-2 2a1 1 0 0 1-1.414-1.414Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgThermometerFilled;
