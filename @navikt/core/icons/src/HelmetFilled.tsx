import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHelmetFilled = forwardRef(
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
          d="M16.013 5.839a13.755 13.755 0 0 0-.025-.011 3 3 0 0 0-2.5-2.69l-.189-.032a8 8 0 0 0-2.598 0l-.188.031A3 3 0 0 0 8.012 5.83l-.025.011c.009.053.013.107.013.162v6a1 1 0 1 1-2 0v-5a9.985 9.985 0 0 0-3.998 8v2l-1.8 2.4a1 1 0 0 0 .8 1.6h22a1 1 0 0 0 .8-1.6l-1.8-2.4v-2A9.985 9.985 0 0 0 18 7v5.002a1 1 0 1 1-2 0v-6c0-.056.005-.11.013-.163ZM10 16.002a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHelmetFilled;
