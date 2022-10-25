import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgScissors = forwardRef(
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
          d="M4.75 4.5a2.25 2.25 0 1 0 1.881 3.485l.23-.456A2.25 2.25 0 0 0 4.75 4.5Zm2.73 4.82a3.75 3.75 0 1 1 .977-2.001l2.287 1.526 7.527-2.18a2.75 2.75 0 0 1 1.304-.055l2.021.405a.75.75 0 0 1 .236 1.38L15.85 11.94l5.991 3.669a.75.75 0 0 1-.245 1.375l-2.016.403a2.749 2.749 0 0 1-1.315-.058l-7.692-2.262-2.098 1.244a3.75 3.75 0 1 1-.964-2.1c.273-.366.488-.8.622-1.283l.048-.209.032-.14a4.334 4.334 0 0 0-.006-1.62 7.757 7.757 0 0 0-.146-.546A3.81 3.81 0 0 0 7.48 9.32Zm1.892 4.715c.093-.283.172-.55.22-.759.031-.116.058-.234.082-.353.062-.274.124-.59.138-.952a5.067 5.067 0 0 0-.124-1.259l9-2.606a1.25 1.25 0 0 1 .593-.025l.103.02-8.346 4.947-.961.55a.749.749 0 0 0-.139.102l-.566.335Zm2.978-.01 6.338 1.865c.194.057.4.066.598.026l.14-.028-4.99-3.056-2.086 1.194Zm-7.6.475a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgScissors;
