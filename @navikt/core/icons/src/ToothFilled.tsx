import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgToothFilled = forwardRef(
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
          d="M2.105 5.114A4.258 4.258 0 0 1 6.276 0H7.29c1.763 0 3.392.57 4.715 1.537A7.964 7.964 0 0 1 16.72 0h1.013a4.258 4.258 0 0 1 4.171 5.114l-.726 3.539a9.181 9.181 0 0 1-3.26 5.329l-.573 4.564-.883 4.402a1.31 1.31 0 0 1-2.58-.05l-.942-5.86c-.108-1.22-.546-2.856-1.07-2.856-.547 0-1 1.788-1.082 2.936l-.93 5.78a1.31 1.31 0 0 1-2.579.05l-.883-4.402-.604-4.815a9.178 9.178 0 0 1-2.96-5.078l-.727-3.539Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgToothFilled;
