import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgAutomaticSystemFilled = forwardRef(
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
          d="M12 2C7.968 2 4.49 4.387 2.909 7.829L1 7.41V2h2v2.063A11.97 11.97 0 0 1 12 0c6.627 0 12 5.373 12 12h-2c0-5.523-4.477-10-10-10Zm0 20c4.032 0 7.51-2.387 9.091-5.829L23 16.59V22h-2v-2.063A11.97 11.97 0 0 1 12 24C5.373 24 0 18.627 0 12h2c0 5.523 4.477 10 10 10Zm1.887-18h-3.774l-.636 1.908-1.8-.9-2.668 2.67.899 1.799L4 10.113v3.774l1.908.636-.9 1.8 2.67 2.668 1.799-.899.636 1.908h3.774l.637-1.908 1.798.9 2.67-2.67-.9-1.798L20 13.887v-3.774l-1.908-.636.9-1.8-2.67-2.668-1.798.899L13.886 4ZM13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgAutomaticSystemFilled;
