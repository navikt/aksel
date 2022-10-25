import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSightless = forwardRef(
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
          d="m3.707 23 19-19.545L21.293 2l-3.97 4.085a11.794 11.794 0 0 0-5.383-1.3c-4.324 0-8.143 2.308-11.452 6.634L0 12.056l.487.636c1.7 2.222 3.535 3.916 5.515 5.037l-3.71 3.816L3.707 23Zm3.78-6.797c-1.696-.847-3.34-2.215-4.924-4.147 2.915-3.558 6.04-5.214 9.377-5.214.066 0 .131 0 .197.002a4.916 4.916 0 0 0-3.4 1.505c-1.836 1.889-1.945 4.883-.326 6.903l-.925.95Zm2.349-2.417c-.844-1.206-.738-2.898.316-3.983a2.939 2.939 0 0 1 3.871-.325l-4.187 4.308Zm5.613-5.774.363-.373a9.798 9.798 0 0 0-2.763-.735c.86.138 1.691.508 2.4 1.108Zm6.258 1.615-8 8.23a.98.98 0 0 1-1.414 0 1.05 1.05 0 0 1 0-1.455l8-8.23a.98.98 0 0 1 1.414 0 1.05 1.05 0 0 1 0 1.455Zm2 3.086a1.05 1.05 0 0 0 0-1.455.98.98 0 0 0-1.414 0l-4 4.115a1.05 1.05 0 0 0 0 1.455.98.98 0 0 0 1.414 0l4-4.115Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgSightless;
