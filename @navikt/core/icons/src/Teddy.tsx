import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgTeddy = forwardRef(
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
          d="m7.503 5.467-.331 1.227a5 5 0 1 0 9.656 0l-.33-1.227.97-.82a1.5 1.5 0 1 0-2.114-2.114l-.821.97-1.227-.331A5.008 5.008 0 0 0 12 3c-.455 0-.892.06-1.306.172l-1.227.33-.82-.97a1.5 1.5 0 1 0-2.114 2.114l.97.821ZM19 8c0 1.092-.25 2.125-.696 3.046l1.008-.27a3 3 0 1 1 1.553 5.796L19.267 17h.233a3.5 3.5 0 1 1 0 7h-15a3.5 3.5 0 1 1 0-7h.391l-1.597-.428a3 3 0 1 1 1.553-5.795l.826.22A6.972 6.972 0 0 1 5 8c0-.632.084-1.244.24-1.827a3.5 3.5 0 1 1 4.933-4.933A7.008 7.008 0 0 1 12 1c.632 0 1.244.084 1.827.24a3.5 3.5 0 1 1 4.933 4.933c.156.583.24 1.195.24 1.827Zm-7 7a3.001 3.001 0 0 0-2.963 2.524l-.076.484C9.513 18.544 10 19.353 10 20.5c0 .565-.11 1.07-.26 1.5h4.52a4.499 4.499 0 0 1-.26-1.5c0-1.147.487-1.956 1.04-2.492l-.077-.484A3.001 3.001 0 0 0 12 15Zm7.5 7h-3.018a3.135 3.135 0 0 1-.114-.184A2.668 2.668 0 0 1 16 20.5c0-.531.216-.869.483-1.105l.957-.248A4.613 4.613 0 0 1 18.6 19h.9a1.5 1.5 0 0 1 0 3ZM7.518 22c.037-.055.075-.116.114-.184.192-.336.368-.79.368-1.316 0-.531-.216-.869-.483-1.105l-.957-.248A4.614 4.614 0 0 0 5.4 19h-.9a1.5 1.5 0 0 0 0 3h3.018Zm-3.706-7.36 2.898.777a1 1 0 1 0 .517-1.932l-2.898-.777a1 1 0 1 0-.517 1.932Zm13.637.777 2.898-.777a1 1 0 0 0-.518-1.932l-2.897.777a1 1 0 1 0 .517 1.932ZM12 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgTeddy;
