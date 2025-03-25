"use client";

/* @ts-expect-error Workspace cant resolve valid import */
import { Chips, ChipsToggle } from "@navikt/ds-react/Chips";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { useKodeEksempler } from "./KodeEksempler.provider";

function KodeEksemplerNavigation(props: {
  value: ExtractPortableComponentProps<"kode_eksempler">["value"];
}) {
  const { dir } = props.value;
  const { activeExample } = useKodeEksempler();

  if (!dir?.filer || dir.filer.length === 0) {
    return null;
  }

  return (
    <div className="mb-5 max-w-xl">
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
              {fil.title}
            </ChipsToggle>
          );
        })}
      </Chips>
    </div>
  );
}

export { KodeEksemplerNavigation };
