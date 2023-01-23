import { InputWithCounter } from "./schema/custom-components";
import { codeInput } from "@sanity/code-input";
import { colorInput } from "@sanity/color-input";
import { table } from "@sanity/table";
import { visionTool } from "@sanity/vision";
import { createAuthStore, defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { media } from "sanity-plugin-media";
import { deskTool } from "sanity/desk";
import {
  defaultDocumentNode,
  publicationFlow,
  structure,
} from "./custom-plugins";

import { getTemplates } from "./util";

import { DatabaseIcon, RemoveCircleIcon } from "@sanity/icons";
import { allArticleDocuments } from "./config";
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
    auth: authStore(),
  },
  {
    ...defaultConfig(),
    title: "Aksel Dev-miljø",
    name: "dev",
    dataset: "development",
    basePath: "/admin/dev",
    icon: RemoveCircleIcon,
    auth: authStore(),
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
            return <InputWithCounter {...props.inputProps} />;
          }

          if (name === "text" && props.schemaType?.options?.maxLength) {
            return <InputWithCounter {...props.inputProps} size="large" />;
          }
          return props.renderDefault(props);
        },
      },
    },
    document: {
      newDocumentOptions: (prev, { currentUser }) =>
        currentUser.roles.find((x) =>
          ["developer", "administrator", "editor"].includes(x.name)
        )
          ? [...getTemplates(currentUser.roles), ...prev]
          : getTemplates(currentUser.roles),
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
        hasPublishedAt: allArticleDocuments,
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

function authStore() {
  return createAuthStore({
    redirectOnSingle: false,
    mode: "replace",
    projectId,
    dataset: "production",
    providers: [
      {
        name: "saml",
        title: "NAV SSO",
        url: "https://api.sanity.io/v2021-10-01/auth/saml/login/f3270b37",
        logo: "/images/navlogo.svg",
      },
      {
        name: "github",
        title: "GitHub",
        url: "https://api.sanity.io/v1/auth/login/github",
      },
      {
        name: "google",
        title: "Google",
        url: "https://api.sanity.io/v1/auth/login/google",
      },
    ],
  });
}
