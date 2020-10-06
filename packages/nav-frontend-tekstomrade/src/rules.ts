import {
  AST,
  ASTNode,
  Rule,
  ReactElementDescription,
  LinkRule as OriginalLinkRule,
  ParagraphRule as OriginalParagraphRule,
} from "@navikt/textparser";
import Lenke from "nav-frontend-lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { getText } from "@navikt/textparser/dist/utils";

export const ParagraphRule: Rule = {
  ...OriginalParagraphRule,
  react(node: ASTNode, ast: AST): ReactElementDescription {
    const isLastInAST = ast.indexOf(node) === ast.length - 1;
    const props = isLastInAST ? undefined : { className: "blokk-xs" };

    return {
      props,
      type: Normaltekst,
    };
  },
};

export const LinkRule: Rule = {
  ...OriginalLinkRule,
  react(node: ASTNode): ReactElementDescription {
    const text = getText(node);
    const href = this.startsWithHttp.test(text) ? text : `https://${text}`;

    return {
      type: Lenke,
      props: { href, target: "_blank" },
    };
  },
};
