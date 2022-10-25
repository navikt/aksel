import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgElevatorFilled = forwardRef(
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
          d="M2 0a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm8.707 6.707L7 3 3.293 6.707l1.414 1.414L6 6.828V11h2V6.828l1.293 1.293 1.414-1.414ZM18 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-4 3a1 1 0 0 0-1 1v5h1v5h4v-5h1v-5a1 1 0 0 0-1-1h-4ZM7 21.004l-3.707-3.707 1.414-1.414L6 17.176V13h2v4.176l1.293-1.293 1.414 1.414L7 21.004Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgElevatorFilled;
