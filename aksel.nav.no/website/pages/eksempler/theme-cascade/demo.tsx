import {
  Box,
  Button,
  Checkbox,
  HStack,
  Textarea,
  Theme,
  VStack,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Wrapper>
      <DemoForm />
      <Theme data-color="brand-beige">
        <Wrapper>
          <DemoForm />
          <Theme data-color="brand-magenta">
            <Wrapper>
              <DemoForm />
            </Wrapper>
          </Theme>
        </Wrapper>
      </Theme>
    </Wrapper>
  );
};

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <HStack gap="space-16" asChild width="fit-content">
      <Box
        borderWidth="1"
        borderColor="neutral"
        padding="space-12"
        borderRadius="12"
      >
        {children}
      </Box>
    </HStack>
  );
}

function DemoForm() {
  return (
    <Box maxWidth="20rem">
      <VStack gap="space-8">
        <Textarea label="Tilbakemelding" />
        <Checkbox defaultChecked>Jeg samtykker til vilkårene</Checkbox>
      </VStack>
      <HStack gap="space-8" marginBlock="space-12 space-0">
        <Button variant="secondary">Avbryt</Button>
        <Button>Lagre</Button>
      </HStack>
    </Box>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 0,
};
