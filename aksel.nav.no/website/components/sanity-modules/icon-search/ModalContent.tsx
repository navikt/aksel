import * as Icons from "@navikt/ds-icons";
import meta from "@navikt/ds-icons/meta.json";
import { BodyShort, Button, Detail, Heading } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";

import {
  AmplitudeEvents,
  isNew,
  logAmplitudeEvent,
  Snippet,
} from "@/components";
import { SanityT } from "@/lib";
import { downloadSvg } from "./downloads";

const ModalContent = ({ icon }: { icon: string }) => {
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

  const Icon = Icons[icon];

  const svgSnippet: SanityT.Schema.kode = {
    _type: "kode",
    code: {
      language: "jsx",
      code: `${renderToString(<Icon />)}`,
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
              <BodyShort className="text-text-muted">{doc.pageName}</BodyShort>
              <BodyShort className="text-text-muted" spacing>{`${
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
            <Button
              variant="tertiary"
              onClick={() => {
                downloadSvg(icon);
                logDownload(icon, "svg");
              }}
              icon={<Icons.Download title="last ned" />}
            >
              SVG
            </Button>
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
        <div className="text-text flex h-36 flex-1 items-center justify-center bg-white text-[6rem]">
          <Icon />
        </div>
        <div className="text-text-inverted flex h-36 flex-1 items-center justify-center bg-gray-900 text-[6rem]">
          <Icon />
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
