import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHorseFilled = forwardRef(
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
          d="M8 0a2 2 0 0 1 2 2v.002a4.309 4.309 0 0 1 1.404 2.081l.239.771.005.017L12.766 8h4.543c1.48 0 2.773.804 3.464 2H22a2 2 0 0 1 2 2v5a2 2 0 0 1-2-2v-3h-.691v1c0 1.89-1.31 3.473-3.071 3.892l1.205 3.69c.734-.37 1.364-.803 1.85-1.29a1 1 0 0 1 1.414 1.415c-1.154 1.154-2.766 1.97-4.456 2.497C16.55 23.736 14.7 24 13 24c-1.7 0-3.55-.264-5.25-.796-1.69-.528-3.304-1.343-4.457-2.497a1 1 0 1 1 1.414-1.414c.466.466 1.064.883 1.76 1.242l1.26-3.86A4.001 4.001 0 0 1 5.31 13V8.273l-2.258.41a2.587 2.587 0 0 1-1.8-4.76l3.76-2.27A4.309 4.309 0 0 1 8 1.09V0Zm1.725 17h6.444l1.41 4.319A16.005 16.005 0 0 1 13 22c-1.507 0-3.156-.236-4.654-.704l-.021-.007L9.725 17Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHorseFilled;
