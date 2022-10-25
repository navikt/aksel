import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgWaitingRoomFilled = forwardRef(
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
          d="M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12Zm0-9a1 1 0 0 1 1 1v1.586l.707.707a1 1 0 0 1-1.414 1.414L5 6.414V4a1 1 0 0 1 1-1Zm13.03 5.757a1 1 0 0 1 1.94.486l-.847 3.386a2 2 0 0 1-1.548 1.476l-4.38.876a1 1 0 0 1-.391-1.962l4.38-.876.846-3.386Zm2.974.15a1 1 0 0 1 1.992.185l-.56 6.042a3 3 0 0 1-2.987 2.723H19V24h-2v-6.143h-2a1 1 0 1 1 0-2h5.45a1 1 0 0 0 .995-.908l.56-6.041Zm-10.897 6.644a1 1 0 0 1 1.787.898l-3.366 6.696a1 1 0 1 1-1.787-.898l3.366-6.696ZM23 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgWaitingRoomFilled;
