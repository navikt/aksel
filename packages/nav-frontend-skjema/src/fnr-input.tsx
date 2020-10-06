import * as React from "react";
import { fnr } from "@navikt/fnrvalidator";
import Input, { InputProps } from "./input";
import "nav-frontend-skjema-style";

export interface FnrInputProps extends InputProps {
  /**
   * Komponenten auto-validerer seg selv på onChange, og videreformidler valid-verdi via denne callback metoden.
   */
  onValidate: (isValid: boolean) => void;
}

class FnrInput extends React.Component<FnrInputProps> {
  onChange(e) {
    if (this.props.onValidate) {
      const valid =
        e.currentTarget.validity.valid &&
        fnr(e.currentTarget.value).status === "valid";
      this.props.onValidate(valid);
    }
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  render() {
    return (
      <Input
        {...this.props}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        inputClassName="skjemaelement__input-fodselsnr"
        onChange={(e) => this.onChange(e)}
      />
    );
  }
}

export default FnrInput;
