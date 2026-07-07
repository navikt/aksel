import type { ComponentMetadata } from "../utils/types/metadata";
import { Pagination, PaginationItem } from "./index";

const metadata: ComponentMetadata = {
  name: "Pagination",
  components: {
    Pagination,
    "Pagination.Item": PaginationItem,
  },
  keywords: ["pagination", "paginering", "sider", "pages", "navigation"],
};

export { metadata };
