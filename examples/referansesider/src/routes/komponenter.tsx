import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import { Button } from "../components/Button";

export const Route = createFileRoute("/komponenter")({
  component: ComponentPage,
});

const Section = styled.section`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;

function ComponentPage() {
  return (
    <div className="py-12 flex justify-center gap-8">
      <Section aria-label="Buttons">
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
      </Section>
    </div>
  );
}
