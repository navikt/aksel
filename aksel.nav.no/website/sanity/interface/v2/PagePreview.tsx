import dynamic from "next/dynamic";
import { PreviewProps } from "./types";

const LiveQuery = dynamic(() => import("./LiveQuery"));

export function PagePreview(props: PreviewProps) {
  return <LiveQuery {...props} />;
}
