import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHorse = forwardRef(
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
          d="M11.047 4.019a4.28 4.28 0 0 0-1.105-1.795V2a2.005 2.005 0 0 0-2.008-2v1.12a4.315 4.315 0 0 0-3.254.5L1.712 3.403A3.516 3.516 0 0 0 .555 8.315a3.542 3.542 0 0 0 3.576 1.582l.794-.133V13a4.003 4.003 0 0 0 2.701 3.78l-1.231 3.755c-.699-.36-1.3-.776-1.767-1.242a1.007 1.007 0 0 0-1.42 0 .997.997 0 0 0 0 1.414c1.158 1.154 2.778 1.97 4.474 2.497 1.707.532 3.566.796 5.273.796 1.707 0 3.565-.264 5.272-.796 1.697-.528 3.317-1.343 4.475-2.497a.997.997 0 0 0 0-1.414 1.007 1.007 0 0 0-1.42 0c-.488.486-1.121.919-1.858 1.288l-1.235-3.765A4.004 4.004 0 0 0 21 13v-1h.992v3c0 1.105.899 2 2.008 2v-5c0-1.105-.9-2-2.008-2h-1.53a4.02 4.02 0 0 0-3.48-2h-4.565l-.943-2.627-.427-1.354ZM9.57 6.009l-.44-1.392C8.68 3.19 7.006 2.56 5.72 3.332L2.75 5.116a1.52 1.52 0 0 0-.5 2.124c.33.517.94.787 1.547.685l3.137-.526V13c0 1.105.9 2 2.01 2h8.037c1.11 0 2.01-.895 2.01-2v-1c0-1.105-.9-2-2.01-2h-5.98L9.569 6.01ZM9.667 17h6.47l1.416 4.319c-1.484.453-3.11.681-4.598.681-1.513 0-3.169-.236-4.673-.704l-.022-.007L9.667 17Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHorse;
