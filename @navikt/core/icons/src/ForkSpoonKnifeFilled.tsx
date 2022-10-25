import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgForkSpoonKnifeFilled = forwardRef(
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
          d="M2 1a1 1 0 0 0-2 0v7a4.002 4.002 0 0 0 3 3.874V24h2V11.874C6.725 11.43 8 9.864 8 8V1a1 1 0 0 0-2 0v6H5V1a1 1 0 0 0-2 0v6H2V1Zm12 10.857c1.725-.507 3-2.326 3-4.857 0-3.314-1-7-4-7S9 3.686 9 7c0 2.531 1.275 4.35 3 4.857V24h2V11.857ZM24 .397V24h-2v-8.833l-1.796-.749A3.582 3.582 0 0 1 18 11.112V6.685a6.711 6.711 0 0 1 5.61-6.62.336.336 0 0 1 .39.331Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgForkSpoonKnifeFilled;
