import {
  Accordion,
  Alert,
  Button,
  Checkbox,
  CheckboxGroup,
  ErrorSummary,
  Radio,
  RadioGroup,
  Search,
} from "@navikt/ds-react";
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
      {(["error", "warning", "info", "success"] as Array<
        "error" | "warning" | "info" | "success"
      >).map((variant) => (
        <Alert key={variant} variant={variant}>
          Id elit esse enim reprehenderit enim nisi veniam nostrud.
        </Alert>
      ))}
      <div className="flex gap-2">
        {(["primary", "secondary", "tertiary", "danger"] as Array<
          "primary" | "secondary" | "tertiary" | "danger"
        >).map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </div>
      <form className="flex flex-col gap-4">
        <ErrorSummary heading="Feiloppsummering komponent">
          <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
          <ErrorSummary.Item href="#2">
            Tekstfeltet må ha en godkjent e-mail
          </ErrorSummary.Item>
        </ErrorSummary>
        <CheckboxGroup legend="Checkbox group" defaultValue={["checkbox2"]}>
          <Checkbox value="checkbox1">Checkbox 1</Checkbox>
          <Checkbox value="checkbox2">Checkbox 2</Checkbox>
        </CheckboxGroup>
        <RadioGroup legend="Radio group" defaultValue={"radio2"}>
          <Radio value="radio1">Radio 1</Radio>
          <Radio value="radio2">Radio 2</Radio>
        </RadioGroup>
        <Search label="Søk" />
      </form>
    </div>
  );
};

export default Home;
