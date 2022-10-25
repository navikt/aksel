import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgEmailOpened = forwardRef(
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
          d="m12 1.009 12 6.6V20a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V7.609l12-6.6ZM2 10.684v7.432L8.08 14 2 10.685Zm8.056 4.395L2.784 20h18.432l-7.272-4.921L12 16.139l-1.944-1.06ZM15.92 14 22 18.116v-7.431L15.92 14Zm5.729-5.403L12 3.291 2.351 8.598 12 13.861l9.649-5.263Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgEmailOpened;
