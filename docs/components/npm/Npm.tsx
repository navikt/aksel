import getConfig from "next/config";
import Import from "../code/Import";
import style from "./npm.module.css";

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
              <img
                src={`https://badgen.net/npm/v/${name}`}
                alt="Versjonsbadge for npm-pakken"
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
