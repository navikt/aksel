import * as Icons from "@navikt/ds-icons";
import fileDownload from "js-file-download";
import { renderToString } from "react-dom/server";

export const downloadSvg = (icon: string) => {
  const Icon = Icons[icon];
  const file = new Blob([renderToString(<Icon />)], { type: "text/plain" });
  fileDownload(file, `${icon}.svg`);
};
