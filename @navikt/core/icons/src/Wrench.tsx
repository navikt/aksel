import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgWrench = forwardRef(
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
        viewBox="0 0 25 25"
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
          d="M12.384 2.125A7.25 7.25 0 0 0 5.743.158a1.823 1.823 0 0 0-1.425 1.417c-.136.642.06 1.337.559 1.836L7.255 5.79 5.789 7.255 3.41 4.877a2.011 2.011 0 0 0-1.836-.559A1.823 1.823 0 0 0 .158 5.743a7.25 7.25 0 0 0 1.967 6.641 7.253 7.253 0 0 0 7.216 1.82l8.689 9.493a4.011 4.011 0 1 0 5.667-5.667l-9.493-8.69a7.253 7.253 0 0 0-1.82-7.215ZM8.72 4.323 6.521 2.124a5.184 5.184 0 0 1 5.52 7.12l-.279.672 10.536 9.643a1.938 1.938 0 1 1-2.739 2.739L9.916 11.762l-.671.28a5.184 5.184 0 0 1-7.12-5.52L4.322 8.72c.81.81 2.122.81 2.932 0L8.72 7.255c.81-.81.81-2.122 0-2.932Zm12.115 17.549a1.036 1.036 0 1 0 0-2.073 1.036 1.036 0 0 0 0 2.073Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgWrench;
