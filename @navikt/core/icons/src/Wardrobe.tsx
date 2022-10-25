import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgWardrobe = forwardRef(
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
          d="M10 7a2 2 0 1 1 2.655 1.89C11.924 9.145 11 9.848 11 11v.69c-.945.08-1.884.271-2.795.575l-5.82 1.94A3.487 3.487 0 0 0 3.486 21h17.026a3.487 3.487 0 0 0 1.103-6.795l-5.821-1.94c-.911-.304-1.85-.495-2.795-.574v-.688a.177.177 0 0 1 .037-.054.674.674 0 0 1 .272-.168A4.001 4.001 0 0 0 12 3a4 4 0 0 0-4 4 1 1 0 1 0 2 0Zm3 4.006c-.001 0-.001 0 0 0v-.003.003Zm9 6.507c0 .821-.666 1.487-1.487 1.487H3.487a1.487 1.487 0 0 1-.47-2.897l5.82-1.94a10 10 0 0 1 6.325 0l5.821 1.94c.607.202 1.017.77 1.017 1.41Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgWardrobe;
