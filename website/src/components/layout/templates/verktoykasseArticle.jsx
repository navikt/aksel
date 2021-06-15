import React from "react";
import rehypeReact from "rehype-react";
import { comps } from "../Mdxprovider";
import { GithubLogo } from "../../assets/images/svg";
import {
  Innholdstittel,
  Systemtittel,
  Undertittel,
  Normaltekst,
} from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
let headlines = [];

const registerHeadline = (props, comp) => {
  const text = props.children.toString();
  let id = text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-zæøåA-ZÆØÅ0-9 -]/g, "");

  if (headlines.includes(id)) {
    headlines.push(id);
    id = `${id}-${headlines.filter((hid) => hid === id).length}`;
  } else {
    headlines.push(id);
  }

  const Comp = comp;
  return <Comp id={id} {...props} />;
};

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    ...comps,
    h1: (props) => registerHeadline(props, Innholdstittel),
    h2: (props) => registerHeadline(props, Systemtittel),
    h3: (props) =>
      registerHeadline(props, (props) => <Undertittel tag="h3" {...props} />),
    h4: (props) =>
      registerHeadline(props, (props) => <Undertittel tag="h4" {...props} />),
  },
}).Compiler;

const Article = ({ path, pageContext }) => {
  /* console.log(pageContext); */
  headlines = [];

  const editPath = path.endsWith("/") ? path + "readme" : path;
  const editUrl = `https://www.github.com/navikt/verktoykasse-innhold/edit/main${editPath}.md`;

  return (
    <>
      <div>
        <article className="section" id="main-content">
          {renderAst(pageContext.htmlAst)}
        </article>
        <Normaltekst className="gitLink">
          <Lenke href={editUrl}>
            <GithubLogo /> Rediger siden på Github
          </Lenke>
        </Normaltekst>
      </div>
    </>
  );
};

export default Article;
