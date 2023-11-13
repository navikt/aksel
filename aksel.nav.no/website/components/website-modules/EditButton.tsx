import { useCheckAuth } from "@/hooks/useCheckAuth";
import { useSanityDocId } from "@/hooks/useSanityDocId";
import { PencilIcon } from "@navikt/aksel-icons";
import { Tooltip } from "@navikt/ds-react";

function EditButton() {
  const idCtx = useSanityDocId();
  const validUser = useCheckAuth();

  return validUser && idCtx?.id ? (
    <div className="overflow-hidden">
      <Tooltip
        content="Vises bare for innloggede redaktører"
        placement="left"
        delay={500}
      >
        <a
          href={`https://aksel.nav.no/admin/prod/intent/edit/id=${idCtx?.id}`}
          target="_blank"
          rel="noreferrer"
          className="editbutton  bg-deepblue-800 hover:bg-deepblue-700 absolute right-0 top-0 flex -translate-y-[99%] items-center gap-2 overflow-hidden rounded-tl px-2 py-1  text-white transition-transform hover:translate-x-0"
          aria-hidden
          tabIndex={-1}
        >
          <PencilIcon aria-hidden className="shrink-0 text-xl" /> Rediger side
        </a>
      </Tooltip>
    </div>
  ) : null;
}

export default EditButton;
