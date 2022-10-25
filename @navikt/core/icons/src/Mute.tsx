import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgMute = forwardRef(
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
          d="M23.707 1.707A1 1 0 0 0 22.293.293l-22 22a1 1 0 1 0 1.414 1.414l22-22ZM13.182 6.576V2.909a.91.91 0 0 0-1.491-.698L5.125 7.68H.91a.91.91 0 0 0-.909.91v6.818c0 .502.407.91.91.91h2.53L5.256 14.5H1.818v-5h3.637a.91.91 0 0 0 .582-.21l5.327-4.44v3.544l1.818-1.818Zm0 8.485-1.818 1.818v2.271l-1.24-1.032-1.29 1.29 2.857 2.381a.91.91 0 0 0 1.49-.698v-6.03Zm4.858-4.858a4 4 0 0 1-.747 4.62 1 1 0 1 0 1.414 1.414 6 6 0 0 0 .797-7.498l-1.464 1.464Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgMute;
