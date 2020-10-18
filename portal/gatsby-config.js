module.exports = {
  siteMetadata: {
    title: `Designsystemet NAV`,
    description: ``,
    author: `@navikt`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-less`,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
          "../website/**",
          "website",
          "guideline-app",
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
          "../website/**",
          "website",
          "guideline-app",
        ],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout/layout.tsx`),
      },
    },

    `gatsby-transformer-react-docgen-typescript-custom`,

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
