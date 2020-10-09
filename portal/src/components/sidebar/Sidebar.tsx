import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";

import "./styles.less";

const Sidebar = ({ location, className = "" }) => {
  const sites = useStaticQuery(graphql`
    query AllMdx {
      allMdx {
        edges {
          node {
            slug
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const menu = sites.allMdx.edges
    .filter(
      (edge) =>
        edge.node.slug.split("/").length === 2 &&
        edge.node.slug.split("/")[0].startsWith(location.pathname.split("/")[1])
    )
    .map((edge) => ({
      link: `/${edge.node.slug}`,
      title: edge.node.frontmatter.title,
    }));

  return (
    <div className={className}>
      <nav aria-labelledby="left-navigation-title">
        <h2 id="left-navigation-title" className="typo-systemtittel">
          Ressurser
        </h2>
        <ul className="nav-list">
          {menu.map(({ link, title }) => (
            <li>
              <Link to={link}>{title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
