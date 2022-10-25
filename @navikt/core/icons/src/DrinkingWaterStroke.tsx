import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDrinkingWaterStroke = forwardRef(
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
          d="M11 5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v19h2V5a5 5 0 0 0-5-5h-2a5 5 0 0 0-5 5h2Zm3.285 13.706-.158 2.36a1 1 0 0 1-.998.934H6.871a1 1 0 0 1-.997-.933l-.172-2.57c.596.251 1.4.503 2.251.503.91 0 1.697-.294 2.322-.527l.095-.036c.678-.251 1.219-.437 1.852-.437s1.17.19 1.557.39a3.487 3.487 0 0 1 .506.316Zm.148-2.221L15 8h2l-.878 13.2A3 3 0 0 1 13.13 24H6.871a3 3 0 0 1-2.993-2.8L3 8h2l.546 8.164c.012.005.018.01.018.01l.005.003a2.742 2.742 0 0 0 .188.116c.136.08.335.188.573.296.494.224 1.082.411 1.623.411.535 0 1.015-.175 1.72-.437.669-.249 1.516-.563 2.55-.563.89 0 1.644.23 2.21.485ZM10 6.056l2.314 3.857C13.394 11.712 12.098 14 10 14c-2.097 0-3.393-2.288-2.314-4.087L10 6.056Zm0 3.888-.599.998a.699.699 0 1 0 1.198 0L10 9.944Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDrinkingWaterStroke;
