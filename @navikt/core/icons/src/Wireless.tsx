import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgWireless = forwardRef(
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
          d="M.457 7.829c-.464-.3-.596-.92-.296-1.384 5.557-8.593 18.122-8.593 23.679 0a1.001 1.001 0 0 1-1.68 1.087C17.392.158 6.61.158 1.84 7.532a1 1 0 0 1-1.383.297Zm4.988 2.994a1.001 1.001 0 0 1-.277-1.387c3.25-4.879 10.414-4.879 13.664 0a1.001 1.001 0 0 1-1.664 1.11c-2.458-3.69-7.877-3.69-10.336 0a1 1 0 0 1-1.387.277ZM13 13.993a1 1 0 0 1-.999 1.001H12a1 1 0 1 1 1.001-1Zm2 0a3.003 3.003 0 0 1-2 2.832v5.174h3A1 1 0 0 1 16 24H8a1 1 0 0 1 0-2.001h3v-5.174a3.003 3.003 0 0 1 1-5.833 3 3 0 0 1 3 3.001Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgWireless;
