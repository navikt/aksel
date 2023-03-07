import { IconPage } from "components/website-modules/icon-page/IconPage";

import meta from "@navikt/aksel-icons/metadata";

const Page = (props: { name: string }) => {
  return <IconPage name={props.name} />;
};

export default Page;

export async function getServerSideProps(context) {
  if (
    (context?.query?.name?.[0] && !meta[context.query.name[0]]) ||
    context?.query?.name?.length > 1
  ) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: { name: context?.query?.name?.[0] ?? "" },
  };
}
