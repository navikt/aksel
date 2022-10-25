import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSettingsFilled = forwardRef(
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
          d="m14 0 1.195 3.584c.168.063.333.132.496.205l3.38-1.688L21.9 4.929l-1.689 3.38c.074.162.143.328.206.496L24 10v4l-3.584 1.196a8.933 8.933 0 0 1-.206.497l1.69 3.378L19.07 21.9l-3.379-1.689a8.933 8.933 0 0 1-.496.206L14 24h-4l-1.195-3.584a8.939 8.939 0 0 1-.497-.206l-3.38 1.69-2.827-2.829 1.688-3.38a8.94 8.94 0 0 1-.205-.496L0 14v-4l3.583-1.194c.064-.168.133-.334.206-.498l-1.688-3.38 2.828-2.827 3.38 1.688c.163-.073.329-.142.497-.206L10 0h4Zm-2 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSettingsFilled;
