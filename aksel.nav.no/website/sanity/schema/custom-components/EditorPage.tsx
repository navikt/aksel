import {
  Accordion,
  BodyShort,
  Heading,
  Label,
  Link,
  Loader,
} from "@navikt/ds-react";
import { differenceInMonths } from "date-fns";
import React, { useMemo } from "react";
import {
  IntentButton,
  Preview,
  getPublishedId,
  useClient,
  useCurrentUser,
  useFormValue,
  useSchema,
} from "sanity";
import useSWR from "swr";

const DocumentList = ({
  data,
  type,
  title,
}: {
  data: any[];
  type: string;
  title: string;
}) => {
  const schema = useSchema();

  const schemaType = schema.get(type);

  const list = useMemo(
    () => data.filter((x) => x._type === type),
    [data, type]
  );

  return (
    <Accordion.Item>
      <Accordion.Header>{`${title} (${list.length})`}</Accordion.Header>
      <Accordion.Content>
        <ul>
          {list.map((x) => (
            <li key={x._id}>
              <IntentButton
                intent="edit"
                mode="bleed"
                padding={1}
                radius={2}
                params={{
                  type,
                  id: getPublishedId(x._id),
                }}
                style={{ width: "100%" }}
              >
                <Preview schemaType={schemaType} value={x} key={x._id} />
              </IntentButton>
            </li>
          ))}
        </ul>
      </Accordion.Content>
    </Accordion.Item>
  );
};

const OutDatedList = ({ data }: { data: any[] }) => {
  const schema = useSchema();

  const isAfter = (date) => differenceInMonths(new Date(), new Date(date)) >= 6;

  const list = useMemo(
    () =>
      data.filter(
        (x) =>
          isAfter(x?.updateInfo?.lastVerified) &&
          ["ds_artikkel", "aksel_artikkel", "komponent_artikkel"].includes(
            x._type
          )
      ),
    [data]
  );

  return (
    <Accordion.Item>
      <Accordion.Header>
        Artikler som må godkjennes ({list.length})
      </Accordion.Header>
      <Accordion.Content>
        <ul>
          {list.map((x) => (
            <li key={x._id}>
              <IntentButton
                intent="edit"
                mode="ghost"
                padding={1}
                radius={0}
                params={{
                  type: x._type,
                  id: getPublishedId(x._id),
                }}
                style={{ width: "100%" }}
              >
                <Preview
                  layout="default"
                  schemaType={schema.get(x._type)}
                  value={x}
                  key={x._id}
                />
              </IntentButton>
            </li>
          ))}
        </ul>
      </Accordion.Content>
    </Accordion.Item>
  );
};

const DraftList = ({ data }: { data: any[] }) => {
  const schema = useSchema();

  const list = useMemo(
    () => data.filter((x) => x._id.startsWith("draft")),
    [data]
  );

  return (
    <Accordion.Item>
      <Accordion.Header>Artikler under arbeid ({list.length})</Accordion.Header>
      <Accordion.Content>
        <ul>
          {list.map((x) => (
            <li key={x._id}>
              <IntentButton
                intent="edit"
                mode="ghost"
                padding={1}
                radius={0}
                params={{
                  type: x._type,
                  id: getPublishedId(x._id),
                }}
                style={{ width: "100%" }}
              >
                <Preview
                  layout="default"
                  schemaType={schema.get(x._type)}
                  value={x}
                  key={x._id}
                />
              </IntentButton>
            </li>
          ))}
        </ul>
      </Accordion.Content>
    </Accordion.Item>
  );
};

export const EditorPage = () => {
  const user = useCurrentUser();
  const userId = useFormValue([`user_id`]) as { current?: string };

  const client = useClient({ apiVersion: "2021-06-07" });
  const { data, error } = useSWR(
    `*[count((contributors[]->user_id.current)[@ == "${userId?.current}"]) > 0]`,
    (query) => client.fetch(query)
  );

  if (error || !user) {
    return <div>Feilet lasting av bruker...</div>;
  }
  if (!data) {
    return (
      <div className="mx-auto mt-24">
        <Loader size="xlarge" variant="neutral" />
      </div>
    );
  }

  return (
    <div>
      <div>
        <Heading level="2" size="small" spacing>
          Dine tilganger
        </Heading>
        <dl>
          {user.roles.map((x) => (
            <React.Fragment key={x.name}>
              <Label as="dt">{x.title}</Label>
              <dd className="my-2 ml-4 list-item last-of-type:mb-7">
                {x.description}
              </dd>
            </React.Fragment>
          ))}
        </dl>
        <p>
          Om det er noe du mangler tilgang til kan du sende melding på{" "}
          <Link href="https://nav-it.slack.com/archives/C7NE7A8UF">
            #Aksel-designsystemet
          </Link>
        </p>
      </div>

      <div className="mt-7">
        <Heading level="2" size="small" spacing>
          Under arbeid / må re-valideres
        </Heading>
        <Accordion>
          <DraftList data={data} />
          <OutDatedList data={data} />
        </Accordion>
      </div>
      <div className="mt-7">
        <Heading level="2" size="small" spacing>
          Ditt innhold i Aksel
        </Heading>
        <BodyShort spacing>
          Dette er alle artikler du står som forfatter av.
        </BodyShort>
        <Accordion>
          <DocumentList data={data} type="aksel_artikkel" title="God praksis" />
          <DocumentList data={data} type="aksel_blogg" title="Produktbloggen" />
          <DocumentList data={data} type="ds_artikkel" title="Grunnleggende" />
          <DocumentList
            data={data}
            type="komponent_artikkel"
            title="Komponenter"
          />
          <DocumentList data={data} type="aksel_prinsipp" title="Prinsipper" />
        </Accordion>
      </div>
    </div>
  );
};
