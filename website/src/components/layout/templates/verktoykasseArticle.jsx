import React from "react";
import rehypeReact from "rehype-react";
import { comps } from "../Mdxprovider";
import { GithubLogo } from "../../assets/images/svg";
import { InlineCode } from "../../code/Code";
import {
  Innholdstittel,
  Systemtittel,
  Undertittel,
  Normaltekst,
} from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
let headlines = [];

const Img = ({ src, ...rest }) => {
  //https://raw.githubusercontent.com/navikt/verktoykasse-innhold/mainhttps://user-images.githubusercontent.com/82579704/122454676-ef88a880-cfab-11eb-9f8c-6d3afb45fdd1.png
  const isDirectPath =
    src.indexOf("user-images.githubusercontent.com/") !== -1 ||
    src.indexOf("raw.githubusercontent.com/navikt/verktoykasse-innhold") !== -1;

  const localPath = src.replace(
    "https://github.com/navikt/verktoykasse-innhold/blob/main",
    ""
  );
  const fixedPath = `https://raw.githubusercontent.com/navikt/verktoykasse-innhold/main${localPath}`;

  // eslint-disable-next-line jsx-a11y/alt-text
  return (
    <span>
      <img src={isDirectPath ? src : fixedPath} {...rest} />
    </span>
  );
};

// TODO: Refactor..
const getToc = (toc) => {
  if (toc.length === 0 || !toc[0].items || toc[0].items.length === 0) {
    return null;
  }

  return (
    <nav className="table-of-contents">
      <ol className="toc-level toc-level-1">
        {toc[0].items.map((item) => {
          return (
            <li key={item.url} className="toc-item toc-item-h2">
              <Lenke href={item.url} className="toc-link toc-link-h2">
                {item.title}
              </Lenke>
              {item.items && item.items.length !== 0 && (
                <ol className="toc-level toc-level-2">
                  {item.items.map((lvl3) => {
                    return (
                      <li key={item.url} className="toc-item toc-item-h3">
                        <Lenke href={lvl3.url} className="toc-link toc-link-h3">
                          {lvl3.title}
                        </Lenke>
                      </li>
                    );
                  })}
                </ol>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

const registerHeadline = (props, comp) => {
  const text = props.children.toString();
  let id = text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-zæøåA-ZÆØÅ0-9 -]/g, "");

  if (headlines.includes(id)) {
    headlines.push(id);
    id = `${id}-${headlines.filter((hid) => hid === id).length - 1}`;
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
    img: (props) => <Img {...props} />,
    h1: (props) => registerHeadline(props, Innholdstittel),
    h2: (props) => registerHeadline(props, Systemtittel),
    h3: (props) =>
      registerHeadline(props, (props) => <Undertittel tag="h3" {...props} />),
    h4: (props) =>
      registerHeadline(props, (props) => <Undertittel tag="h4" {...props} />),
    inlineCode: (props) => <InlineCode {...props} />,
  },
}).Compiler;

const Article = ({ path, pageContext }) => {
  headlines = [];

  const editPath = path.endsWith("/") ? path + "readme" : path;
  const editUrl = `https://www.github.com/navikt/verktoykasse-innhold/edit/dev${editPath}.md`;

  return (
    <>
      <div>
        <article className="section article" id="main-content">
          {pageContext.toc?.items && getToc(pageContext.toc.items)}
          {renderAst(pageContext.htmlAst)}
        </article>
        <Normaltekst className="gitLink">
          <Lenke href={editUrl}>
            <GithubLogo /> Rediger siden på Github (krever innlogging)
          </Lenke>
        </Normaltekst>
      </div>
    </>
  );
};

export default Article;
