import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgUmbrellaFilled = forwardRef(
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
          d="M0 11.056h1.667a5.799 5.799 0 0 1 6.674 0h.326a5.798 5.798 0 0 1 6.674 0h.326a5.799 5.799 0 0 1 6.674 0h1.674C23.271 4.824 18.18 0 12.008 0 5.837 0 .744 4.823 0 11.056ZM11 12v9a3 3 0 1 0 6 0v-.444h-2V21a1 1 0 1 1-2 0v-9h-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgUmbrellaFilled;
