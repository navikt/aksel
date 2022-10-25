import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCantine1 = forwardRef(
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
          d="M1 3v.975c0 .573.14 1.183.507 1.73.37.553.93.974 1.653 1.236.455.164.625.315.699.415.066.09.141.254.141.644v1h2V8c0-.642-.124-1.28-.533-1.832-.4-.543-.98-.875-1.627-1.109-.378-.136-.57-.315-.673-.469A1.08 1.08 0 0 1 3 3.975V3H1ZM0 19h24a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2Zm2.389-7 .388 2.176a1 1 0 0 0 .985.824h2.476a1 1 0 0 0 .985-.824L7.61 12H2.39Zm-1.195-2a1 1 0 0 0-.984 1.176l.598 3.351A3 3 0 0 0 3.762 17h2.476a3 3 0 0 0 2.954-2.473l.598-3.351A1 1 0 0 0 8.806 10H1.194ZM12.19 6l.457 5.02a7.873 7.873 0 0 0-1.892 1.28l-.656-7.21A1 1 0 0 1 11.095 4h5.81a1 1 0 0 1 .996 1.09l-.447 4.912a11.573 11.573 0 0 0-2.021.144L15.81 6h-3.62Zm9.637 9H23a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2h1.173c.61-1.725 2.764-3 5.327-3s4.716 1.275 5.327 3Zm-2.356 0a2.88 2.88 0 0 0-.258-.211c-.618-.45-1.571-.789-2.713-.789-1.142 0-2.095.34-2.713.789a2.88 2.88 0 0 0-.258.211h5.942Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgCantine1;
