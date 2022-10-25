import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSocialAidFilled = forwardRef(
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
          d="M12 .942a3.595 3.595 0 0 0-4.952.105 3.542 3.542 0 0 0-.107 4.92l-.003.002L12 11l5.062-5.031-.003-.003a3.542 3.542 0 0 0-.107-4.92A3.595 3.595 0 0 0 12 .943ZM9 14h5a2 2 0 1 1 0 4h-4v2.025h4.018a3.96 3.96 0 0 0 3.262-6.203l3.095-2.36a2.256 2.256 0 0 1 3.023 3.329l-7.96 8.584v-.005c-.366.389-.884.631-1.459.631H0V17a5 5 0 0 1 9-3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSocialAidFilled;
