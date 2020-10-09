import React, { useEffect, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import TableOfContents from "../table-of-contents/TableOfContents";
// import { preToCodeBlock } from 'mdx-utils';

import {
  Innholdstittel,
  Systemtittel,
  Undertittel,
} from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";

import "./layout.less";
import { graphql, useStaticQuery } from "gatsby";

const MdxWrapper = ({ element, ...props }) => {
  const { allMdx } = useStaticQuery(graphql`
    query mdxQuery {
      allMdx {
        nodes {
          slug
          headings {
            value
            depth
          }
        }
      }
    }
  `);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ready, setReady] = useState(false);
  const [headlines, setHeadlines] = useState([]);
  // const [headlines, setHeadlines] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setReady(true);
    setHeadlines(getContent());
  }, []);

  const genId = (content) => content.toLowerCase().split(" ").join("");

  const getContent = () => {
    const path = element.props.path.replace(/^\/+|\/+$/g, "");
    const headings = allMdx.nodes.filter((node) => node.slug === path);
    return headings[0].headings.map((head) => {
      return {
        id: genId(head.value),
        parent: undefined,
        type: head.depth,
        title: head.value,
      };
    });
  };

  const components = {
    h1: (props) => {
      const id = genId(props.children);
      return <Innholdstittel id={id} {...props} />;
    },
    h2: (props) => {
      const id = genId(props.children);
      return <Systemtittel id={id} {...props} />;
    },
    h3: (props) => {
      const id = genId(props.children);
      return <Undertittel id={id} {...props} tag="h3" />;
    },
    a: Lenke,
  };
  getContent();
  return (
    <div className="mdx-content">
      <section className="section">
        <MDXProvider components={{ ...components }}>{element}</MDXProvider>
      </section>
      {ready && (
        <div id={element.props.path}>
          <TableOfContents headlines={headlines} />
        </div>
      )}
    </div>
  );
};

export default MdxWrapper;
