import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHandsHeartFilled = forwardRef(
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
        viewBox="0 0 25 24"
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
          d="m7.01 7.699 3.483-4.525c.277-.36.585-.682.917-.964C8.178.019 3.58.856 1.363 4.298-.846 7.728-.335 12.287 2.64 15.106l7.539 7.146a2.73 2.73 0 0 0 3.864-.11c.389-.413.621-.915.702-1.434a2.488 2.488 0 0 0 1.602-.811c.344-.381.549-.84.618-1.313a2.418 2.418 0 0 0 1.393-.723l.044-.046c.339-.354.55-.783.636-1.23a2.614 2.614 0 0 0 1.625-.735c.476-.464.764-.973.785-1.675.022-.702-.384-1.14-.384-1.14L17.586 9.07l-1.211-1.35-2.859 3.064a3 3 0 0 1-4.172.209L7.143 9.061a1 1 0 0 1-.133-1.362Zm4.823-4.02-2.825 3.76a1 1 0 0 0 .115 1.33l.852.798a2 2 0 0 0 2.83-.095l3.648-3.91 5.61 6.625c2.822-2.708 2.521-7.308-.631-9.625l-.337-.248a6.654 6.654 0 0 0-9.262 1.364Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHandsHeartFilled;
