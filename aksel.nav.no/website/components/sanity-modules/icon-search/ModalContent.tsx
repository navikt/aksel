import meta from "@navikt/ds-icons/meta.json";
import { BodyShort, Button, Detail, Heading } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";

import {
  AmplitudeEvents,
  isNew,
  logAmplitudeEvent,
  Snippet,
} from "@/components";
import { SanityT } from "@/lib";
import { SuggestionBlock } from "components/website-modules/SuggestionBlock";
import { Download } from "@navikt/ds-icons";

const ModalContent = ({ icon }: { icon: string }) => {
  const [blob, setBlob]: any = useState();
  const [iconText, setIconText] = useState<string>();
  const [doc, setDoc] = useState<{
    name: string;
    pageName: string;
    description: string;
    created_at: string;
  } | null>(null);

  useEffect(() => {
    const doc = meta.find((x) => x.name === icon);
    setDoc(doc ?? null);
  }, [icon]);

  useEffect(() => {
    if (!icon) return;
    getBlob(icon);
  }, [icon]);

  async function getBlob(icon: string) {
    const iconUrl = `https://raw.githubusercontent.com/navikt/Designsystemet/master/%40navikt/icons/svg/${icon}.svg`;
    fetch(iconUrl)
      .then((r) => {
        return r.text();
      })
      .then((r) => {
        setIconText(r);
        setBlob(new Blob([r], { type: "image/svg+xml" }));
      });
  }

  const logDownload = (icon, format) => {
    logAmplitudeEvent(AmplitudeEvents.ikonnedlastning, {
      icon,
      format,
    });
  };

  const importSnippet: SanityT.Schema.kode = {
    _type: "kode",
    code: {
      language: "jsx",
      code: `// React
import { ${icon} } from "@navikt/ds-icons";

// SVG
import ${icon} from "@navikt/ds-icons/svg/${icon}.svg";`,
    },
  };

  const svgSnippet: SanityT.Schema.kode = {
    _type: "kode",
    code: {
      language: "jsx",
      code: `${iconText?.trim()}`,
    },
  };

  return (
    <div className="flex min-w-[300px] max-w-xl shrink flex-col">
      <div className="xs:flex-row mr-16 inline-flex flex-col justify-between gap-4">
        <div>
          <Heading
            spacing
            level="2"
            size="medium"
            className="flex items-center gap-2"
          >
            {icon}
            {isNew(doc?.created_at) && (
              <Detail
                className="bg-lightblue-200 h-full rounded py-1 px-2 font-semibold"
                as="span"
              >
                Ny!
              </Detail>
            )}
          </Heading>
          {doc && (
            <>
              <BodyShort className="text-text-subtle">{doc.pageName}</BodyShort>
              <BodyShort className="text-text-subtle" spacing>{`${
                doc.description && `${doc.description}`
              }`}</BodyShort>
            </>
          )}
        </div>
        <div>
          <Heading spacing level="3" size="medium">
            Last ned
          </Heading>
          <div className="mb-8 flex gap-4">
            {blob && (
              <Button
                variant="tertiary"
                as="a"
                onClick={() => {
                  logDownload(icon, "svg");
                }}
                icon={<Download title="last ned" />}
                href={URL.createObjectURL(blob)}
                download={icon}
              >
                SVG
              </Button>
            )}
          </div>
        </div>
      </div>
      <Heading spacing level="3" size="small">
        Import
      </Heading>
      <Snippet node={importSnippet} />
      <Heading spacing level="3" size="small">
        Svg
      </Heading>
      <Snippet node={svgSnippet} />
      <div className="mt-auto flex">
        <div className="text-text-default flex h-36 flex-1 items-center justify-center bg-white text-[6rem]">
          <Image
            src={`https://raw.githubusercontent.com/navikt/Designsystemet/master/%40navikt/icons/svg/${icon}.svg`}
            decoding="sync"
            width="96px"
            height="96px"
            layout="fixed"
            objectFit="contain"
            alt={icon + "eksempel lyst"}
            aria-hidden
          />
        </div>
        <div className="text-text-on-inverted flex h-36 flex-1 items-center justify-center bg-gray-900 text-[6rem]">
          <Image
            src={`https://raw.githubusercontent.com/navikt/Designsystemet/master/%40navikt/icons/svg/${icon}.svg`}
            decoding="sync"
            className="invert"
            width="96px"
            height="96px"
            layout="fixed"
            objectFit="contain"
            alt={icon + " eksempel mørk bakgrunn"}
            aria-hidden
          />
        </div>
      </div>
      {isNew(doc?.created_at) ? (
        <SuggestionBlock variant="ikon-ny" reference={`<${icon} />`} />
      ) : (
        <SuggestionBlock variant="ikon" reference={`<${icon} />`} />
      )}
    </div>
  );
};

export default ModalContent;
