import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgTeddyFilled = forwardRef(
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
          d="M6.366 5.933a3.001 3.001 0 1 1 3.567-3.567A5.988 5.988 0 0 1 12 2c.726 0 1.423.13 2.067.366a3.001 3.001 0 1 1 3.567 3.567C17.871 6.577 18 7.273 18 8a5.978 5.978 0 0 1-1.569 4.046l2.33-.625a2 2 0 1 1 1.036 3.864l-3.158.846c.233.577.361 1.208.361 1.869v1.277c.408-.178.86-.277 1.333-.277H20.5a2.5 2.5 0 0 1 0 5h-3.833c-.603 0-1.13-.32-1.423-.799a4.212 4.212 0 0 1-2.475.799h-1.538a4.212 4.212 0 0 1-2.475-.799c-.292.48-.82.799-1.423.799H3.5a2.5 2.5 0 0 1 0-5h2.167c.474 0 .925.099 1.333.277V18c0-.602.107-1.18.302-1.715l-3.734-1a2 2 0 0 1 1.035-3.864l3.187.854A5.982 5.982 0 0 1 6 8c0-.726.13-1.423.366-2.067ZM12 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm2 8c0 1.657-.895 3-2 3s-2-1.343-2-3 .895-3 2-3 2 1.343 2 3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgTeddyFilled;
