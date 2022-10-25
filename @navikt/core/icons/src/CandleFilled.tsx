import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCandleFilled = forwardRef(
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
          d="M12 0 9.161 3.832A3.533 3.533 0 0 0 11 9.324V7a1 1 0 1 1 2 0v2.324a3.533 3.533 0 0 0 1.839-5.492L12 0ZM1 11.143c0-.079.064-.143.143-.143h21.714c.079 0 .143.064.143.143V16c0 1.105-1 2-3 2s-3-.895-3-2v-1a1 1 0 1 0-2 0v6a1 1 0 1 1-2 0v-4a1 1 0 1 0-2 0v4c0 2 .5 2.5 1 3H4a1 1 0 0 1-1-1v-3.035c4 0 5-1.702 5-3.465V15a1 1 0 1 0-2 0v1.5c0 .828-1 1.5-2.5 1.5S1 17.328 1 16.5v-5.357ZM17 21v-1.535c.911.488 1.822.501 3.49.527L21 20v3a1 1 0 0 1-1 1h-4c.5-.5 1-1 1-3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgCandleFilled;
