import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgTelephoneFilled = forwardRef(
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
          d="M5.375 2.586a2 2 0 0 1 2.829 0l3.692 3.691a2 2 0 0 1 .001 2.828l-1.309 1.31 4.255 4.254 1.308-1.31a2 2 0 0 1 2.828 0l3.296 3.295a2 2 0 0 1 0 2.828l-2.18 2.182a4.081 4.081 0 0 1-4.835.701A31.817 31.817 0 0 1 2.496 9.603a4.082 4.082 0 0 1 .698-4.834l2.18-2.183Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgTelephoneFilled;
