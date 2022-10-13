import NextLink from "next/link";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  Alert,
  BodyLong,
  BodyShort,
  Button,
  Checkbox,
  CheckboxGroup,
  Detail,
  ErrorSummary,
  GuidePanel,
  Heading,
  HelpText,
  Ingress,
  Label,
  Link,
  LinkPanel,
  Loader,
  Modal,
  Pagination,
  Popover,
  Radio,
  RadioGroup,
  ReadMore,
  Search,
  Select,
  Chat,
  Stepper,
  Switch,
  Table,
  Tabs,
  Tag,
  TextField,
  ToggleGroup,
  Tooltip,
  Textarea,
} from "@navikt/ds-react";
import { Cup, Dishwasher, Freezer } from "@navikt/ds-icons";
import { Dropdown } from "@navikt/ds-react-internal";

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(2);

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    Modal?.setAppElement?.("#__next");
  }, []);

  return (
    <div className="p-4 m-4 mx-auto bg-white rounded-md max-w-2xl w-full">
      <div className="mx-auto w-[90%] flex flex-col gap-4 items-start">
        <Accordion className="self-stretch">
          <Accordion.Item>
            <Accordion.Header>Accordion header 1</Accordion.Header>
            <Accordion.Content>Accordion content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Header>Accordion header 2</Accordion.Header>
            <Accordion.Content>Accordion content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>
        {(
          ["error", "warning", "info", "success"] as Array<
            "error" | "warning" | "info" | "success"
          >
        ).map((variant) => (
          <Alert key={variant} variant={variant}>
            Id elit esse enim reprehenderit enim nisi veniam nostrud.
          </Alert>
        ))}
      </div>
      <form className="flex flex-col gap-4">
        <ErrorSummary heading="Feiloppsummering komponent">
          <NextLink href="/linkTarget" passHref>
            <ErrorSummary.Item>Checkbox må fylles ut</ErrorSummary.Item>
          </NextLink>
          <NextLink href="/linkTarget" passHref>
            <ErrorSummary.Item>
              Tekstfeltet må ha en godkjent e-mail
            </ErrorSummary.Item>
          </NextLink>
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
        <Select label="Select">
          <option value="">Velg land</option>
          <option value="norge">Norge</option>
          <option value="sverige">Sverige</option>
        </Select>
        <Switch>Switch</Switch>
        <TextField label="Text field" />
        <Textarea label="Text area" />
        <Textarea label="Text area 5 rows" minRows={5} />
        <Textarea label="Text area maxLength" maxLength={10} />
      </form>
      <GuidePanel>
        Sit sint eu dolore reprehenderit exercitation labore aute anim
      </GuidePanel>
      <HelpText title="show tooltip">
        Id ullamco excepteur elit fugiat labore.
      </HelpText>
      <NextLink href="/linkTarget" passHref>
        <Link>Dette er en tekstlenke</Link>
      </NextLink>
      <NextLink href="/linkTarget" passHref>
        <LinkPanel>
          <LinkPanel.Title>Link panel title</LinkPanel.Title>
          <LinkPanel.Description>Link panel description</LinkPanel.Description>
        </LinkPanel>
      </NextLink>
      <Loader />
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="header123"
      >
        <Modal.Content>
          <h1 id="header123">Header</h1>
          <h2>subheader</h2>
          <p>Cupidatat irure ipsum veniam ad in esse.</p>
          <p>Cillum tempor pariatur amet ut laborum Lorem enim enim.</p>
        </Modal.Content>
      </Modal>
      <Pagination page={page} count={8} onPageChange={setPage} />
      <div className="bg-gray-600 text-white p-4" ref={(el) => setAnchorEl(el)}>
        Popover anchor
      </div>
      <Popover anchorEl={anchorEl} onClose={() => {}} open>
        <Popover.Content>Popover content</Popover.Content>
      </Popover>
      <ReadMore header="ReadMore header">ReadMore body</ReadMore>
      <div>
        <Chat
          avatar=""
          name="Kari Normann"
          timestamp="02.01.21 14:00"
          position="right"
        >
          <Chat.Bubble>
            Ut culpa consequat pariatur sint irure cupidatat laborum culpa elit
            cillum commodo dolore.
          </Chat.Bubble>
          <Chat.Bubble>
            Pariatur cillum laboris ut consectetur cillum sit nulla.
          </Chat.Bubble>
        </Chat>
        <Chat
          avatar={<div>ON</div>}
          name="Ola Normann"
          timestamp="01.01.21 14:00"
          position="left"
        >
          <Chat.Bubble>
            Ut culpa consequat pariatur sint irure cupidatat laborum culpa elit
            cillum commodo dolore.
          </Chat.Bubble>
          <Chat.Bubble>Ola skriver....</Chat.Bubble>
        </Chat>
        <Stepper activeStep={1} aria-labelledby="stepper-heading">
          <Stepper.Step>Start søknad</Stepper.Step>
          <Stepper.Step>Oppsummering</Stepper.Step>
          <Stepper.Step>Innsending</Stepper.Step>
        </Stepper>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Fornavn</Table.HeaderCell>
              <Table.HeaderCell>Etternavn</Table.HeaderCell>
              <Table.HeaderCell>Rolle</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell>1</Table.HeaderCell>
              <Table.DataCell>Jean-Luc</Table.DataCell>
              <Table.DataCell>Picard</Table.DataCell>
              <Table.DataCell>Kaptein</Table.DataCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>2</Table.HeaderCell>
              <Table.DataCell>William</Table.DataCell>
              <Table.DataCell>Riker</Table.DataCell>
              <Table.DataCell>Kommandør</Table.DataCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>3</Table.HeaderCell>
              <Table.DataCell>Geordi</Table.DataCell>
              <Table.DataCell>La Forge</Table.DataCell>
              <Table.DataCell>Sjefsingeniør</Table.DataCell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Tabs defaultValue="test2">
          <Tabs.List>
            <Tabs.Tab value="test1" icon={<Cup />} label="Skap" />
            <Tabs.Tab
              value="test2"
              label="Oppvaskmaskin"
              icon={<Dishwasher />}
            />
            <Tabs.Tab value="test3" icon={<Freezer />} label="Fryser" />
          </Tabs.List>
          <Tabs.Panel value="test1" className="h-20 bg-gray-50">
            Innholdspanel for Skap-tab
          </Tabs.Panel>
          <Tabs.Panel value="test2" className="h-20 bg-green-50">
            Innholdspanel for Oppvaskmaskin-tab
          </Tabs.Panel>
          <Tabs.Panel value="test3" className="h-20 bg-red-50">
            Innholdspanel for Fryser-tab
          </Tabs.Panel>
        </Tabs>
        <div className="flex gap-2">
          {(
            ["info", "warning", "success", "error"] as Array<
              "info" | "warning" | "success" | "error"
            >
          ).map((variant) => (
            <Tag key={variant} variant={variant}>
              {variant}
            </Tag>
          ))}
        </div>
        <ToggleGroup defaultValue="lest" onChange={() => {}}>
          <ToggleGroup.Item value="ulest">Ulest</ToggleGroup.Item>
          <ToggleGroup.Item value="lest">Leste</ToggleGroup.Item>
          <ToggleGroup.Item value="sendt">Sendte</ToggleGroup.Item>
        </ToggleGroup>
        <Tooltip content="Tooltip content">
          <div>Hover me for tooltip!</div>
        </Tooltip>
        <BodyLong>Body long</BodyLong>
        <BodyShort>Body short</BodyShort>
        <Detail>Detail</Detail>
        <Heading size="xlarge">Heading</Heading>
        <Ingress>Ingress</Ingress>
        <Label>Label</Label>
        <Dropdown>
          <Dropdown.Toggle>Toggle</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Menu.GroupedList>
              <Dropdown.Menu.GroupedList.Heading>
                Systemer og oppslagsverk
              </Dropdown.Menu.GroupedList.Heading>
              <Dropdown.Menu.GroupedList.Item>
                Gosys
              </Dropdown.Menu.GroupedList.Item>
            </Dropdown.Menu.GroupedList>
            <Dropdown.Menu.Divider />
            <Dropdown.Menu.List>
              <Dropdown.Menu.List.Item>Gosys</Dropdown.Menu.List.Item>
              <Dropdown.Menu.List.Item>Psys</Dropdown.Menu.List.Item>
              <Dropdown.Menu.List.Item disabled>
                Infotrygd
              </Dropdown.Menu.List.Item>
            </Dropdown.Menu.List>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Home;
