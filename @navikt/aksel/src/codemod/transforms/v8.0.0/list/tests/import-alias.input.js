import { List as AkselList } from "@navikt/ds-react";
import { List as CustomList } from "@navikt/ds-react/List";

export const MyComponent = () => {
  return (
    <div>
      <AkselList
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel risus volutpat."
      >
        <AkselList.Item>lorem ipsum</AkselList.Item>
        <AkselList.Item>lorem ipsum</AkselList.Item>
      </AkselList>
      <CustomList
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel risus volutpat."
      >
        <CustomList.Item>lorem ipsum</CustomList.Item>
        <CustomList.Item>lorem ipsum</CustomList.Item>
      </CustomList>
    </div>
  );
};
