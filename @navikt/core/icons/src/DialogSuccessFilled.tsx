import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDialogSuccessFilled = forwardRef(
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
          d="M20 0a4 4 0 0 1 3.995 3.8L24 4v11a4 4 0 0 1-3.8 3.995L20 19H7l-7 5V4A4 4 0 0 1 3.8.005L4 0h16Zm-2.953 5 1.399 1.43-8.728 8.398L6 11.347l1.395-1.433 2.319 2.118L17.047 5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDialogSuccessFilled;
