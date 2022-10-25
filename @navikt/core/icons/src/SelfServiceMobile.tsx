import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSelfServiceMobile = forwardRef(
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
          d="M5 3a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v11.957a3.827 3.827 0 0 1 .99 2.859l-.004.053L18.873 24H9.519l-3.88-4.815a2.845 2.845 0 0 1-.637-1.685H5V3Zm12 0v10.787a3.943 3.943 0 0 0-.376-.067L15 13.508V10a3 3 0 0 0-6 0v4.917c-.576-.234-1.302-.334-2-.139V3a1 1 0 0 1 1-1h1v2h6V2h1a1 1 0 0 1 1 1ZM7 17.394v.049a.825.825 0 0 0 .196.487l3.28 4.07h6.727l.795-4.377a1.857 1.857 0 0 0-1.629-1.92L13 15.266V10a1 1 0 1 0-2 0v8.894l-2.667-2.085a1.2 1.2 0 0 0-.571-.135.737.737 0 0 0-.514.202.757.757 0 0 0-.247.518Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSelfServiceMobile;
