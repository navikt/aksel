import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgWaitingRoom = forwardRef(
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
          d="M10 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm2 0A6 6 0 1 1 0 6a6 6 0 0 1 12 0Zm8.242 2.03a1 1 0 0 0-1.212.727l-.847 3.386-4.38.876a1 1 0 0 0 .393 1.962l4.38-.876a2 2 0 0 0 1.547-1.476l.847-3.386a1 1 0 0 0-.728-1.213Zm2.85-.026a1 1 0 0 0-1.088.904l-.559 6.041a1 1 0 0 1-.996.908H15a1 1 0 0 0 0 2H17V24h2v-6.143h1.45a3 3 0 0 0 2.986-2.723l.56-6.042a1 1 0 0 0-.904-1.088ZM12.45 15.107a1 1 0 0 0-1.342.444L7.74 22.247a1 1 0 1 0 1.787.898l3.366-6.696a1 1 0 0 0-.445-1.343ZM6 3a1 1 0 0 1 1 1v1.586l.707.707a1 1 0 0 1-1.414 1.414L5 6.414V4a1 1 0 0 1 1-1Zm15 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm2 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgWaitingRoom;
