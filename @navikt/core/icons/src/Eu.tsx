import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
import { useId } from "./util/useId";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgEu = forwardRef(
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
          d="M12.064.585a.2.2 0 0 0-.38 0l-.475 1.46a.2.2 0 0 1-.19.138H9.484a.2.2 0 0 0-.117.362l1.241.902a.2.2 0 0 1 .073.224l-.474 1.46a.2.2 0 0 0 .307.223l1.242-.902a.2.2 0 0 1 .235 0l1.242.902a.2.2 0 0 0 .308-.224l-.475-1.46a.2.2 0 0 1 .073-.223l1.242-.902a.2.2 0 0 0-.118-.362H12.73a.2.2 0 0 1-.19-.138l-.475-1.46ZM3.991 3.722a.2.2 0 0 0-.27.269l.71 1.393a.2.2 0 0 1-.036.232L3.29 6.722a.2.2 0 0 0 .172.339l1.544-.245a.2.2 0 0 1 .21.107l.71 1.393a.2.2 0 0 0 .375-.06l.245-1.544a.2.2 0 0 1 .166-.166L8.256 6.3a.2.2 0 0 0 .06-.375l-1.393-.71a.2.2 0 0 1-.107-.21l.245-1.544a.2.2 0 0 0-.34-.172L5.617 4.395a.2.2 0 0 1-.232.037l-1.393-.71ZM.585 12.219a.2.2 0 0 1 0-.38l1.572-.512a.2.2 0 0 0 .139-.19V9.484a.2.2 0 0 1 .361-.117l.972 1.337a.2.2 0 0 0 .223.073l1.572-.511a.2.2 0 0 1 .224.308l-.972 1.337a.2.2 0 0 0 0 .235l.972 1.337a.2.2 0 0 1-.224.308l-1.572-.51a.2.2 0 0 0-.223.072l-.972 1.337a.2.2 0 0 1-.361-.118V12.92a.2.2 0 0 0-.139-.19l-1.572-.511Zm3.137 7.601a.2.2 0 0 0 .269.27l1.393-.71a.2.2 0 0 1 .232.036l1.106 1.105a.2.2 0 0 0 .339-.172l-.245-1.544a.2.2 0 0 1 .107-.21l1.393-.71a.2.2 0 0 0-.06-.375l-1.544-.245a.2.2 0 0 1-.166-.166L6.3 15.555a.2.2 0 0 0-.375-.06l-.71 1.393a.2.2 0 0 1-.21.107l-1.544-.245a.2.2 0 0 0-.172.34l1.105 1.105a.2.2 0 0 1 .037.232l-.71 1.393Zm8.342 3.3a.2.2 0 0 1-.38 0l-.475-1.46a.2.2 0 0 0-.19-.137H9.484a.2.2 0 0 1-.117-.362l1.241-.902a.2.2 0 0 0 .073-.224l-.474-1.46a.2.2 0 0 1 .308-.223l1.241.902a.2.2 0 0 0 .235 0l1.242-.902a.2.2 0 0 1 .308.224l-.475 1.46a.2.2 0 0 0 .073.223l1.242.902a.2.2 0 0 1-.118.362h-1.535a.2.2 0 0 0-.19.138l-.474 1.46Zm7.756-3.03a.2.2 0 0 0 .27-.27l-.71-1.393a.2.2 0 0 1 .036-.232l1.105-1.106a.2.2 0 0 0-.172-.339l-1.544.245a.2.2 0 0 1-.21-.107l-.71-1.393a.2.2 0 0 0-.375.06l-.245 1.544a.2.2 0 0 1-.166.166l-1.544.245a.2.2 0 0 0-.06.375l1.393.71a.2.2 0 0 1 .107.21l-.245 1.544a.2.2 0 0 0 .34.173l1.105-1.106a.2.2 0 0 1 .232-.037l1.393.71Zm3.594-8.252a.2.2 0 0 1 0 .38l-1.572.511a.2.2 0 0 0-.138.19v1.654a.2.2 0 0 1-.362.117l-.971-1.337a.2.2 0 0 0-.224-.073l-1.572.511a.2.2 0 0 1-.223-.308l.971-1.337a.2.2 0 0 0 0-.235l-.971-1.337a.2.2 0 0 1 .223-.308l1.572.51a.2.2 0 0 0 .224-.072l.971-1.337a.2.2 0 0 1 .362.117v1.653a.2.2 0 0 0 .138.19l1.572.511ZM20.09 3.991a.2.2 0 0 0-.269-.269l-1.393.71a.2.2 0 0 1-.232-.037L17.089 3.29a.2.2 0 0 0-.339.172l.245 1.544a.2.2 0 0 1-.107.21l-1.393.71a.2.2 0 0 0 .06.375l1.544.245a.2.2 0 0 1 .166.166l.245 1.544a.2.2 0 0 0 .375.06l.71-1.393a.2.2 0 0 1 .21-.107l1.544.245a.2.2 0 0 0 .172-.34l-1.105-1.105a.2.2 0 0 1-.037-.232l.71-1.393Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
export default SvgEu;
