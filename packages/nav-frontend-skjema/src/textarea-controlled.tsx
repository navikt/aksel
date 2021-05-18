import * as React from "react";
import * as PT from "prop-types";
import { omit } from "nav-frontend-js-utils";
import Textarea from "./textarea";
import "nav-frontend-skjema-style";

export interface TextareaControlledProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  maxLength?: number;
  textareaClass?: string;
  id?: string;
  name?: string;
  feil?: React.ReactNode | boolean;
  tellerTekst?: (antallTegn: number, maxLength: number) => React.ReactNode;
  textareaRef?: (textarea: HTMLTextAreaElement | null) => any;
  defaultValue: string;
}

export interface TextareaControlledState {
  text: string;
}

class TextareaControlled extends React.Component<
  TextareaControlledProps,
  TextareaControlledState
> {
  constructor(props) {
    super(props);
    this.state = { text: props.defaultValue || "" };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    const { defaultValue, ...other } = this.props;
    return (
      <Textarea onChange={this.onChange} {...other} value={this.state.text} />
    );
  }
}

(TextareaControlled as React.ComponentClass).propTypes = {
  ...omit(Textarea.propTypes, "value", "onChange"),
  defaultValue: PT.string,
};

(TextareaControlled as React.ComponentClass).defaultProps = omit(
  Textarea.defaultProps,
  "value",
  "onChange"
);

export default TextareaControlled;
