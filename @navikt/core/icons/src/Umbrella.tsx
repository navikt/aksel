import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgUmbrella = forwardRef(
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
          d="M1.667 11.056A5.782 5.782 0 0 1 5.004 10c1.235 0 2.382.39 3.337 1.056h.326a5.798 5.798 0 0 1 6.674 0h.326a5.799 5.799 0 0 1 6.674 0h1.674a13.06 13.06 0 0 0-.398-2C22.138 3.822 17.5 0 12.007 0 6.516 0 1.878 3.821.4 9.057a13.056 13.056 0 0 0-.399 2h1.667ZM5.004 8c1.256 0 2.444.3 3.5.83a7.77 7.77 0 0 1 3.5-.83c1.256 0 2.444.3 3.5.83a7.77 7.77 0 0 1 3.5-.83c.78 0 1.533.116 2.245.33C19.668 4.57 16.086 2 12.008 2 7.93 2 4.35 4.568 2.768 8.328A7.767 7.767 0 0 1 5.004 8ZM11 12v9a3 3 0 1 0 6 0v-.444h-2V21a1 1 0 1 1-2 0v-9h-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgUmbrella;
