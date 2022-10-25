import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgGlobeFilled = forwardRef(
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
          d="M1.089 17.001h6.365C8.244 21.13 9.982 24 12 24c2.018 0 3.756-2.869 4.547-7l6.364.001C21.015 21.131 16.842 24 12 24c-4.843 0-9.015-2.868-10.911-6.999Zm13.414 0C13.88 20.016 12.793 22 12 22c-.793 0-1.88-1.984-2.503-4.999h5.006Zm.42-7a25.954 25.954 0 0 1-.098 5h-5.65a25.731 25.731 0 0 1-.098-5h5.846Zm8.911 0a12.08 12.08 0 0 1-.212 5h-6.78a28.732 28.732 0 0 0 .088-5h6.904ZM.166 10h6.903a28.7 28.7 0 0 0 .089 5H.378a12.08 12.08 0 0 1-.212-5ZM12 0c5.225 0 9.67 3.34 11.317 8h-6.602C16.03 3.34 14.177 0 12 0Zm0 0-.148.005C9.74.152 7.955 3.445 7.284 8H.683C2.33 3.34 6.775 0 12 0Zm0 2c.878 0 2.115 2.43 2.687 6H9.313C9.885 4.43 11.122 2 12 2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgGlobeFilled;
