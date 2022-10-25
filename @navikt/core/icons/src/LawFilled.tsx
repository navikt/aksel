import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgLawFilled = forwardRef(
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
        viewBox="0 0 24 25"
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
          d="M11.938 7.463c.956.552 2.18.224 2.732-.732l1.001-1.732L7.007 0l-1 1.732c-.538.93-.244 2.11.65 2.683l-3 5.195a2 2 0 0 0-2.651.777l-1 1.733 8.663 5 1-1.732a2 2 0 0 0-.732-2.732l-.082-.048 3-5.192.083.047ZM0 21.003a2 2 0 0 1 2-2h8.005a2 2 0 0 1 2 2V24H0v-2.998Zm11.505-9.132L23 18.503l1-1.732-11.495-6.632-1 1.732Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgLawFilled;
