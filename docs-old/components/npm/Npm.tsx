import getConfig from "next/config";
/* import { Link } from "@navikt/ds-react";
import { ExternalLink } from "@navikt/ds-icons"; */
import Preview from "../code-preview/Preview";
import Import from "../code/Import";
import style from "./npm.module.css";

/* interface Props {} */

const Npm = ({
  packName,
  imports,
  namedExport,
}: {
  packName: string;
  imports: string | string[];
  namedExport?: boolean;
}) => {
  const { publicRuntimeConfig } = getConfig();

  const packs = publicRuntimeConfig.packages.filter(
    (pack) => pack.name === packName
  );

  return (
    <div>
      {packs.map(({ name, data }) => (
        <div key={name}>
          <span className={style.badges}>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.npmjs.com/package/${name}`}
            >
              <img src={`https://badgen.net/npm/v/${name}`} alt="123" />
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href={`https://bundlephobia.com/result?p=${name}`}
            >
              <img
                src={`https://badgen.net/bundlephobia/tree-shaking/${name}`}
                alt="123"
              />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://bundlephobia.com/result?p=${name}`}
            >
              <img
                src={`https://badgen.net/bundlephobia/min/${name}`}
                alt="123"
              />
            </a>
          </span>
          <Import from={name} imports={imports} namedExport={namedExport} />
          {/* <Bash
            code={`<link src="https://unpkg.com/${name}@${data.version}/" />`}
            language="html"
            copy
          /> */}
        </div>
      ))}
    </div>
  );
};

export default Npm;
