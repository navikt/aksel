import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPlaneFilled = forwardRef(
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
          d="m5.493.301 7.715 4.832 4.81-1.397c1.869-.543 3.912.059 5.378 1.584.742.772.81 2.03.15 2.809a1.652 1.652 0 0 1-.8.525L8.512 12.79c-1.838.534-3.763.023-5.235-1.221l-2.116.613-.548-1.938 1.235-.358a7.167 7.167 0 0 1-.224-.398L0 5.826l2.513-.73c.577-.168 1.208 0 1.68.445l2.369 1.524.283-.083-5.048-5.569L3.322.353A1.968 1.968 0 0 1 5.493.301ZM21.93 24a7 7 0 0 0-11.775-6.051A7.5 7.5 0 0 1 13.984 24h7.945ZM1 24h11c-.254-2.803-2.62-5-5.5-5S1.254 21.197 1 24Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgPlaneFilled;
