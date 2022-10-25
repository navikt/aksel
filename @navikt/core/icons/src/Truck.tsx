import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgTruck = forwardRef(
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
          d="M14 5H2v11h1.764c.55-.614 1.348-1 2.236-1 .888 0 1.687.386 2.236 1H14V5ZM1 18h2a3 3 0 1 0 6 0h7a3 3 0 1 0 6 0h1a1 1 0 0 0 1-1v-4.83a4 4 0 0 0-.556-2.034L21.58 6.982A2 2 0 0 0 19.859 6H16V4a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1Zm19 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm1.236-2H22v-3.83a2 2 0 0 0-.278-1.017L19.859 8H16v8h.764c.55-.614 1.348-1 2.236-1 .889 0 1.687.386 2.236 1ZM6 17a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgTruck;
