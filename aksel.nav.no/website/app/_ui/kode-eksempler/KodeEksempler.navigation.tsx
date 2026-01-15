"use client";

import { BodyLong } from "@navikt/ds-react";
import { Chips, ChipsToggle } from "@navikt/ds-react/Chips";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { MarkdownText } from "@/app/_ui/typography/MarkdownText";
import styles from "./KodeEksempler.module.css";
import { useKodeEksempler } from "./KodeEksempler.provider";

function KodeEksemplerNavigation(props: {
  value: ExtractPortableComponentProps<"kode_eksempler">["value"];
}) {
  const { dir } = props.value;
  const { activeExample } = useKodeEksempler();

  if (!dir?.filer || dir.filer.length < 2) {
    return null;
  }

  const desc = activeExample.current?.description;

  return (
    <div className={styles.kodeEksemplerNavigation}>
      <Chips>
        {dir.filer.map((fil) => {
          if (!fil.navn) {
            return null;
          }

          return (
            <ChipsToggle
              checkmark={false}
              key={fil._key}
              value={fil.navn}
              selected={activeExample.current?.navn === fil.navn}
              onClick={() => activeExample.update(fil.navn)}
            >
              {fil.title ?? ""}
            </ChipsToggle>
          );
        })}
      </Chips>
      {desc && (
        <BodyLong>
          <MarkdownText>{desc}</MarkdownText>
        </BodyLong>
      )}
    </div>
  );
}

export { KodeEksemplerNavigation };
