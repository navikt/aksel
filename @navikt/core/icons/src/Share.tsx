import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgShare = forwardRef(
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
          d="m14 6.937-1.733.233c-3.571.482-6.082 2.478-7.756 5.253-.91 1.508-1.563 3.24-1.976 5.05a22.965 22.965 0 0 1 1.578-1.811c1.911-1.968 4.401-3.75 7.482-4.386L14 10.779v3.38l7.261-5.115L14 3.93v3.008ZM2.005 21.832a23.59 23.59 0 0 0-.262.46c-.066.118-.13.235-.191.35-.345.637-1.552.375-1.552-.35a23.95 23.95 0 0 1 .022-1.02C.326 14.113 3.852 6.288 12 5.189V2.002a1 1 0 0 1 1.576-.818l9.998 7.043a1 1 0 0 1 0 1.635l-9.998 7.042A1 1 0 0 1 12 16.086v-2.851a10.33 10.33 0 0 0-2 .633c-3.679 1.585-6.346 5.12-7.995 7.964Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgShare;
