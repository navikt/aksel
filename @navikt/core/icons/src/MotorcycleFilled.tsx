import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgMotorcycleFilled = forwardRef(
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
          d="M20.023 11h.436a.876.876 0 0 0 .783-.484L24 5h-3.578a8 8 0 0 0-4.437 1.344L15 7h-2l-.106-.211A3.236 3.236 0 0 0 10 5l1-3H8.915A6.916 6.916 0 0 0 2 8.915v1.13c0 .527.428.955.955.955h.962c.218 0 .431.013.641.04l-.351.965a4 4 0 1 0 1.91.6l.34-.938A5.153 5.153 0 0 1 9 17H16.126A4.002 4.002 0 0 0 24 16a4 4 0 0 0-7.874-1h-1.088a5.105 5.105 0 0 1 4.985-4Zm-16.57 3.075-.393 1.083a1 1 0 1 0 1.88.684l.461-1.27a2 2 0 1 1-1.947-.497ZM20 18a2 2 0 0 1-1.732-1H20a1 1 0 1 0 0-2h-1.732A2 2 0 0 1 22 16a2 2 0 0 1-2 2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgMotorcycleFilled;
