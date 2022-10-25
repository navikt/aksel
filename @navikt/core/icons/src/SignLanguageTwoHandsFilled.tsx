import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSignLanguageTwoHandsFilled = forwardRef(
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
          d="m14.664 5.804 3.178-3.292A1.482 1.482 0 0 0 15.713.447l-5.035 5.16.006.006-.125.125-.178 1.324a6.067 6.067 0 0 1 2.017 4.934h-1.004A5.064 5.064 0 0 0 9.662 7.76a.844.844 0 0 1-.284-.75l.328-2.43A1.953 1.953 0 0 0 7.77 2.365a.976.976 0 0 0-.949.746l-.791 3.26a1 1 0 0 0-.028.237v7.557a4.79 4.79 0 0 1 2.5 1.63h1.877v-.002h1.045l-.001.003h.745c1.211 0 2.278.747 2.686 1.827l.118-.019 3.07-2.953a3.998 3.998 0 0 0-.077-5.834l-.703-.641 5.08-5.288A1.48 1.48 0 0 0 20.21.832l-5.16 5.325-.386-.353Z"
          fill="currentColor"
        />
        <path
          d="M12.17 16.797H7.98c-.644-1.076-1.88-1.8-3.258-1.8-2.056 0-3.723 1.612-3.723 3.6V24h12.667c.24 0 .48-.046.703-.134l7.57-3a1.678 1.678 0 0 0-.883-3.217l-5.956.949a2.839 2.839 0 0 1-2.839 2.838H8.447V20.4h3.724c1.028 0 1.861-.807 1.861-1.801 0-.994-.833-1.8-1.861-1.8Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSignLanguageTwoHandsFilled;
