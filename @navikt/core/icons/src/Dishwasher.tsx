import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDishwasher = forwardRef(
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
          d="M4 3v2h16V3H4Zm0 9V7h16v5a4 4 0 0 0-6-3.465A3.981 3.981 0 0 0 12 8c-.729 0-1.412.195-2 .535A4 4 0 0 0 4 12Zm8.5-1.937A2.001 2.001 0 0 0 10 12h2c0-.703.181-1.363.5-1.937ZM14 12h4a2 2 0 1 0-4 0Zm-6-2c.172 0 .34.022.5.063A3.982 3.982 0 0 0 8 12H6a2 2 0 0 1 2-2ZM2 2v10h-.69a1 1 0 0 0-.966 1.263l2.455 9a1 1 0 0 0 .965.737h16.472a1 1 0 0 0 .965-.737l2.454-9A1 1 0 0 0 22.692 12H22V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1Zm2.528 19-1.91-7h18.764l-1.91 7H4.528ZM15 18v-2H9v2h6Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDishwasher;
