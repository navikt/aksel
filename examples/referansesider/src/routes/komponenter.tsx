import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Link } from "../components/Link";
import { Page } from "../components/Page";

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
    <Page>
      <div className="py-12 flex flex-col items-center gap-8">
        <Section aria-label="Buttons">
          <Button>Button</Button>
          <Button variant="secondary">Button</Button>
        </Section>
        <Section aria-label="Link">
          <Link href="#">Når du har sykepenger</Link>
          <Link href="#" inverted>
            Når du har sykepenger
          </Link>
        </Section>
      </div>
    </Page>
  );
}
