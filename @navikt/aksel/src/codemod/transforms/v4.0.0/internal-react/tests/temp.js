import { Dropdown, Timeline } from "@navikt/ds-react-internal";

/* eslint-disable react/jsx-no-undef */
export const Page = () => {
  return (
    <>
      <Dropdown onSelect={(event) => console.log(event)}>
        <Dropdown.Toggle>Toggle</Dropdown.Toggle>
        <Dropdown.Menu strategy="fixed">
          <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Heading>
              Systemer og oppslagsverk
            </Dropdown.Menu.GroupedList.Heading>
            <Dropdown.Menu.GroupedList.Item
              onClick={() => console.log("GroupedList.Item-click")}
            >
              Gosys
            </Dropdown.Menu.GroupedList.Item>
          </Dropdown.Menu.GroupedList>
          <Dropdown.Menu.Divider />
          <Dropdown.Menu.List>
            <Dropdown.Menu.List.Item onClick={() => console.log("Item-click")}>
              Gosys
            </Dropdown.Menu.List.Item>
            <Dropdown.Menu.List.Item>Psys</Dropdown.Menu.List.Item>
            <Dropdown.Menu.List.Item disabled>
              Infotrygd
            </Dropdown.Menu.List.Item>
          </Dropdown.Menu.List>
        </Dropdown.Menu>
      </Dropdown>
      <Timeline>
        <Timeline.Row
          label="Row 1"
          icon={<CheckmarkCircleFillIcon aria-hidden />}
        >
          <Timeline.Period
            start={new Date("Feb 4 2022")}
            end={new Date("Feb 13 2022")}
            status="success"
          />
        </Timeline.Row>
        <Timeline.Row
          label="Row 2"
          icon={<CheckmarkCircleFillIcon aria-hidden />}
        >
          <Timeline.Period
            start={new Date("Feb 17 2022")}
            end={new Date("Feb 22 2022")}
            status="warning"
          />
        </Timeline.Row>
      </Timeline>
    </>
  );
};
