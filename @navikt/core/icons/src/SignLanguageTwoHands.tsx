import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSignLanguageTwoHands = forwardRef(
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
          d="M17.276.794a2.488 2.488 0 0 0-3.6-.04L9.74 4.787A2.972 2.972 0 0 0 6.775 2c-.916 0-1.714.627-1.93 1.517L4.056 6.77A2 2 0 0 0 4 7.241V12h2V7.24L6.786 4a.971.971 0 0 1 .953 1.088l-.232 1.913a1 1 0 0 0 .308.85l.038.034c.884.83 1.169 2.118.719 3.244l1.857.742a4.948 4.948 0 0 0-.423-4.498 1 1 0 0 0 .074-.068l5.027-5.154a.488.488 0 0 1 .704.677l-2.93 3.09a1 1 0 1 0 1.451 1.377l.66-.695.017.018 4.136-4a.543.543 0 1 1 .752.782L15.31 7.776a1 1 0 0 0-.064 1.382l1.065 1.219a2 2 0 0 1-.164 2.797l-.819.741 1.344 1.482.818-.741a4 4 0 0 0 .327-5.594l-.435-.499 3.895-3.715a2.543 2.543 0 1 0-3.523-3.668l-.116.113a2.49 2.49 0 0 0-.362-.499ZM2 17.6C2 16.195 3.187 15 4.721 15c1.032 0 1.938.544 2.398 1.313l.291.487h4.754c.507 0 .86.39.86.8 0 .41-.353.8-.86.8H8.443v2h3.72c1.091 0 2.064-.606 2.545-1.515l6.506-1.22a.662.662 0 0 1 .366 1.265l-7.585 3.006a.909.909 0 0 1-.335.064H2v-4.4Zm18.846-1.901-5.935 1.113c-.351-1.179-1.469-2.012-2.747-2.012H8.499A4.832 4.832 0 0 0 4.72 13C2.145 13 0 15.028 0 17.6V24h13.66c.367 0 .73-.07 1.072-.205l7.585-3.006a2.662 2.662 0 0 0-1.471-5.09Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSignLanguageTwoHands;
