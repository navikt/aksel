import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCognition = forwardRef(
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
          d="M2.033 10.31C2.133 4.599 6.76 0 12.454 0h.554c8.332 0 13.626 8.984 9.636 16.352l-.76 1.403V24H19.9v-6.755l1.002-1.85C24.17 9.359 19.833 2 13.008 2h-.554c-4.66 0-8.438 3.806-8.438 8.5v.186L1.987 16H5.01v3c0 1.105.889 2 1.985 2h3.971v3H8.98v-1H6.994c-2.193 0-3.97-1.79-3.97-4v-1H1.987C.594 18-.366 16.592.134 15.282l1.899-4.972ZM8.483 8a.498.498 0 0 0 .497-.5c0-.276-.222-.5-.497-.5a.498.498 0 0 0-.496.5c0 .276.222.5.496.5Zm0 2c.683 0 1.301-.278 1.75-.727l1.886 1.013-.432.724A2.49 2.49 0 0 0 8.98 13.5a2.49 2.49 0 0 0 2.482 2.5 2.49 2.49 0 0 0 2.482-2.5 2.5 2.5 0 0 0-.515-1.525l.445-.746 2.06 1.107A2.49 2.49 0 0 0 18.41 15a2.49 2.49 0 0 0 2.483-2.5A2.49 2.49 0 0 0 18.41 10a2.46 2.46 0 0 0-1.564.56l-1.95-1.048.31-.522a2.491 2.491 0 0 0 2.708-2.49c0-1.38-1.111-2.5-2.482-2.5a2.49 2.49 0 0 0-2.481 2.5 2.5 2.5 0 0 0 .514 1.525l-.324.544-2.178-1.17A2.49 2.49 0 0 0 8.483 5a2.49 2.49 0 0 0-2.481 2.5A2.49 2.49 0 0 0 8.483 10Zm10.424 2.5c0 .276-.223.5-.497.5a.498.498 0 0 1-.496-.5c0-.276.222-.5.496-.5s.497.224.497.5ZM11.46 14a.498.498 0 0 0 .497-.5c0-.276-.222-.5-.497-.5a.498.498 0 0 0-.496.5c0 .276.222.5.496.5Zm4.468-7.5c0 .276-.223.5-.497.5a.498.498 0 0 1-.496-.5c0-.276.222-.5.496-.5s.497.224.497.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgCognition;
