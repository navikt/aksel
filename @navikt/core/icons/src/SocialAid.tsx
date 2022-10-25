import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSocialAid = forwardRef(
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
          d="M10.65 2.418 12 3.652l1.35-1.234a1.595 1.595 0 0 1 2.192.047c.595.592.61 1.536.048 2.145l-.024.025L12 8.18 8.433 4.635 8.41 4.61a1.542 1.542 0 0 1 .048-2.145 1.595 1.595 0 0 1 2.193-.047Zm6.302-1.371a3.542 3.542 0 0 1 .107 4.92l.003.002L12 11 6.938 5.969l.003-.003a3.542 3.542 0 0 1 .107-4.92A3.595 3.595 0 0 1 12 .943a3.595 3.595 0 0 1 4.952.105Zm6.17 9.88a3.086 3.086 0 0 0-4.243-.157l-4.224 3.716a2.992 2.992 0 0 0-1.64-.486h-3.97a5.076 5.076 0 0 0-4.04-2A5.003 5.003 0 0 0 0 17v7h13.561c1.214 0 2.37-.525 3.168-1.439l6.511-7.456a3.077 3.077 0 0 0-.118-4.177ZM16.018 17c0-.321-.05-.631-.144-.921l4.329-3.809a1.082 1.082 0 0 1 1.487.056c.394.402.412 1.04.041 1.464l-6.511 7.457A2.202 2.202 0 0 1 13.56 22H2.002v-5c0-1.657 1.345-3 3.004-3 1.12 0 2.121.61 2.637 1.5l.29.5h5.082a1 1 0 1 1 0 2H9.01v2h4.005a3.002 3.002 0 0 0 3.003-3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSocialAid;
