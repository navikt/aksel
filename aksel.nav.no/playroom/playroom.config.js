// Note: Hot module reloading for dev has been turned off for this environment
// Why? We embed playroom in an iframe, and that iframe is loaded from the public asset folder
// So we need to build into that public asset folder. Hence no dev mode and HMR
// Workaround: restart the next dev server after each change to the playroom config and associated files.

const path = require("path");

module.exports = {
  baseUrl: "./",
  components: path.resolve("./src/components.ts"),
  outputPath: path.resolve("./dist/sandbox"),
  title: "Aksel Sandbox",
  snippets: path.resolve("./src/snippets.ts"),
  widths: [320, 480, 768, 1024, 1280, 1440],
  defaultVisibleWidths: [1280],
  port: 9000,
  frameComponent: path.resolve("./src/FrameComponent.tsx"),
  useScope: path.resolve("./src/useScope.tsx"),
  openBrowser: false,
  paramType: "search", // default is 'hash'
  iframeSandbox: "allow-scripts allow-same-origin allow-modals",
  exampleCode: `
<GlobalAlert status="success">
  <GlobalAlert.Header>
    <GlobalAlert.Title>Welcome to Aksel sandbox!</GlobalAlert.Title>
  </GlobalAlertHeader>
</GlobalAlert>
  `,
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          include: [path.resolve("./")],
          use: [
            {
              loader: require.resolve("babel-loader"),
              options: {
                presets: [
                  [
                    require.resolve("@babel/preset-env"),
                    { shippedProposals: true },
                  ],
                  require.resolve("@babel/preset-react"),
                  require.resolve("@babel/preset-typescript"),
                ],
                plugins: [require.resolve("babel-plugin-preval")],
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          include: [require.resolve("@navikt/ds-css")],
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  }),
};
