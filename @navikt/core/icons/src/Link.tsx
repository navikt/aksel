import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgLink = forwardRef(
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
          d="M21.745 1.488a5.211 5.211 0 0 0-7.293 0l-2.577 2.537a1 1 0 0 0 1.403 1.426l2.577-2.537a3.211 3.211 0 0 1 4.487 0l.737.724a3.056 3.056 0 0 1 0 4.374l-5.154 5.074a3.211 3.211 0 0 1-4.487 0l-.736-.725a1 1 0 0 0-1.404 1.426l.737.725a5.211 5.211 0 0 0 7.293 0l5.154-5.075a5.056 5.056 0 0 0 0-7.224l-.737-.725Z"
          fill="currentColor"
        />
        <path
          d="M2.255 22.512a5.211 5.211 0 0 0 7.293 0l2.577-2.538a1 1 0 1 0-1.403-1.425l-2.577 2.537a3.211 3.211 0 0 1-4.487 0l-.737-.724a3.056 3.056 0 0 1 0-4.374l5.154-5.074a3.211 3.211 0 0 1 4.487 0l.736.725a1 1 0 0 0 1.404-1.426l-.737-.725a5.211 5.211 0 0 0-7.293 0l-5.154 5.075a5.056 5.056 0 0 0 0 7.224l.737.725Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgLink;
