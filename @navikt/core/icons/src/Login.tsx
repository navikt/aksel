import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgLogin = forwardRef(
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
          d="M19 4h-5V2h5a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3h-5v-2h5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Zm-8.293 2.293L16.414 12l-5.707 5.707-1.414-1.414L12.586 13H2v-2h10.586L9.293 7.707l1.414-1.414Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgLogin;
