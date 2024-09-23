import { createFileRoute } from "@tanstack/react-router";
import { Dekoratoren } from "../components/Dekoratoren";

const Component = () => {
  return (
    <Dekoratoren>
      <h3>hello from minside</h3>
    </Dekoratoren>
  );
};

export const Route = createFileRoute("/minside")({ component: Component });
