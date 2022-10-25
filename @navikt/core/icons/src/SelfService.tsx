import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSelfService = forwardRef(
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
          d="M3 0a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h5.788v3.004c-1.001-.566-2.658-.767-3.848.385-1.218 1.18-1.204 2.915-.237 4.114L9.133 24h10.592l1.26-6.937.004-.054c.164-2.275-1.488-4.27-3.75-4.561l-.017-.002-2.35-.222V11H21a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3Zm11.873 9H21a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5.788V7.973C8.788 6.3 10.183 5 11.83 5c1.648 0 3.043 1.299 3.043 2.973V9Zm-4.085-1.027c0-.505.434-.973 1.042-.973.609 0 1.043.468 1.043.973v6.07l4.126.39a2.296 2.296 0 0 1 1.998 2.383L18.055 22H10.09l-3.83-4.752c-.367-.456-.349-1.016.071-1.422.36-.35 1-.363 1.492-.07l2.965 1.77V7.974Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSelfService;
