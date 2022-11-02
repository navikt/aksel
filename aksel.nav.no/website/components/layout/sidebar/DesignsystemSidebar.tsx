import { useContext } from "react";
import { PagePropsContext } from "../..";
import Menu from "../menu/DsMenu";

const DesignsystemSidebar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { pageProps } = useContext(PagePropsContext);

  if (!pageProps?.activeHeading) return null;

  return (
    <div
      data-testid="ds-sidebar"
      className="algolia-ignore-index w-sidebar z-[1002] hidden shrink-0 self-start  bg-white py-4 pr-2 md:block"
    >
      <Menu heading={pageProps?.activeHeading} />
    </div>
  );
};
/* h-screen overflow-y-auto sticky top-0 */
export default DesignsystemSidebar;
