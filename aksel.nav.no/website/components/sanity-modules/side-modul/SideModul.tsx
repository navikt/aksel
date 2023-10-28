import ErrorBoundary from "@/error-boundary";
import TokenView from "./token-view";

type SideModulProps = {
  node: {
    _key: string;
    _type: "spesial_seksjon";
    modul?: "ikonsok" | "token_kategori";
    logs?: any[];
    komponenter?: any;
    farge?: any;
    token?: { title: string; kategori: string };
  };
};
const SideModul = ({ node }: SideModulProps) => {
  if (!node || !node.modul) {
    return null;
  }

  const GetModule = () => {
    switch (node.modul) {
      case "ikonsok":
        return null;
      case "token_kategori":
        return <TokenView token={node.token} />;
      default: {
        return null;
      }
    }
  };

  return <div className="mb-16">{GetModule()}</div>;
};

export default function Component(props: SideModulProps) {
  return (
    <ErrorBoundary boundaryName="SideModul">
      <SideModul {...props} />
    </ErrorBoundary>
  );
}
