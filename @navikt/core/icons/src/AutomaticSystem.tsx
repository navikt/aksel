import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgAutomaticSystem = forwardRef(
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
          d="M2.909 7.829A10.002 10.002 0 0 1 12 2c5.523 0 10 4.477 10 10h2c0-6.627-5.373-12-12-12a11.97 11.97 0 0 0-9 4.063V2H1v5.411l1.909.418ZM13.887 4h-3.774l-.636 1.908-1.8-.9-2.668 2.67.899 1.799L4 10.113v3.774l1.908.636-.9 1.8 2.67 2.668 1.799-.899.636 1.908h3.774l.637-1.908 1.798.9 2.67-2.67-.9-1.798L20 13.887v-3.774l-1.908-.636.9-1.8-2.67-2.668-1.798.899L13.886 4Zm-2.952 3.857L11.555 6h.891l.62 1.857.443.168c.079.03.157.063.234.097l.433.195 1.751-.875.631.63-.875 1.752.195.433c.034.077.067.155.097.234l.168.444 1.857.619v.892l-1.857.62-.168.443a4.13 4.13 0 0 1-.098.234l-.195.433.876 1.751-.63.63-1.752-.875-.433.195a4.13 4.13 0 0 1-.234.098l-.443.168-.62 1.857h-.892l-.62-1.857-.443-.168a4.25 4.25 0 0 1-.234-.097l-.433-.195-1.751.875-.631-.63.875-1.752-.195-.433a4.22 4.22 0 0 1-.097-.234l-.168-.444L6 12.446v-.892l1.857-.619.168-.443c.03-.08.063-.158.097-.235l.195-.433-.875-1.751.63-.631 1.752.875.433-.195a4.19 4.19 0 0 1 .235-.097l.443-.168ZM12 22c4.032 0 7.51-2.387 9.091-5.829L23 16.59V22h-2v-2.063A11.97 11.97 0 0 1 12 24C5.373 24 0 18.627 0 12h2c0 5.523 4.477 10 10 10Zm0-9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgAutomaticSystem;
