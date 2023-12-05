import { groq } from "next-sanity";
import { GetServerSideProps } from "next/types";
import { Suspense, lazy } from "react";
import GodPraksisPage from "@/layout/god-praksis-page/GodPraksisPage";

const query = groq`
*[_type == "gp.tema" && count(*[references(^._id)]) > 0 && count(*[references(^._id) && _type == "gp.tema.undertema"])] {
  heading,
}
`;

export const getServerSideProps: GetServerSideProps = async (
  ctx
): Promise<any> => {
  console.log(ctx.query);
  /* const { blogg, morePosts } = await getClient().fetch(query, {
    slug: `produktbloggen/${ctx.params.slug}`,
  }); */

  return {
    props: {
      slug: ctx.params.slug as string,
      preview: ctx.preview ?? false,
      id: "",
      title: "",
    },
    notFound: false,
  };
};

const GPPage = ({ results }) => {
  return <GodPraksisPage results={results} />;
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
