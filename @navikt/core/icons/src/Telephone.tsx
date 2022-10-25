import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgTelephone = forwardRef(
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
          d="M5.1 2a2 2 0 0 1 2.829 0l3.692 3.692a2 2 0 0 1 .001 2.828l-1.309 1.31 4.255 4.253 1.308-1.309a2 2 0 0 1 2.828 0L22 16.067a2 2 0 0 1 0 2.828l-2.18 2.182a4.081 4.081 0 0 1-4.835.702A31.816 31.816 0 0 1 2.221 9.018a4.082 4.082 0 0 1 .698-4.835L5.1 2.001Zm5.107 5.106L6.515 3.414l-2.18 2.183a2.082 2.082 0 0 0-.357 2.466 29.817 29.817 0 0 0 11.962 11.96c.81.44 1.814.294 2.466-.358l2.18-2.182-3.296-3.295-2.722 2.724L7.485 9.83l2.722-2.724Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgTelephone;
