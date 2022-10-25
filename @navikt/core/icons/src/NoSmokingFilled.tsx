import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgNoSmokingFilled = forwardRef(
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
          d="M19.624 4.322A2.789 2.789 0 0 1 18 1.788V0h-2v1.788a4.789 4.789 0 0 0 2.844 4.376v-.001a2.789 2.789 0 0 1 1.625 2.534V11h2V8.697a4.789 4.789 0 0 0-2.844-4.376ZM15.384 13 18 10.385 16.615 9 11 14.615 5.385 9 4 10.385 6.615 13H0v6h6.615L4 21.615 5.385 23 11 17.385 16.615 23 18 21.615 15.385 19H20v-6h-4.615ZM24 15a2 2 0 0 0-2-2v6a2 2 0 0 0 2-2v-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgNoSmokingFilled;
