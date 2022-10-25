import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHearingImpaired = forwardRef(
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
        viewBox="0 0 24 25"
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
          d="M4 8C4.033 3.269 8.154-.474 12.88.05c1.223.135 2.295.4 3.283.945.99.545 1.827 1.333 2.637 2.413a1 1 0 0 1-1.6 1.2c-.69-.92-1.324-1.488-2.002-1.862-.68-.374-1.472-.59-2.538-.71-3.525-.39-6.635 2.41-6.66 5.979L4 8Zm14.315 3.059a1 1 0 0 1 .634 1.263l-2.429 7.326v.005c-.438 1.3-1.17 2.42-2.215 3.206-1.052.79-2.36 1.196-3.856 1.167-1.062-.022-2.127-.393-2.955-1.125a5.65 5.65 0 0 1-.181-.167l-.013-.012-.004-.004-.002-.002a1 1 0 0 1 1.411-1.418l.001.002.002.001.019.019.09.082c.442.39 1.04.611 1.672.624 1.097.022 1.956-.271 2.614-.766.664-.499 1.186-1.25 1.52-2.243v-.002l2.428-7.322a1 1 0 0 1 1.264-.634ZM8 8c.018-2.662 2.588-4.57 5.142-3.803a3.99 3.99 0 0 1 2.646 2.577 1 1 0 0 1-1.9.626 1.99 1.99 0 0 0-1.321-1.287A1.997 1.997 0 0 0 10 8.01v.907c.144.1.3.226.457.383.55.55 1.043 1.424 1.043 2.707a1 1 0 1 1-2 0c0-.718-.257-1.093-.457-1.293a1.347 1.347 0 0 0-.372-.263l-.003-.001L8 10.228V8.001ZM3.707 23.715l19-19L21.293 3.3l-19 19 1.414 1.414Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHearingImpaired;
