"use client";

import { codeInput } from "@sanity/code-input";
import { colorInput } from "@sanity/color-input";
import { nbNOLocale } from "@sanity/locale-nb-no";
import { table } from "@sanity/table";
import { visionTool } from "@sanity/vision";
import { type AuthConfig, defineConfig } from "sanity";
import { media } from "sanity-plugin-media";
import { references } from "sanity-plugin-references";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { TestFlaskIcon } from "@navikt/aksel-icons";
import { publicationFlow } from "./plugins/publication-flow/publication-flow";
import { resolve } from "./presentation/resolve";
import { SANITY_PROJECT_ID } from "./sanity.env";
import { schema } from "./schema/schema";
import { newDocumentsCreator } from "./schema/schema.utils";
import { defaultDocumentNode, structure } from "./structure";
import { AkselLogo } from "./ui/AkselLogo";

/**
 * Auth is project-scoped: all workspaces for the same project share cookies and
 * tokens, so both workspaces must reference this single shared config.
 */
const auth: AuthConfig = {
  redirectOnSingle: false,
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

export const workspaceConfig = defineConfig([
  {
    projectId: SANITY_PROJECT_ID,
    title: "Aksel",
    name: "default",
    dataset: "production",
    basePath: "/admin",
    icon: AkselLogo,
    auth,
    scheduledPublishing: { enabled: false },
    schema,
    document: {
      newDocumentOptions: newDocumentsCreator,
    },
    scheduledDrafts: {
      enabled: false,
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
      references({ exclude: ["media.tag", "sanity.imageAsset"] }),
      media(),
      visionTool(),
      colorInput(),
      nbNOLocale(),
      presentationTool({
        resolve,
        previewUrl: {
          previewMode: {
            enable: "/api/draft-mode/enable",
            shareAccess: true,
          },
        },
      }),
    ],
    releases: {
      enabled: true,
    },
  },
  {
    projectId: SANITY_PROJECT_ID,
    title: "Aksel Development",
    name: "dev",
    dataset: "development",
    basePath: "/admin-dev",
    icon: TestFlaskIcon,
    auth,
    scheduledPublishing: { enabled: false },
    schema,
    document: {
      newDocumentOptions: newDocumentsCreator,
    },
    scheduledDrafts: {
      enabled: false,
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
      presentationTool({
        resolve,
        previewUrl: {
          previewMode: {
            enable: "/api/draft-mode/enable",
            shareAccess: true,
          },
        },
      }),
    ],
    releases: {
      enabled: false,
    },
    /* Dev-workspace is only visible for admins or devs */
    hidden: ({ currentUser }) => {
      if (currentUser === null) {
        return false;
      }
      return !currentUser.roles.some((role) => {
        return role.name === "administrator" || role.name === "developer";
      });
    },
  },
]);

export default workspaceConfig;
