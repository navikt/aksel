import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgForkSpoonKnife = forwardRef(
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
          d="M1 0a1 1 0 0 1 1 1v7a2 2 0 1 0 4 0V1a1 1 0 0 1 2 0v7a4.002 4.002 0 0 1-3 3.874V24H3V11.874A4.002 4.002 0 0 1 0 8V1a1 1 0 0 1 1-1Zm2 1a1 1 0 0 1 2 0v6H3V1Zm12 6c0 2.267-1.234 3-2 3s-2-.733-2-3c0-1.507.235-2.929.687-3.895C12.11 2.197 12.54 2 13 2c.46 0 .889.197 1.313 1.105C14.765 4.07 15 5.493 15 7Zm-1 4.857c1.725-.507 3-2.326 3-4.857 0-3.314-1-7-4-7S9 3.686 9 7c0 2.531 1.275 4.35 3 4.857V24h2V11.857ZM22.006.543 22 .545a6.712 6.712 0 0 0-4 6.14v4.427c0 1.446.87 2.75 2.204 3.306l1.796.749V24h2V.396a.336.336 0 0 0-.39-.33 6.73 6.73 0 0 0-1.604.476ZM22 2.832V13l-1.027-.428a1.582 1.582 0 0 1-.973-1.46V6.685a4.71 4.71 0 0 1 2-3.853Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgForkSpoonKnife;
