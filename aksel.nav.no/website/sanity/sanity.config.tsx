import { codeInput } from "@sanity/code-input";
import { colorInput } from "@sanity/color-input";
import { table } from "@sanity/table";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { media } from "sanity-plugin-media";
import { deskTool } from "sanity/desk";
import { defaultDocumentNode, publicationFlow, structure } from "./plugins";
import { InputWithCounter } from "./schema/custom-components";

import { getTemplates } from "./util";

import { DatabaseIcon, TestFlaskIcon } from "@navikt/aksel-icons";
import { presentationTool } from "sanity/presentation";
import { allArticleDocuments } from "./config";
import { locate } from "./locate";
import { schema } from "./schema";

const projectId = "hnbe3yhs";

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
    projectId,
    apiVersion: "2021-10-21",
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
      newDocumentOptions: (prev, { currentUser }) => {
        return currentUser.roles.find((x) =>
          ["developer", "administrator"].includes(x.name)
        )
          ? [...getTemplates(prev), ...prev]
          : getTemplates();
      },
      unstable_comments: {
        enabled: true,
      },
    },
    plugins: [
      deskTool({
        title: "Editor",
        structure,
        defaultDocumentNode,
      }),
      publicationFlow({
        hasQualityControl: [
          "komponent_artikkel",
          "ds_artikkel",
          "aksel_artikkel",
        ],
        hasPublishedAt: [...allArticleDocuments],
      }),

      presentationTool({
        // Required: set the base URL to the preview location in the front end
        previewUrl: "https://localhost:3000",
        locate,
      }),
      /* 3rd-party */
      table(),
      codeInput(),
      media(),
      visionTool(),
      unsplashImageAsset(),
      colorInput(),
    ],
  };
}

function authStore(dataset: string) {
  return {
    redirectOnSingle: false,
    mode: "replace" as const,
    projectId,
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
