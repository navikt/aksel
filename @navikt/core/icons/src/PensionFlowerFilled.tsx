import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPensionFlowerFilled = forwardRef(
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
          d="M13 15.938A8.001 8.001 0 0 0 12 0a8 8 0 0 0-1 15.938v8.05c0-.111-.009-.922-.182-1.992-.241-1.494-.804-3.494-2.114-4.803-1.298-1.299-3.243-1.83-4.704-2.047-.42-.062-.8-.098-1.114-.119-.543-.036-.885-.026-.885-.026s-.01.342.026.885c.021.313.057.694.12 1.114.216 1.46.747 3.406 2.046 4.704 1.31 1.31 3.31 1.873 4.803 2.114C10.149 24.005 11 24 11 24h2s.851.005 2.004-.182c1.494-.241 3.494-.804 4.803-2.114 1.299-1.298 1.83-3.243 2.047-4.704.062-.42.098-.8.119-1.114.036-.543.026-.885.026-.885s-.342-.01-.885.026c-.314.021-.694.057-1.114.12-1.46.216-3.406.747-4.704 2.046-1.31 1.31-1.873 3.31-2.114 4.803A13.646 13.646 0 0 0 13 23.987v-8.049ZM9.375 12.5V4h3.136c.504 0 .823.051 1.261.154.439.093.822.257 1.148.49.327.224.584.527.77.91.196.373.294.835.294 1.386 0 .532-.098.994-.294 1.386a2.623 2.623 0 0 1-.77.966 3.309 3.309 0 0 1-1.134.56c-.429.121-.734.182-1.219.182h-1.192V12.5h-2Zm2-4.104h1.066c1.12 0 1.68-.485 1.68-1.456 0-.476-.15-.812-.448-1.008-.299-.196-.728-.294-1.288-.294h-1.01v2.758Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgPensionFlowerFilled;
