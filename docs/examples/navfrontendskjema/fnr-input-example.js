import React, { useState } from "react";
import { FnrInput } from "nav-frontend-skjema";

const FnrInputExample = () => {
  const [valid, setValid] = useState(false);
  const [value, setValue] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (valid && submit) {
      setSubmit(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valid) {
      setSubmit(false);
    } else {
      setSubmit(true);
    }
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FnrInput
          label="Fødselsnummer (11 siffer)"
          bredde="S"
          value={value}
          onChange={(e) => handleChange(e)}
          onValidate={(val) => setValid(val)}
          feil={submit && !valid ? "Ugyldig fødselsnummer" : undefined}
        />
      </form>
    </div>
  );
};

export default FnrInputExample;
