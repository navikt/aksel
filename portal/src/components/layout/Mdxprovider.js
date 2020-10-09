import React, { useEffect, useState, useRef } from "react";
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

const MdxWrapper = ({ element, ...props }) => {
  let headlines = [];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ready, setReady] = useState(false);
  const [headline, setHeadline] = useState([]);

  const ref = useRef([]);
  // const [headlines, setHeadlines] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    console.log(ref.current);
  });

  const generateHeadlineID = (content) =>
    content.toLowerCase().split(" ").join("-");

  const registerHeadline = (type, title) => {
    const id = generateHeadlineID(title.children);

    if (ready) return id;
    headlines.push({
      id,
      parent: undefined,
      type: parseInt(type.substring(2, 1), 10),
      title: title.children,
    });

    ref.current = [
      ...ref.current,
      {
        id,
        parent: undefined,
        type: parseInt(type.substring(2, 1), 10),
        title: title.children,
      },
    ];

    return id;
  };

  const components = {
    h1: (props) => {
      const id = generateHeadlineID(props.children);
      return <Innholdstittel id={id} {...props} />;
    },
    h2: (props) => {
      const id = registerHeadline("h2", props);
      return <Systemtittel id={id} {...props} />;
    },
    h3: (props) => {
      const id = registerHeadline("h3", props);
      return <Undertittel id={id} {...props} tag="h3" />;
    },
    a: Lenke,
  };
  return (
    <div className="mdx-content">
      <section className="section">
        <MDXProvider components={components}>{element}</MDXProvider>
      </section>
      {ready && (
        <div id={element.props.path}>
          <TableOfContents headlines={ref.current} />
        </div>
      )}
    </div>
  );
};

export default MdxWrapper;
