/**
 * https://github.com/navikt/detsombetyrnoe/blob/main/src/components/PreviewBanner.tsx#L17
 */
import { Edit } from "@navikt/ds-icons";
import { Tooltip } from "@navikt/ds-react";
import cl from "classnames";
/* import { useCurrentUser } from "lib/sanity/useCurrentUser"; */
import { useContext } from "react";
import { IdContext } from "./utils";

function EditButton({ variant }: { variant: "ds" | "aksel" }): JSX.Element {
  /* const { data } = useCurrentUser(); */
  const idCtx = useContext(IdContext);
  const data = null;

  return data && idCtx?.id ? (
    <>
      <div className="overflow-hidden">
        <Tooltip
          content="Bare tilgjengelig for innloggede redaktører"
          placement="left"
          delay={500}
        >
          <a
            href={`https://verktoykasse.sanity.studio/intent/edit/id=${idCtx?.id}`}
            target="_blank"
            rel="noreferrer"
            className={cl(
              "editbutton absolute top-0 right-0 flex  -translate-y-[99%] items-center gap-2 overflow-hidden rounded-tl px-2 py-1  text-white transition-transform hover:translate-x-0",
              {
                "bg-gray-900 hover:bg-gray-700": variant === "ds",
                "bg-deepblue-800 hover:bg-deepblue-700": variant === "aksel",
              }
            )}
            aria-hidden
            tabIndex={-1}
          >
            <Edit aria-hidden className="shrink-0" /> Rediger side
          </a>
        </Tooltip>
      </div>
    </>
  ) : null;
}

export default EditButton;
