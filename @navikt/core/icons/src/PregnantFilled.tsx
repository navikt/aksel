import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPregnantFilled = forwardRef(
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
          d="M14 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-4 5a4 4 0 0 1 8 0v11h-8v-.022a5.5 5.5 0 0 1 0-10.956V13Zm-1.766 5.938C7.687 18.177 8.159 17 9.029 17c.258 0 .507.12.688.33l.283.328.283-.328c.181-.21.43-.33.688-.33.87 0 1.342 1.177.795 1.938l-.055.076L10 21l-1.711-1.986-.055-.076Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgPregnantFilled;
