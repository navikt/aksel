import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPeopleInCircle = forwardRef(
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
          d="M3 12a9 9 0 1 1 14.882 6.812 6.002 6.002 0 0 0-11.764 0A8.98 8.98 0 0 1 3 12Zm5 8.064A8.963 8.963 0 0 0 12 21a8.963 8.963 0 0 0 4-.936V20a4 4 0 0 0-8 0v.064ZM12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm0 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM8 9a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgPeopleInCircle;
