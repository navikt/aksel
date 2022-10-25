import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFeedingBottleFilled = forwardRef(
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
          d="M23.125.875a2.989 2.989 0 0 1-1.53 5.045 4.976 4.976 0 0 1-1.288 4.817.996.996 0 0 1 0 1.409l-.704.704-.803-.802-.54 2.29a5.977 5.977 0 0 1-1.59 2.854l-6.225 6.224a1.992 1.992 0 0 1-2.817 0L.584 16.372a1.992 1.992 0 0 1 0-2.817L6.807 7.33A5.977 5.977 0 0 1 9.661 5.74l2.29-.541-.801-.802.704-.704a.996.996 0 0 1 1.409 0 4.98 4.98 0 0 1 4.818-1.288 2.989 2.989 0 0 1 5.044-1.53Zm-9.518 5.98-3.488.824a3.985 3.985 0 0 0-1.723.892l-.18.169L6.955 10h9.798l-3.146-3.145Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgFeedingBottleFilled;
