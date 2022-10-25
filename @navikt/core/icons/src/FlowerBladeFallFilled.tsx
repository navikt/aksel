import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFlowerBladeFallFilled = forwardRef(
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
          d="M17.5 5.15c-.107 0-.218.006-.333.017.067-.093.128-.186.181-.278 1.105-1.898.587-3.673-.848-4.495-1.435-.822-3.348-.2-4.348 1.52-.053.091-.104.19-.152.293a3.493 3.493 0 0 0-.152-.294C10.743.015 8.935-.427 7.5.394c-1.435.822-1.848 2.777-.848 4.495.053.092.114.185.18.278a3.534 3.534 0 0 0-.332-.016C4.29 5.15 3 6.483 3 8.127c0 1.393 1.078 2.563 2.624 2.887A8.476 8.476 0 0 0 2 17.954V24h2v-6.046c0-1.825.768-3.528 2.06-4.738-.057 1.138.49 2.1 1.44 2.643 1.435.822 3.348.2 4.348-1.519.466-.8.718-2.095.768-3.3a3.003 3.003 0 0 0 1.619-.927c1.077.56 2.334.99 3.265.99 2.21 0 3.5-1.333 3.5-2.976 0-1.644-1.5-2.976-3.5-2.976ZM13 8.128a.996.996 0 0 1-1 .992c-.552 0-1-.444-1-.992a.996.996 0 0 1 1-.992c.552 0 1 .444 1 .992Zm-2 12.4c0-1.983 2-5.456 3-5.456s3 3.473 3 5.457S15.657 24 14 24s-3-1.28-3-3.472Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgFlowerBladeFallFilled;
