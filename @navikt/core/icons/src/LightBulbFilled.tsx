import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgLightBulbFilled = forwardRef(
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
          d="M12 24a2 2 0 0 0 2-2h-4l.005.15A2 2 0 0 0 12 24Zm3-3v-2H9v2h6Zm5-12.9C20 3.626 16.418 0 12 0S4 3.626 4 8.1a8.13 8.13 0 0 0 1.6 4.861l.217.305c.543.794 1.241 2.02 2.094 3.681L8.444 18h7.112c1.107-2.215 1.987-3.798 2.639-4.75l.392-.552A8.133 8.133 0 0 0 20 8.1ZM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgLightBulbFilled;
