import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgWirelessFilled = forwardRef(
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
          d="M1.05 9.736A2.005 2.005 0 0 1 .24 7.022c5.053-9.363 18.465-9.363 23.518 0a2.005 2.005 0 0 1-.808 2.714 1.998 1.998 0 0 1-2.71-.81c-3.542-6.56-12.94-6.56-16.481 0a1.998 1.998 0 0 1-2.71.81Zm4.979 2.994a2.005 2.005 0 0 1-.777-2.724c2.941-5.302 10.555-5.302 13.496 0a2.005 2.005 0 0 1-.777 2.724 1.998 1.998 0 0 1-2.72-.778c-1.417-2.555-5.085-2.555-6.503 0a1.998 1.998 0 0 1-2.72.778Zm7.97 1.254c0 .741-.401 1.388-.999 1.735v6.277h3a1 1 0 0 1 0 2.003H8a1 1 0 0 1 0-2.003h3v-6.277c-.598-.347-1-.994-1-1.735 0-1.107.896-2.004 2-2.004s2 .897 2 2.004Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgWirelessFilled;
