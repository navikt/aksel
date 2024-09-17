import { createFileRoute } from "@tanstack/react-router";

const Component = () => {
  return <h1>pick a referanseside</h1>;
};

export const Route = createFileRoute("/")({ component: Component });
