import { AkselList as AkselList, Heading, BodyShort, Box } from "@navikt/ds-react";
import { List as CustomList } from "@navikt/ds-react/List";

export const MyComponent = () => {
  return (
    <div>
      <div>
        <Heading level="2" size="small">
          Lorem Ipsum Dolor Sit Amet
        </Heading>
        <BodyShort>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel
          risus volutpat.
        </BodyShort>
        <Box marginBlock="space-16" asChild>
          <AkselList>
            <AkselList.Item>
              lorem ipsum
            </AkselList.Item>
            <AkselList.Item>
              lorem ipsum
            </AkselList.Item>
          </AkselList>
        </Box>
      </div>
      <div>
        <Heading level="2" size="small">
          Lorem Ipsum Dolor Sit Amet
        </Heading>
        <BodyShort>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel
          risus volutpat.
        </BodyShort>
        <Box marginBlock="space-16" asChild>
          <CustomList>
            <CustomList.Item>
              lorem ipsum
            </CustomList.Item>
            <CustomList.Item>
              lorem ipsum
            </CustomList.Item>
          </CustomList>
        </Box>
      </div>
    </div>
  );
};
