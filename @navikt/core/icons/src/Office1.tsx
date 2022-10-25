import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgOffice1 = forwardRef(
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
          d="M17 2H7v20h10V2Zm2 7V0H5v9H0v15h24V9h-5Zm0 2v11h3V11h-3ZM2 11h3v11H2V11Zm7-3V5h2v3H9Zm0 3v3h2v-3H9Zm4-3V5h2v3h-2Zm0 3v3h2v-3h-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgOffice1;
