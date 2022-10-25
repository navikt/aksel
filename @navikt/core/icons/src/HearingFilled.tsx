import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHearingFilled = forwardRef(
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
        viewBox="0 0 25 24"
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
          d="M12 8.17c.018-2.658 2.588-4.563 5.142-3.798a3.987 3.987 0 0 1 2.646 5.065l-.838 2.546a1 1 0 0 1-1.9-.623l.838-2.547a1.99 1.99 0 0 0-1.321-2.528A1.996 1.996 0 0 0 14 8.18v1.404c.144.1.3.227.457.383.55.549 1.043 1.422 1.043 2.703 0 1.671-1.372 3.495-3.5 3.495a1 1 0 1 1 0-1.997c.872 0 1.5-.772 1.5-1.498 0-.716-.257-1.091-.457-1.291a1.343 1.343 0 0 0-.372-.262l-.003-.001-.668-.223V8.17Zm-3.968-.843C8.424 2.92 12.377-.45 16.88.049c5.07.562 8.326 5.655 6.7 10.484l-3.06 9.093a6.428 6.428 0 0 1-7.55 4.206l-.392-.091a5.916 5.916 0 0 1-4.501-4.807 11.739 11.739 0 0 0 .312-10.937H9l-.613-.004c-.111-.225-.23-.447-.355-.666Zm-4.74-.856c.391-.39 1.025-.39 1.415 0a9.463 9.463 0 0 1 0 13.396c-.39.39-1.024.39-1.414 0a.998.998 0 0 1 0-1.412 7.468 7.468 0 0 0 0-10.571.998.998 0 0 1 0-1.413ZM1.708 9.467a1.001 1.001 0 0 0-1.414 0 .998.998 0 0 0 0 1.413 3.235 3.235 0 0 1 0 4.58.998.998 0 0 0 0 1.412c.39.39 1.024.39 1.414 0a5.23 5.23 0 0 0 0-7.405Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHearingFilled;
