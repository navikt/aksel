import { codeInput } from "@sanity/code-input";
import { visionTool } from "@sanity/vision";
import { createAuthStore, defineConfig, isDev } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./schema";
import { media } from "sanity-plugin-media";

const devOnlyPlugins = [visionTool()];

const projectId = "hnbe3yhs";

const sharedConfig = {
  projectId,
  apiVersion: "2021-10-21",
  schema: schemas,
  plugins: [
    deskTool(),
    media({
      projectId,
      dataset: "production",
    }),
    codeInput(),
    ...(isDev ? devOnlyPlugins : []),
  ],
  auth: createAuthStore({
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
  }),
};

export const workspaceConfig = defineConfig([
  {
    // /admin defaults to first in list
    name: "default",
    title: "Live",
    dataset: "production",
    basePath: "/admin/prod",
    ...sharedConfig,
  },
  {
    name: "dev",
    title: "Dev",
    dataset: "development",
    basePath: "/admin/dev",
    ...sharedConfig,
  },
]);

/*
interface WorkspaceOptions {
  name: string
  title: string
  projectId: string
  dataset: string
  plugins?: PluginOptions[]
  schema?: SchemaPluginOptions
  document?: DocumentPluginOptions
  tools?: Tool[] | ComposableOption<Tool[], ConfigContext>
  form?: SanityFormConfig
  basePath?: string
  subtitle?: string
  logo?: React.ComponentType
  icon?: React.ComponentType
  navbar?: {
    components?: {
      ToolMenu: React.ComponentType<ToolMenuProps>
    }
  }
  theme?: StudioTheme
}


*/
