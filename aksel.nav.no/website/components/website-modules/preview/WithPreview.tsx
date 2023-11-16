import LiveQuery from "./parts/LiveQuery";
import PreviewProvider from "./parts/PreviewProvider";
import { ResolverT } from "./parts/types";

type WithPreviewProps = {
  comp;
  query: string;
  props: any;
  params?: any;
  resolvers?: ResolverT;
};

const WithPreview = ({
  comp,
  query,
  params,
  props,
  resolvers,
}: WithPreviewProps) => {
  return (
    <PreviewProvider>
      <LiveQuery
        props={props}
        query={query}
        params={params}
        comp={comp}
        resolvers={resolvers}
      />
    </PreviewProvider>
  );
};

export default WithPreview;
