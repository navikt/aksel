import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFamily = forwardRef(
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
          d="M22 10 12 0 2 10v14h20V10ZM4 22V10.828l8-8 8 8V22H4Zm6.585-9.584 1.413 1.41 1.412-1.41A1.44 1.44 0 0 1 14.423 12c1.345 0 2.024 1.553 1.217 2.519l-.108.13-3.534 3.526-3.535-3.527-.108-.129C7.548 13.553 8.227 12 9.572 12c.382 0 .75.153 1.013.416ZM11.998 21l5.011-5 .166-.199C19.098 13.5 17.422 10 14.423 10a3.44 3.44 0 0 0-2.425 1 3.44 3.44 0 0 0-2.426-1c-2.999 0-4.674 3.5-2.752 5.801l.167.199 5.01 5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgFamily;
