import { AkselVariablesInterface } from "./AkselVariablesInterface";

const plugin = new AkselVariablesInterface();

main().catch((err) =>
  plugin.exitWithMessage(`Error updating local variables: ${err.message}`),
);

async function main() {
  await plugin.init();
  if (process.env.NODE_ENV === "production") {
    await plugin.useRemoteConfig();
  }

  plugin.updateVariables();
  plugin.exit();
}
