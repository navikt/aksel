import dynamic from "next/dynamic";
import { PreviewProps } from "./Preview.types";

const LiveQueryProvider = dynamic(() => import("./LiveQueryProvider"));

export function PagePreview(props: PreviewProps) {
  return <LiveQueryProvider {...props} />;
}
