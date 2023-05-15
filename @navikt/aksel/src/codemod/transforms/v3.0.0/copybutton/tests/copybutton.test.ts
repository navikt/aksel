import { check } from "../../../../utils/check";

const migration = "copybutton";
const fixtures = ["complete", "idempotent", "alias", "cleanup", "import"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}

/*
<CopyToClipboard
  popoverText={props.popoverText}
  copyText={props?.copyText}
  iconPosition={props?.iconPosition}
  size={props?.size}
  popoverPlacement={props?.popoverPlacement}
>
  {props.text}
</CopyToClipboard>

// children?: React.ReactNode;
// copyText: string;
popoverText: string;
popoverPlacement?:
  | "top"
  | "bottom"
  | "right"
  | "left"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "right-start"
  | "right-end"
  | "left-start"
  | "left-end";
title?: string;
variant?: "tertiary";

<CopyButton>
-

*/

/*

size?: "medium" | "small";
variant?: "action" | "neutral";
copyText: string;
text?: string;
activeText?: string;
onActiveChange?: (state: boolean) => void;

icon?: React.ReactNode;

activeIcon?: React.ReactNode;
activeDuration?: number;
*/

/*


// props
children -> text
popoverText X
popoverPlacement X
variant X
title ?

// rest
CopyToClipboard -> CopyButton
import { CopyToClipboard } from "@navikt/ds-react-internal"; -> import { CopyButton } from "@navikt/ds-react";


*/
