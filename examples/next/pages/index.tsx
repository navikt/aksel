import { Accordion, Button } from "@navikt/ds-react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 m-4 mx-auto bg-white rounded-md max-w-2xl">
      <Accordion>
        <Accordion.Item>
          <Accordion.Header>Accordion header 1</Accordion.Header>
          <Accordion.Content>Accordion content 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Accordion header 2</Accordion.Header>
          <Accordion.Content>Accordion content 2</Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <Button>Submit</Button>
    </div>
  );
};

export default Home;
