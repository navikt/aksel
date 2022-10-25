import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgWateringCanFilled = forwardRef(
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
          d="M17.5 3c-2.095 0-3.787 1.298-4.323 3H18c1.529 0 2.924.572 3.983 1.513.011-.12.017-.24.017-.362C22 4.92 20.048 3 17.5 3Zm0-2c-3.454 0-6.376 2.582-6.496 5.936A1.99 1.99 0 0 0 10.698 8v3.046L8 10l-2 4 4.698 4.107V21a2 2 0 0 0 2 2H22a2 2 0 0 0 2-2v-9a5.98 5.98 0 0 0-.517-2.44A5.855 5.855 0 0 0 24 7.15C24 3.693 21.027 1 17.5 1ZM5 13.5l-4.142-.274a1 1 0 0 1-.723-1.49L3.158 6.5a1 1 0 0 1 1.652-.118L7 9.5l-2 4Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgWateringCanFilled;
