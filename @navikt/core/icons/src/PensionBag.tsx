import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPensionBag = forwardRef(
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
          d="m14.823 2.28-1.179.196a10 10 0 0 1-3.288 0l-1.18-.197L10.2 5.213a8.563 8.563 0 0 1 3.568-.05l1.055-2.884Zm.769 3.462 1.748-4.37A1 1 0 0 0 16.247.014l-2.932.489a8 8 0 0 1-2.63 0L7.753.014A1 1 0 0 0 6.66 1.372l1.78 4.452a8.543 8.543 0 0 0-4.866 7.27l-.26 4.942A3.99 3.99 0 0 0 2 21a3 3 0 0 0 3 3h14.152c.296 0 .578-.06.834-.166A3.001 3.001 0 0 0 22 21c0-.982-.354-1.88-.94-2.577l-.439-5.552a8.544 8.544 0 0 0-5.03-7.129ZM9 20V9.568h3.084a7.08 7.08 0 0 1 1.616.176c.442.094.657.25.958.469l.126.091c.373.256.667.603.88 1.04.224.427.336.955.336 1.584 0 .608-.112 1.136-.336 1.584a2.997 2.997 0 0 1-.88 1.104l-.174.137c-.275.22-.485.387-.894.503a5.74 5.74 0 0 1-1.568.208H11V20H9Zm2-5.408h1.004c1.28 0 1.92-.555 1.92-1.664 0-.544-.17-.928-.512-1.152-.341-.224-.832-.336-1.472-.336H11v3.152Zm-6.343 4.926.61-.554.044-.823.26-4.942a6.543 6.543 0 0 1 13.057-.171l.438 5.553.05.64.415.491c.294.35.469.796.469 1.288 0 .434-.278.808-.671.945l-.057.02-.055.023a.164.164 0 0 1-.065.012H5a1 1 0 0 1-1-1c0-.587.25-1.114.657-1.482Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgPensionBag;
