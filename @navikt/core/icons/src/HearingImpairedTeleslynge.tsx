import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHearingImpairedTeleslynge = forwardRef(
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
        viewBox="0 0 24 25"
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
          d="M0 7.462C.03 3.048 3.874-.443 8.282.046c1.135.126 2.136.373 3.06.882.926.51 1.706 1.246 2.458 2.248a1 1 0 0 1-1.6 1.2c-.633-.843-1.21-1.359-1.823-1.697-.616-.339-1.337-.537-2.315-.645C4.854 1.678 2.022 4.226 2 7.476l-2-.014Zm21 8.546h3v-2h-8v2h3v8h2v-8ZM8.537 3.878C6.131 3.156 3.71 4.954 3.692 7.462v2.112l.666.222a1.167 1.167 0 0 1 .32.226c.17.171.399.498.399 1.139a1 1 0 0 0 2 0c0-1.206-.464-2.032-.985-2.553a3.197 3.197 0 0 0-.4-.34v-.796a1.766 1.766 0 0 1 2.27-1.678 1.76 1.76 0 0 1 1.17 1.139 1 1 0 0 0 1.899-.626 3.76 3.76 0 0 0-2.494-2.429Zm9.17.837-16 16L.293 19.3l16-16 1.414 1.414Zm-3.758 6.76a1 1 0 1 0-1.898-.629L9.81 17.605v.002c-.3.891-.766 1.565-1.352 2.014-.58.445-1.337.716-2.308.712-.624-.003-1.212-.221-1.633-.61l-.037-.034-.004-.005h-.001l-.001-.002A1 1 0 0 0 3.062 21.1l.002.002.002.002.007.007.02.02.069.064c.825.76 1.91 1.134 2.98 1.139 1.37.005 2.568-.385 3.533-1.125.958-.735 1.629-1.77 2.03-2.966l2.244-6.766Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHearingImpairedTeleslynge;
