import { groq } from "next-sanity";
import { GetServerSideProps } from "next/types";
import { Suspense, lazy } from "react";
import GodPraksisPage from "@/layout/god-praksis-page/GodPraksisPage";
import { getClient } from "@/sanity/client.server";

const query = groq`
{
  "tema": *[_type == "gp.tema" && count(*[_type=="aksel_artikkel" && (^._id in undertema[]->tema._ref)]) > 0]{
    title,
    description,
    slug
  },
}
`;

export const getServerSideProps: GetServerSideProps = async (
  ctx
): Promise<any> => {
  const { tema } = await getClient().fetch(query);

  return {
    props: {
      tema,
      slug: ctx.params.slug as string,
      preview: ctx.preview ?? false,
      id: "",
      title: "",
    },
    notFound: false,
  };
};

const GPPage = ({ results, tema }) => {
  return <GodPraksisPage results={results} tema={tema} />;
};

const WithPreview = lazy(() => import("@/preview"));

const Wrapper = (props: any) => {
  if (props?.preview) {
    return (
      <Suspense fallback={<GPPage {...props} />}>
        <WithPreview comp={GPPage} query={query} props={props} />
      </Suspense>
    );
  }

  return <GPPage {...props} />;
};

export default Wrapper;
