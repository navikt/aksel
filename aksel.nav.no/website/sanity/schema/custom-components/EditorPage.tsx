import { Accordion, BodyShort, Heading, Link, Loader } from "@navikt/ds-react";
import React from "react";
import { Card } from "@sanity/ui";
import { IntentButton, Preview } from "sanity";
import { useCurrentUser } from "sanity";
import { getPublishedId, useClient, useSchema, useFormValue } from "sanity";
import useSWR from "swr";

const DocumentList = ({ data, type }: { data: any[]; type: string }) => {
  const schema = useSchema();

  const schemType = schema.get(type);

  return (
    <ul>
      {data
        .filter((x) => x._type === type)
        .map((x) => (
          <li key={x._id}>
            <Card flex={1}>
              <IntentButton
                intent="edit"
                mode="ghost"
                padding={1}
                radius={0}
                params={{
                  type,
                  id: getPublishedId(x._id),
                }}
                style={{ width: "100%" }}
              >
                <Preview
                  layout="default"
                  schemaType={schemType}
                  value={x}
                  key={x._id}
                />
              </IntentButton>
            </Card>
          </li>
        ))}
    </ul>
  );
};

export const EditorPage = ({ ...rest }) => {
  const user = useCurrentUser();
  const userId = useFormValue([`user_id`]) as { current?: string };

  const client = useClient({ apiVersion: "2021-06-07" });
  const { data, error } = useSWR(
    `*[count((contributors[]->user_id.current)[@ == "${userId?.current}"]) > 0]`,
    (query) => client.fetch(query)
  );
  /* contributors */

  if (error || !user) {
    return <div>Feilet lasting av bruker</div>;
  }
  if (!data) {
    return (
      <div>
        <Loader size="2xlarge" />
      </div>
    );
  }

  console.log(data);

  const getDocCount = (type: string) =>
    data.filter((x) => x._type === type)?.length;

  return (
    <div>
      <div>
        <Heading level="2" size="small" spacing>
          Dine tilganger i Aksel studio
        </Heading>
        <dl>
          {user.roles.map((x) => (
            <React.Fragment key={x.name}>
              <dt>{x.title}</dt>
              <dd className="ml-4 mb-2 list-item last-of-type:mb-7">
                {x.description}
              </dd>
            </React.Fragment>
          ))}
        </dl>
        <p>
          Om det er noe du mangler tilgang til kan du sende melding på{" "}
          <Link href="https://nav-it.slack.com/archives/C0370ADS0HX">
            #Aksel
          </Link>
        </p>
      </div>
      <div className="mt-7">
        <Heading level="2" size="small" spacing>
          Innhold du jobber med
        </Heading>
        <BodyShort spacing>
          Dette er alle artikler du jobber med eller må godkjenne asap.
        </BodyShort>
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>Artikler under arbeid (3)</Accordion.Header>
            <Accordion.Content>asdas</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Header>Artikler til godkjenning (2)</Accordion.Header>
            <Accordion.Content>content</Accordion.Content>
          </Accordion.Item>
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
          <Accordion.Item>
            <Accordion.Header>
              God praksis ({getDocCount("aksel_artikkel")})
            </Accordion.Header>
            <Accordion.Content>
              <DocumentList data={data} type="aksel_artikkel" />
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Header>
              Produktbloggen ({getDocCount("aksel_blogg")})
            </Accordion.Header>
            <Accordion.Content>
              <DocumentList data={data} type="aksel_blogg" />
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Header>
              Grunnleggende ({getDocCount("ds_artikkel")})
            </Accordion.Header>
            <Accordion.Content>
              <DocumentList data={data} type="ds_artikkel" />
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Header>
              Komponenter ({getDocCount("komponent_artikkel")})
            </Accordion.Header>
            <Accordion.Content>
              <DocumentList data={data} type="komponent_artikkel" />
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Header>
              Prinsipper ({getDocCount("aksel_prinsipp")})
            </Accordion.Header>
            <Accordion.Content>
              <DocumentList data={data} type="aksel_prinsipp" />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};
