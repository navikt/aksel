import React, { useState } from "react";
import { Textarea } from "nav-frontend-skjema";

const TextareaExample = () => {
  const [value, setValue] = useState("");

  return (
    <Textarea
      maxLength={2000}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default TextareaExample;
