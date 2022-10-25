import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgMotorcycle = forwardRef(
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
          d="M8.915 2h-.023A6.916 6.916 0 0 0 2 8.915v1.13c0 .527.428.955.955.955h1.082c.177 0 .353.01.525.027l-.355.978a4 4 0 1 0 1.91.6l.356-.98a5.052 5.052 0 0 1 2.547 5.257.101.101 0 0 0 .1.118h7.006A4.002 4.002 0 0 0 24 16a4 4 0 0 0-7.874-1h-1.088a5.105 5.105 0 0 1 4.985-4h.436a.876.876 0 0 0 .783-.484L24 5h-3.578a8 8 0 0 0-4.437 1.344L15 7h-2l-.106-.211A3.233 3.233 0 0 0 10 5l1-3H8.915ZM3.454 14.075l-.394 1.083a1 1 0 1 0 1.88.684l.461-1.27a2 2 0 1 1-1.947-.497ZM20 18a2 2 0 0 1-1.732-1H20a1 1 0 1 0 0-2h-1.732A2 2 0 0 1 22 16a2 2 0 0 1-2 2ZM6.386 4.7a4.916 4.916 0 0 1 1.822-.649L7.225 7H10c.468 0 .896.265 1.106.683L11.764 9h3.842l1.488-.992A6 6 0 0 1 20.422 7h.342l-1.002 2.005c-3.48.124-6.249 2.731-6.759 5.995h-1.99c-.501-3.341-3.385-6-6.976-6H4v-.085C4 7.19 4.906 5.59 6.386 4.7Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgMotorcycle;
