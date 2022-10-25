import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCandle = forwardRef(
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
          d="M9.161 3.832 12 0l2.839 3.832a3.533 3.533 0 1 1-5.678 0Zm1.607 1.19L12 3.36l1.232 1.662a1.533 1.533 0 1 1-2.464 0ZM3.143 12a.143.143 0 0 0-.143.143V16.5a1.5 1.5 0 0 0 3 0V15a1 1 0 1 1 2 0v1.5a3.5 3.5 0 0 1-3 3.465V22h6.17c-.11-.313-.17-.65-.17-1v-4a1 1 0 1 1 2 0v4a1 1 0 1 0 2 0v-6a1 1 0 1 1 2 0v1a2 2 0 1 0 4 0v-3.857a.143.143 0 0 0-.143-.143H3.143ZM17 21v-1.535c.588.34 1.271.535 2 .535v2h-2.17c.11-.313.17-.65.17-1Zm4 1v-2.535A3.998 3.998 0 0 0 23 16v-3.857C23 10.959 22.04 10 20.857 10H3.143C1.959 10 1 10.96 1 12.143V16.5a3.5 3.5 0 0 0 2 3.163V22a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgCandle;
