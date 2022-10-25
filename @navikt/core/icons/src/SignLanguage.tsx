import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSignLanguage = forwardRef(
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
          d="M20.47 2.115a2.503 2.503 0 0 0-3.472-.691l-.007.004-3.11 2.15A2.478 2.478 0 0 0 9.52 1.895L3.534 9H0v11h3.838l4.786 1.596a7.884 7.884 0 0 0 2.493.404H16.5a2.5 2.5 0 0 0 2.384-3.256 2.496 2.496 0 0 0 4.663-1.72l-1.538-5.741A1.93 1.93 0 0 0 20.573 9.9l-.026-.006-.231-.04 1.893-.621a2.462 2.462 0 1 0-1.424-4.712l-.012.004-.118.041a2.502 2.502 0 0 0-.186-2.452ZM3 18v-7H2v7h1Zm2 .28 4.257 1.418c.6.2 1.228.302 1.86.302H16.5a.5.5 0 0 0 0-1h-2.468a2.67 2.67 0 0 1-1.888-4.558l1.481-1.482c.295-.294.695-.46 1.112-.46h3.22c.775 0 1.452.523 1.648 1.273l1.052 4.022a.496.496 0 1 0 .958-.253l-1.526-5.697-4.072-.703a1 1 0 0 1-.141-1.936l5.759-1.889.026-.007a.462.462 0 1 0-.25-.888l-6.34 2.24a1 1 0 0 1-.885-1.778l4.495-2.97a.503.503 0 0 0-.567-.83l-7.67 5.301a1 1 0 0 1-1.329-1.473l2.662-3.11a.478.478 0 0 0-.736-.61L5 10.365v7.914Zm13.722.021c.011.043.024.085.037.126A2.5 2.5 0 0 0 16.5 17h-2.468a.67.67 0 0 1-.474-1.144l1.356-1.356h2.814l.994 3.802Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSignLanguage;
