import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgList = forwardRef(
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
          d="M2 2h2v2H2V2ZM0 6V0h6v6H0Zm2 5h2v2H2v-2Zm-2 4V9h6v6H0Zm4 5H2v2h2v-2Zm-4-2v6h6v-6H0ZM24 2H8v2h16V2ZM8 11h16v2H8v-2Zm16 9H8v2h16v-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgList;
