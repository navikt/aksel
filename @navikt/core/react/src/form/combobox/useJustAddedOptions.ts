import { useState, useEffect } from "react";

const useJustAddedOptions = () => {
  const key = "aksel_combobox_justAddedOptions";

  const [justAddedOptions, setJustAddedOptions] = useState<string[]>(() => {
    const storedOptions = localStorage.getItem(key);
    return storedOptions ? JSON.parse(storedOptions) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(justAddedOptions));
  }, [justAddedOptions]);

  return [justAddedOptions, setJustAddedOptions] as const;
};

export default useJustAddedOptions;
