# gatsby-source-github

Source plugin for pulling data into Gatsby from Github repositories.
Works with gatsby-transform-remark if you like to pull markdown files from your repository.

## Supports

- Pulling trees / files from Github repositories
- Pulling release information from Github repositories

## How to use

### NPM package

This package is available on npm as "@mosch/gatsby-source-github".

`yarn add @mosch/gatsby-source-github`

### Gatsby Configuration

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `@mosch/gatsby-source-github`,
      options: {
        repository: "YOUR_REPOSITORY",
        tree: true,
        releases: true,
        user: "YOUR_USER",
        secrets: {
          token: "YOUR_API_TOKEN",
        },
      },
    },
  ],
};
```

### Plugin options

- **tree**: Pulls in the Github tree (all files) as GithubFiles _(default false)_
- **releases**: Pulls in the Github releases as GithubReleases _(default false)_

### How to query Files using GraphQL

A a sample query for fetching all File nodes.

```graphql
query GithubFileQuery {
  allGithubFile {
    edges {
      node {
        repository
        user
        path
      }
    }
  }
}
```

### How to query Releases using GraphQL

A a sample query for fetching all Release nodes.

```graphql
query GithubReleasesQuery {
  allGithubReleases {
    edges {
      node {
        user
        repository
        version
        description
      }
    }
  }
}
```
