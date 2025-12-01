import { BodyShort, CopyButton } from "@navikt/ds-react";
import docs from "@navikt/ds-tokens/docs.json";
import styles from "../../TokenView.module.css";
import { Grid } from "../Grid";
import { getColorString, sanitizeName } from "../utilities";

export const GlobalView = ({ cat }: { cat: string }) => {
  const colors: { name: string; value: string }[] = docs[cat];
  return (
    <Grid>
      {colors.map((x) => {
        return (
          <div
            key={x.name}
            id={x.name}
            className={styles.legacyTokenViewGlobalBlock}
          >
            <div
              style={{
                background: x.value,
                boxShadow: `inset 0 2px 4px 0 rgba(0,0,0,0.06)`,
              }}
              className={styles.legacyTokenViewBlockOuter}
            >
              <div
                className={`${styles.legacyTokenViewBlockInner} ${styles.legacyTokenViewCheckeredBg}`}
              />
            </div>
            <dl>
              <dt className={styles.legacyTokenViewDt}>
                <span className={styles.legacyTokenViewName}>
                  {sanitizeName(x.name)}
                </span>
                <CopyButton
                  copyText={x.name}
                  title={`${sanitizeName(x.name)} kopier`}
                  size="small"
                />
              </dt>

              <BodyShort as="dd" textColor="subtle" size="small">
                {getColorString(x.value)}
              </BodyShort>
            </dl>
          </div>
        );
      })}
    </Grid>
  );
};
