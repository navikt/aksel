import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

export const workspaceConfig = defineConfig([
  {
    name: "default",
    title: "Prod",
    projectId: "hnbe3yhs",
    dataset: "production",
    apiVersion: "2021-10-21",
    // the base path is required whenever more than one workspace is defined and is used for route matching
    basePath: "/admin/prod",
    plugins: [deskTool()],
    schema: { types: [] },
  },
  {
    name: "dev",
    title: "Dev",
    projectId: "hnbe3yhs",
    dataset: "development",
    apiVersion: "2021-10-21",
    basePath: "/admin/dev",
    plugins: [deskTool()],
    schema: { types: [] },
  },
]);
