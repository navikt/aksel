import * as PT from "prop-types";
import * as React from "react";
import { parse, build, Rule, LinebreakRule } from "@navikt/textparser";
import { LinkRule, ParagraphRule } from "./rules";

export {
  LinebreakRule,
  HighlightRule,
  createDynamicHighlightingRule,
  BoldRule,
  Rule,
} from "@navikt/textparser";
export * from "./rules";

export interface TekstomradeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Overstyrer wrapper komponent
   */
  as: string | React.ComponentType;
  /**
   * Ren tekst-innhold som skal formateres
   */
  children: string;
  /**
   * Skru av/på formatering
   */
  ingenFormattering: boolean;
  /**
   * Regelsettet som blir brukt til parsing av teksten
   */
  rules: Rule[];
}

export const defaultRules: Rule[] = [LinkRule, LinebreakRule, ParagraphRule];

class Tekstomrade extends React.Component<TekstomradeProps> {
  static defaultProps = {
    as: "div",
    ingenFormattering: false,
    rules: defaultRules,
  };

  render() {
    const { as, children, ingenFormattering, rules, ...rest } = this.props;

    if (typeof children !== "string") {
      return null;
    }

    if (ingenFormattering) {
      return <div {...rest}>{children}</div>;
    }

    const ast = parse(children, rules);
    const content = build(ast, rules);

    return React.createElement<any>(as, rest, content);
  }
}

(Tekstomrade as React.ComponentClass).propTypes = {
  as: PT.oneOfType([PT.string, PT.elementType]).isRequired,
  children: PT.string.isRequired,
  ingenFormattering: PT.bool.isRequired,
  rules: PT.arrayOf(
    PT.shape({
      name: PT.string.isRequired,
      scope: PT.number.isRequired,
      regex: PT.object.isRequired,
      parse: PT.func.isRequired,
      react: PT.func.isRequired,
    })
  ).isRequired,
};

export default Tekstomrade;
