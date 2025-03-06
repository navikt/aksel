import { codeInput } from "@sanity/code-input";
import { colorInput } from "@sanity/color-input";
import { nbNOLocale } from "@sanity/locale-nb-no";
import { table } from "@sanity/table";
import { visionTool } from "@sanity/vision";
import { AuthConfig, defineConfig } from "sanity";
import { media } from "sanity-plugin-media";
import { structureTool } from "sanity/structure";
import { TestFlaskIcon } from "@navikt/aksel-icons";
import { SANITY_PROJECT_ID } from "./config";
import { AkselLogo } from "./logo";
import { publicationFlow } from "./plugins/publication-flow";
import { defaultDocumentNode, structure } from "./plugins/structure";
import { schema } from "./schema";
import { newDocumentsCreator } from "./util";

export const workspaceConfig = defineConfig([
  {
    projectId: SANITY_PROJECT_ID,
    title: "Aksel",
    description: "Production environment for Aksel",
    name: "default",
    dataset: "production",
    basePath: "/admin/prod",
    icon: AkselLogo,
    auth: authStore(),
    scheduledPublishing: { enabled: false },
    schema,
    document: {
      newDocumentOptions: newDocumentsCreator,
    },
    plugins: [
      structureTool({
        title: "Editor",
        structure,
        defaultDocumentNode,
      }),
      publicationFlow(),

      /* 3rd-party */
      table(),
      codeInput(),
      media(),
      visionTool(),
      colorInput(),
      nbNOLocale(),
    ],
    releases: {
      enabled: false,
    },
  },
  {
    projectId: SANITY_PROJECT_ID,
    title: "Aksel Development",
    description: "Development environment for Aksel",
    name: "dev",
    dataset: "development",
    basePath: "/admin/dev",
    icon: TestFlaskIcon,
    auth: authStore(),
    scheduledPublishing: { enabled: false },
    schema,
    document: {
      newDocumentOptions: newDocumentsCreator,
    },
    plugins: [
      structureTool({
        title: "Editor",
        structure,
        defaultDocumentNode,
      }),
      publicationFlow(),

      /* 3rd-party */
      table(),
      codeInput(),
      media(),
      visionTool(),
      colorInput(),
      nbNOLocale(),
    ],
    releases: {
      enabled: false,
    },
  },
]);

function authStore(): AuthConfig {
  return {
    redirectOnSingle: false,
    mode: "replace",
    providers: [
      {
        name: "saml",
        title: "Nav SSO",
        url: "https://api.sanity.io/v2021-10-01/auth/saml/login/f3270b37",
      },
      {
        name: "github",
        title: "GitHub",
        url: "https://api.sanity.io/v1/auth/login/github",
      },
    ],
  };
}
