import { BodyShort } from "@navikt/ds-react";
import styles from "./Designsystemet.module.css";

const eyebrowMap = {
  komponent_artikkel: "Komponenter",
  ds_artikkel: "Grunnleggende",
  templates_artikkel: "Maler",
};

type DesignsystemetEyebrowProps = {
  type?: "komponent_artikkel" | "ds_artikkel" | "templates_artikkel";
  text?: string;
};

function DesignsystemetEyebrow({ type, text }: DesignsystemetEyebrowProps) {
  if (text) {
    return <BodyShort className={styles.pageHeaderEyebrow}>{text}</BodyShort>;
  }

  if (type) {
    return (
      <BodyShort className={styles.pageHeaderEyebrow}>
        {eyebrowMap[type]}
      </BodyShort>
    );
  }

  return null;
}

export { DesignsystemetEyebrow };
export type { DesignsystemetEyebrowProps };
