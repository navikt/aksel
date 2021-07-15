import React, { useState } from "react";
import { Loader } from "../index";
import { Button, Panel, Title } from "../../index";
import { Meta } from "@storybook/react/types-6-0";
import "./demo.css";
export default {
  title: "ds-react/loader",
  component: Loader,
} as Meta;

export const All = () => {
  return (
    <div>
      <h1>Loader</h1>
      <Loader />

      <h2>Transparent</h2>
      <Loader transparent />

      <h2>Sizing</h2>
      <Loader size="2xl" />
      <Loader size="xl" />
      <Loader size="l" />
      <Loader size="m" />
      <Loader size="s" />
      <Loader size="xs" />
      <h2>Sizing transparent</h2>
      <Loader size="2xl" transparent />
      <Loader size="xl" transparent />
      <Loader size="l" transparent />
      <Loader size="m" transparent />
      <Loader size="s" transparent />
      <Loader size="xs" transparent />
      <div style={{ backgroundColor: "#c9c9c9" }}>
        <h2>Varianter</h2>
        <Loader size="xl" variant="neutral" />
        <Loader size="xl" variant="interaction" />
        <Loader size="xl" variant="inverted" />
        <h2>Varianter transparent</h2>
        <Loader size="xl" variant="neutral" transparent />
        <Loader size="xl" variant="interaction" transparent />
        <Loader size="xl" variant="inverted" transparent />
        <h2>Brukt i knapper</h2>
      </div>
      <div>
        <Button>
          <span>Laster...</span>
          <Loader />
        </Button>{" "}
        <Button size="s">
          <span>Laster...</span>
          <Loader />
        </Button>
        <h2>Variants</h2>
        <Button variant="secondary">
          <span>Laster...</span>
          <Loader />
        </Button>{" "}
        <Button variant="action">
          <span>Laster...</span>
          <Loader />
        </Button>{" "}
        <Button variant="danger">
          <span>Laster...</span>
          <Loader />
        </Button>
      </div>
    </div>
  );
};

export const LoaderDemo = () => {
  const [loading, setLoading] = useState(false);
  const [longText, setLongText] = useState(false);

  const handleAuto = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const text = longText
    ? "Laster inn nytt innhold fra databasen. Hvis dette tar lengre enn 10 sekunder kan man prøve å laste siden på nytt. Om dette ikke fungerer kan det hende tjenesten har nedetid nå, sjekk ut denne linken for å se status"
    : "Laster inn innholdet...";

  return (
    <div className="demo__wrapper">
      <Title level="1" size="l">
        Test/Demo for loading state. Ikke bruk som referanse i implmentasjon
      </Title>
      <div>
        <Button onClick={() => setLoading(!loading)}>
          Toggle Loading state
        </Button>
        <Button onClick={() => setLongText(!longText)}>
          Toggle Text-lengde
        </Button>
        <Button onClick={() => handleAuto()}>
          Automatisk endring (3 sekunder)
        </Button>
      </div>

      <Panel
        border
        className="demo__panel"
        aria-live="polite"
        aria-busy={loading}
      >
        {loading ? (
          <>
            <Loader size="xl" title={text} />
            <span>{text}</span>
          </>
        ) : (
          <div>
            <h2>DummyTittel</h2>
            <p>
              Dolor nostrud sint incididunt consectetur adipisicing sit. Laborum
              enim consequat non labore velit ex. Esse amet irure cillum amet
              dolor ad consequat. Est sit id tempor dolore officia proident
              consequat sunt cillum.
            </p>
          </div>
        )}
      </Panel>
    </div>
  );
};
