import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgGlobe = forwardRef(
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
          d="M12 0c6.627 0 12 5.373 12 12 0 1.707-.356 3.33-.999 4.801L23 17l-.089.001C21.015 21.131 16.842 24 12 24c-4.843 0-9.015-2.868-10.911-6.999L1 17v-.196A11.96 11.96 0 0 1 0 12C0 5.373 5.373 0 12 0Zm2.503 17.001H9.497C10.12 20.016 11.207 22 12 22c.793 0 1.88-1.984 2.503-4.999Zm-7.05 0H3.339a10.028 10.028 0 0 0 5.623 4.529c-.644-1.185-1.165-2.738-1.507-4.53Zm13.209 0h-4.115c-.343 1.79-.864 3.344-1.508 4.53A10.03 10.03 0 0 0 20.662 17Zm-13.593-7L2.2 10a10.046 10.046 0 0 0 .258 5h4.7a28.7 28.7 0 0 1-.088-5Zm7.854 0H9.077a25.939 25.939 0 0 0 .098 5h5.65a25.716 25.716 0 0 0 .098-5ZM21.8 10h-4.87a28.732 28.732 0 0 1-.088 5h4.7a10.052 10.052 0 0 0 .258-5ZM8.961 2.47l-.172.057A10.03 10.03 0 0 0 2.832 8h4.452c.305-2.067.838-3.873 1.527-5.244l.15-.287ZM12 2c-.878 0-2.115 2.43-2.687 6h5.374c-.557-3.473-1.743-5.869-2.616-5.995L12 2Zm3.039.47.043.08c.74 1.394 1.314 3.279 1.633 5.45h4.453a10.029 10.029 0 0 0-6.13-5.53Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgGlobe;
