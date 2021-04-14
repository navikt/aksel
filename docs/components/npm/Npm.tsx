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
          <Import from={name} imports={imports} namedExport={namedExport} />
          {/* TODO: Move to separate component? */}
          {/* <span className={style.badges}>
          <span className={"npm__.badges"}>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.npmjs.com/package/${name}`}
            >
              <img
                src={`https://badgen.net/npm/v/${name}/?style=for-the-badge&logo=appveyor`}
                alt="Versjonsbadge for npm-pakken"
              />
            </a>
          </span> */}
        </div>
      ))}
    </div>
  );
};

export default Npm;
