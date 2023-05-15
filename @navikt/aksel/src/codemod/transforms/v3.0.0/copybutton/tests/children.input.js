import { CopyToClipboard } from "@navikt/ds-react-internal";

/* eslint-disable react/jsx-no-undef */
export const Page = () => {
  return (
    <CopyToClipboard
      popoverText="popoverText"
      copyText="Text to copy"
      iconPosition="left"
      size="medium"
      popoverPlacement="bottom-end"
    >
      {text}
    </CopyToClipboard>
  );
};
