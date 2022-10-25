import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgNotes = forwardRef(
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
        viewBox="0 0 25 24"
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
          d="m23.027 1.011.033.034c1.269 1.312 1.28 3.362.146 4.742L14.18 16.756l-7.22 3.264 1.878-7.744 7.633-9.278.003-.003 1.411-1.715.153-.171.03-.031c1.245-1.272 3.316-1.487 4.756-.254l.036.03.166.157Zm-1.405 1.424c.52.538.566 1.44.04 2.081l-8.73 10.61L9.87 16.51l.805-3.317 8.728-10.61.096-.106c.571-.584 1.452-.624 2.026-.134l.097.092ZM2 2h12.704l-1.646 2H4v18h16v-9.169l2-2.43V24H2V2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgNotes;
