import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgEmailOpenedFilled = forwardRef(
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
          d="m.21 7.515 10.263 5.513.006.003 1.521.83 1.521-.83.006-.003 10.262-5.513L12 1 .21 7.515ZM24 9.672l-8.069 4.335L24 19.456V9.672Zm-.622 11.777-9.433-6.37-1.466.799-.479.261-.479-.261-1.466-.8L.622 21.45C.98 21.79 1.466 22 2 22h20c.534 0 1.02-.21 1.378-.55ZM0 19.456l8.069-5.45L0 9.673v9.784Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgEmailOpenedFilled;
