import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCantine1Filled = forwardRef(
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
          d="M1 3v.975c0 .573.14 1.183.507 1.73.37.553.93.974 1.653 1.236.455.164.625.315.699.415.066.09.141.254.141.644v1h2V8c0-.642-.124-1.28-.533-1.832-.4-.543-.98-.875-1.627-1.109-.378-.136-.57-.315-.673-.469A1.08 1.08 0 0 1 3 3.975V3H1ZM0 19h24a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2Zm1.194-9a1 1 0 0 0-.984 1.176l.598 3.351A3 3 0 0 0 3.762 17h2.476a3 3 0 0 0 2.954-2.473l.598-3.351A1 1 0 0 0 8.806 10H1.194Zm9.901-6a1 1 0 0 0-.996 1.09l.656 7.21c1.51-1.4 3.858-2.3 6.495-2.3.068 0 .137 0 .204.002l.447-4.911A1 1 0 0 0 16.905 4h-5.81Zm10.732 11c-.61-1.725-2.764-3-5.327-3s-4.716 1.275-5.327 3H10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2h-1.173Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgCantine1Filled;
