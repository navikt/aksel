import React from "react";
import { useCurrentUser } from "sanity";
import { Heading, Label, Link } from "@navikt/ds-react";

export const EditorPage = (...rest) => {
  const user = useCurrentUser();

  if (!user) {
    return null;
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
