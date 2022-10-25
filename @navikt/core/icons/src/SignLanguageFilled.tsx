import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSignLanguageFilled = forwardRef(
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
          d="M12.509 4.442 9.85 7.56l7.646-5.308a1.493 1.493 0 0 1 2.076.415c.453.682.279 1.603-.392 2.07l-4.489 2.979 7.405-2.52A1.462 1.462 0 1 1 22.92 8l-6.783 2.154 4.146.72c.335.076.6.333.689.666l1.532 5.74a1.489 1.489 0 1 1-2.88.766l-1.048-4.022a.701.701 0 0 0-.677-.526h-3.207a.569.569 0 0 0-.403.168l-1.475 1.48a1.675 1.675 0 0 0-.311 1.929c.281.566.857.923 1.487.923h3.454c.825 0 1.494.672 1.494 1.5s-.67 1.5-1.494 1.5h-6.357a6.83 6.83 0 0 1-2.167-.353L4 18.998v-9l6.253-7.456a1.468 1.468 0 0 1 2.075-.163c.61.523.69 1.44.18 2.063ZM3 9H0v11h3V9Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSignLanguageFilled;
