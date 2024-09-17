import { createFileRoute } from "@tanstack/react-router";

const Component = () => {
  return (
    <div>
      <h3>hello from minside</h3>
    </div>
  );
};

export const Route = createFileRoute("/minside")({ component: Component });
