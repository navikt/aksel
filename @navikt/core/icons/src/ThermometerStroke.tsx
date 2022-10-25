import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgThermometerStroke = forwardRef(
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
          d="m21.99 4.933-9.33 9.33a2.066 2.066 0 0 1-1.34.603L9.034 15h-.01l-.003-.001a.036.036 0 0 1-.012-.009.039.039 0 0 1-.009-.012V14.965l.133-2.284c.03-.505.244-.982.602-1.34l9.331-9.331.01-.008A.038.038 0 0 1 19.091 2l.014.002.01.008 2.875 2.875a.028.028 0 0 1 .008.01.038.038 0 0 1 .002.014.038.038 0 0 1-.002.014.029.029 0 0 1-.008.01Zm1.414-1.462a2.033 2.033 0 0 1 0 2.876l-9.33 9.33a4.067 4.067 0 0 1-2.637 1.185l-2.284.134a2.032 2.032 0 0 1-.665-.07l-3.78 3.781-1.415-1.414 3.78-3.781a2.032 2.032 0 0 1-.07-.665l.135-2.284a4.067 4.067 0 0 1 1.184-2.636L17.653.596a2.033 2.033 0 0 1 2.876 0l2.875 2.875ZM.293 22.293l2-2 1.414 1.414-2 2a1 1 0 0 1-1.414-1.414Zm18-18-5 5 1.414 1.414 5-5-1.414-1.414Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgThermometerStroke;
