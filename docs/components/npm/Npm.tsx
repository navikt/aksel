import getConfig from "next/config";
import Import from "../code/Import";
import "./npm.css";

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
          <span className={"npm__.badges"}>
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
        </div>
      ))}
    </div>
  );
};

export default Npm;
