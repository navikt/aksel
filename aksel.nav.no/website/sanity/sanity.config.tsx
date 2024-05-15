import { codeInput } from "@sanity/code-input";
import { colorInput } from "@sanity/color-input";
import { nbNOLocale } from "@sanity/locale-nb-no";
import { table } from "@sanity/table";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { media } from "sanity-plugin-media";
import { structureTool } from "sanity/structure";
import { DatabaseIcon, TestFlaskIcon } from "@navikt/aksel-icons";
import { SANITY_API_VERSION, SANITY_PROJECT_ID } from "./config";
import { defaultDocumentNode, publicationFlow, structure } from "./plugins";
import { schema } from "./schema";
import { InputWithCounter } from "./schema/custom-components";
import { getTemplates } from "./util";

export const workspaceConfig = defineConfig([
  {
    ...defaultConfig(),
    title: "Aksel",
    name: "default",
    dataset: "production",
    basePath: "/admin/prod",
    icon: DatabaseIcon,
    auth: authStore("production"),
  },
  {
    ...defaultConfig(),
    title: "Aksel Dev-miljø",
    name: "dev",
    dataset: "development",
    basePath: "/admin/dev",
    icon: TestFlaskIcon,
    auth: authStore("development"),
  },
]);

function defaultConfig() {
  return {
    projectId: SANITY_PROJECT_ID,
    apiVersion: SANITY_API_VERSION,
    schema,
    form: {
      components: {
        field: (props) => {
          const name = props.schemaType?.name;

          if (name === "string" && props.schemaType?.options?.maxLength) {
            return <InputWithCounter {...props} />;
          }

          if (name === "text" && props.schemaType?.options?.maxLength) {
            return <InputWithCounter {...props} size="large" />;
          }
          return props.renderDefault(props);
        },
      },
    },
    document: {
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === "global") {
          return getTemplates();
        }
        return prev;
      },
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
  };
}

function authStore(dataset: string) {
  return {
    redirectOnSingle: false,
    mode: "replace" as const,
    projectId: SANITY_PROJECT_ID,
    dataset,
    providers: [
      {
        name: "saml",
        title: "NAV SSO",
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
