import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDrinkingWaterFilled = forwardRef(
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
          d="M11 5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v19h2V5a5 5 0 0 0-5-5h-2a5 5 0 0 0-5 5h2ZM5.604 16.2a.71.71 0 0 0-.057-.02L5 8H3l.878 13.2A3 3 0 0 0 6.871 24h6.258a3 3 0 0 0 2.993-2.8L17 8h-2l-.567 8.485a5.372 5.372 0 0 0-2.21-.485c-1.034 0-1.881.314-2.55.563-.705.262-1.185.437-1.72.437-.541 0-1.129-.187-1.623-.41a6.324 6.324 0 0 1-.726-.39Zm6.71-6.287L10 6.056 7.686 9.913C6.606 11.712 7.903 14 10 14c2.098 0 3.393-2.288 2.314-4.087Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgDrinkingWaterFilled;
