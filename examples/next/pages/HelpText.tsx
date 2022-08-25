import { HelpText } from "@navikt/ds-react";
import type { NextPage } from "next";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  const [abc, setAbc] = useState(0);

  useEffect(() => {
    setAbc((x) => x + 1);
  }, []);

  console.count("ran");

  return (
    <div className="grid place-content-center h-screen">
      <div className="min-w-[240px] flex justify-center items-center h-[4000px] overflow-auto">
        <HelpText className="ml-4">
          Aliqua voluptate anim eiusmod aliquip deserunt amet.
        </HelpText>
        <HelpText placement="top" className="ml-4">
          Aliqua voluptate anim eiusmod aliquip deserunt amet.
        </HelpText>
      </div>
    </div>
  );
};

export default Home;
