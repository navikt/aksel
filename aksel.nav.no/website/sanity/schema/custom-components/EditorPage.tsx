import React from "react";
import { useClient, useCurrentUser } from "sanity";
import useSWR from "swr";
import { Heading, Label, Link, Loader } from "@navikt/ds-react";
import { SANITY_API_VERSION } from "@/sanity/config";

export const EditorPage = () => {
  const user = useCurrentUser();

  const client = useClient({ apiVersion: SANITY_API_VERSION });
  const { data, error } = useSWR(
    `*[count((contributors[]->{email, alt_email})[@.email == "${user?.email}" || @.alt_email == "${user?.email}"]) > 0]`,
    (query) => client.fetch(query),
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
    </div>
  );
};
