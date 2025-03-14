import { PencilIcon } from "@navikt/aksel-icons";
import { useSanityData } from "./SanityDataProvider";

function EditButton() {
  const sanityCtx = useSanityData();

  return sanityCtx?.validUser && sanityCtx?.id ? (
    <a
      href={`https://aksel.nav.no/admin/prod/intent/edit/id=${sanityCtx?.id}`}
      target="_blank"
      rel="noreferrer"
      className="absolute right-0 top-0 flex -translate-y-[99%] items-center gap-2 overflow-hidden rounded-tl bg-deepblue-800 px-2 py-1 text-white transition-transform hover:translate-x-0 hover:bg-deepblue-700"
    >
      <PencilIcon aria-hidden className="shrink-0 text-xl" /> Rediger side
    </a>
  ) : null;
}

export default EditButton;
