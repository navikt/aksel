import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgAttachmentFilled = forwardRef(
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
          d="M2 0a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm11.377 3.307a4.312 4.312 0 0 1 6.185 0 4.49 4.49 0 0 1 0 6.258l-6.925 7.076a3.07 3.07 0 0 1-4.401 0 3.18 3.18 0 0 1 0-4.436l4.267-4.36a1 1 0 1 1 1.43 1.398l-4.268 4.361a1.18 1.18 0 0 0 0 1.638 1.07 1.07 0 0 0 1.543 0l6.924-7.076a2.49 2.49 0 0 0 0-3.46 2.312 2.312 0 0 0-3.326 0L6.07 13.634c-1.425 1.457-1.425 3.827 0 5.283a3.554 3.554 0 0 0 5.109 0l.006-.007 2.059-2.063c.016-.019.032-.037.05-.054l1.499-1.5 5.5-5.5a1 1 0 1 1 1.415 1.414l-5.499 5.5-3.604 3.612a5.554 5.554 0 0 1-7.965-.003c-2.185-2.234-2.185-5.847 0-8.08l8.738-8.93Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgAttachmentFilled;
