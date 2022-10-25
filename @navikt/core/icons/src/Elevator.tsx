import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgElevator = forwardRef(
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
          d="M22 2H2v20h20V2ZM2 0a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm14 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm0 2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0h2a2 2 0 0 1 2 2v6h-1v4h-2v-6h1v-4h-4v4h1v6h-2v-4h-1v-6a2 2 0 0 1 2-2h2ZM7 3l3.707 3.707-1.414 1.414L8 6.828V11H6V6.829L4.707 8.12 3.293 6.707 7 3ZM3.293 17.414 7 21.121l3.707-3.707L9.293 16 8 17.293V13H6v4.293L4.707 16l-1.414 1.414Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgElevator;
