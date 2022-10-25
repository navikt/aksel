import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSunFilled = forwardRef(
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
          d="M12 1c.506 0 .917.41.917.917V3.75a.917.917 0 0 1-1.834 0V1.917c0-.507.41-.917.917-.917ZM12 19.333c.506 0 .917.41.917.917v1.833a.917.917 0 1 1-1.834 0V20.25c0-.506.41-.917.917-.917ZM19.333 12c0-.506.41-.917.917-.917h1.833a.917.917 0 1 1 0 1.834H20.25a.917.917 0 0 1-.917-.917ZM1 12c0-.506.41-.917.917-.917H3.75a.917.917 0 0 1 0 1.834H1.917A.917.917 0 0 1 1 12ZM4.222 4.222a.917.917 0 0 1 1.296 0l1.297 1.296a.917.917 0 1 1-1.297 1.297L4.222 5.518a.917.917 0 0 1 0-1.296ZM17.185 17.185a.917.917 0 0 1 1.297 0l1.296 1.297a.917.917 0 1 1-1.296 1.296l-1.297-1.296a.917.917 0 0 1 0-1.297ZM17.185 6.815a.917.917 0 0 1 0-1.297l1.297-1.296a.917.917 0 0 1 1.296 1.296l-1.296 1.297a.917.917 0 0 1-1.297 0ZM4.222 19.778a.917.917 0 0 1 0-1.296l1.296-1.297a.917.917 0 0 1 1.297 1.297l-1.297 1.296a.917.917 0 0 1-1.296 0ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
          fill="currentColor"
        />
        <path d="M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" fill="currentColor" />
      </svg>
    );
  }
);
export default SvgSunFilled;
