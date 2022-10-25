import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHearingImpairedWireless = forwardRef(
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
        viewBox="0 0 25 25"
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
          d="M0 7.64C.032 3.122 3.966-.453 8.481.048c1.162.129 2.187.382 3.133.903.948.523 1.747 1.276 2.517 2.303a1.024 1.024 0 0 1-1.639 1.228c-.647-.864-1.239-1.391-1.867-1.737-.63-.348-1.368-.55-2.37-.662-3.284-.364-6.184 2.245-6.207 5.573L0 7.64Zm3.781 0c.018-2.567 2.497-4.408 4.961-3.669a3.85 3.85 0 0 1 2.553 2.487 1.024 1.024 0 1 1-1.945.641c-.179-.543-.61-.99-1.196-1.166a1.808 1.808 0 0 0-2.325 1.719v.815c.13.093.27.208.409.347.533.534 1.009 1.38 1.009 2.615a1.024 1.024 0 0 1-2.048 0c0-.656-.234-.991-.41-1.167a1.194 1.194 0 0 0-.326-.231l-.682-.227V7.64ZM1.748 21.213 18.132 4.828 16.684 3.38.3 19.763l1.448 1.448Zm12.164-3.796.724-.724a6.816 6.816 0 0 1 9.64 0l.724.724-1.448 1.448-.724-.724a4.769 4.769 0 0 0-6.744 0l-.724.724-1.448-1.448Zm2.772 2.347-.724.724 1.448 1.449.724-.724a1.872 1.872 0 0 1 2.648 0l.724.724 1.448-1.448-.724-.725a3.92 3.92 0 0 0-5.544 0Zm3.796 3.796a1.024 1.024 0 1 1-2.049 0 1.024 1.024 0 0 1 2.049 0Zm-6.197-11.808a1.024 1.024 0 1 0-1.944-.645l-2.294 6.921v.002c-.308.913-.784 1.602-1.384 2.063-.594.456-1.37.732-2.363.728-.64-.002-1.241-.226-1.672-.624a2.678 2.678 0 0 1-.038-.035l-.005-.005-.002-.002a1.024 1.024 0 0 0-1.446 1.45l.002.003.003.002.007.007.02.02.07.066c.846.78 1.956 1.162 3.053 1.166 1.402.006 2.629-.393 3.617-1.151.982-.753 1.668-1.813 2.08-3.037l2.296-6.93Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgHearingImpairedWireless;
