module.exports = {
  siteMetadata: {
    title: `Designsystemet NAV`,
    description: ``,
    author: `@navikt`,
    siteUrl: "https://design.nav.no/",
  },
  plugins: [
    "gatsby-plugin-robots-txt",
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-less`,
    "gatsby-plugin-cname",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        rehypePlugins: [
          require("rehype-slug"),
          [
            require("rehype-toc"),
            {
              headings: ["h2", "h3"],
              cssClasses: {
                toc: "table-of-contents",
              },
            },
          ],
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `NAV Designsystem`,
        short_name: `NAV DS`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        icon: `src/components/assets/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `src/pages`,
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        name: `komponenter`,
        path: `${__dirname}/../packages`,
        ignore: [
          `**/*.usage.mdx`,
          `**/*.js`,
          `**/*.jsx`,
          `**/*.tsx`,
          `**/*.ts`,
          `**/lib/**`,
          `**/src/**`,
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docgen`,
        path: `${__dirname}/../packages`,
        ignore: [
          `**/*.js`,
          `**/stories/**`,
          `**/*eksempel.js`,
          `**/sample/*.js`,
          `**/*.example.js`,
          `**/*.mdx`,
          `**/*.d.*`,
          `**/lib/**`,
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docgen-vnext`,
        path: `${__dirname}/../@navikt/ds-react`,
        ignore: [
          `**/*.js`,
          `**/stories/**`,
          `**/*eksempel.js`,
          `**/sample/*.js`,
          `**/*.example.js`,
          `**/*.mdx`,
          `**/*.d.*`,
          `**/lib/**`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout/layout.tsx`),
      },
    },

    //`gatsby-transformer-react-docgen-typescript-custom`,
    {
      resolve: "gatsby-transformer-react-docgen-typescript-custom",
      options: {
        ignore: [".docs", "/example", "/stories", ".md"],
      },
    },
    {
      resolve: `gatsby-plugin-amplitude-analytics`,
      options: {
        apiKey: "default",
        respectDNT: true,
        eventTypes: {
          pageView: "sidevisning",
        },
        amplitudeConfig: {
          apiEndpoint: "amplitude.nav.no/collect-auto",
          saveEvents: false,
          includeUtm: true,
          includeReferrer: true,
          platform: "https://design.nav.no/",
        },
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
