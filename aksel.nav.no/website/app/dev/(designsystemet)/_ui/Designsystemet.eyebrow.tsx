import { BodyShort } from "@navikt/ds-react";
import styles from "./Designsystemet.module.css";

const eyebrowMap = {
  komponent_artikkel: "Komponenter",
  ds_artikkel: "Grunnleggende",
  templates_artikkel: "Maler",
};

type DesignsystemetEyebrowProps = {
  type?: "komponent_artikkel" | "ds_artikkel" | "templates_artikkel";
};

function DesignsystemetEyebrow({ type }: DesignsystemetEyebrowProps) {
  if (!type) {
    return null;
  }

  return (
    <BodyShort className={styles.pageHeaderEyebrow}>
      {eyebrowMap[type]}
    </BodyShort>
  );
}

export { DesignsystemetEyebrow };
export type { DesignsystemetEyebrowProps };
