import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgRecycle = forwardRef(
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
          d="m8.67 3.478-.76 1.13L5.03 5.629 6.99 2.394A3 3 0 0 1 9.422 1.02L10.2.998l5.9.023a1 1 0 0 1 .913.601l1.68 3.862 2.014-.876-1.775 8.95-7.756-4.806 2.014-.876-2.132-4.903-1.576.047a1 1 0 0 0-.811.458Zm8.862 6.86-2.056-1.275.346-.15-2.567-5.903 2.185.008 2.216 5.097.346-.15-.47 2.372ZM7.5 19.997l-1.282-.009a1 1 0 0 1-.821-.438l-.887-1.304 2.99-4.432 1.82 1.228-.113-9.124L.705 9.231l1.82 1.228L.172 13.95a1 1 0 0 0-.016 1.093l3.15 4.99.437.643a3 3 0 0 0 2.465 1.313h3.856L7.5 20Zm-.227-8.749-.03-2.418-2.254.878.313.21-3.108 4.608 1.167 1.847 3.6-5.336.312.211Zm13.652.804.907 1.36a1 1 0 0 1 .096.926l-.585 1.465h-5.347v-2.196l-7.5 5.196 7.5 5.196v-2.196h4.21a1 1 0 0 0 .916-.598l2.374-5.402.29-.722a3 3 0 0 0-.29-2.778L21.46 9.248l-.534 2.805Zm-6.929 5.373-1.988 1.378 1.988 1.377v-.377h5.558l.879-2h-6.437v-.378Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgRecycle;
