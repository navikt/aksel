import { IconPage } from "@/web/icon-page/Page";
import meta from "@navikt/aksel-icons/metadata";
import { useRouter } from "next/router";
import NotFound from "../404";

const Page = () => {
  const { query } = useRouter();

  if ((query?.name?.[0] && !meta[query.name[0]]) || query?.name?.length > 1) {
    return <NotFound />;
  }

  return <IconPage name={query?.name?.[0] ?? ""} />;
};

export default Page;
