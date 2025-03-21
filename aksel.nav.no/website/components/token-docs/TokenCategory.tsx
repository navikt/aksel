import React from "react";
import { BodyLong, Heading, VStack } from "@navikt/ds-react";
import TokenRolesChips from "./TokenRolesChips";
import { BreakpointRolesT, ColorRolesT, FontRolesT } from "./config";
import { sortTokens } from "./token-utils";
import TokenEntry from "./token/example/TokenEntry";

const TokenCategory = ({
  id,
  title,
  description = "Lorem ipsum",
  roles,
  tokens,
}: {
  id: string;
  title: string;
  description: string;
  roles?: ColorRolesT[] | FontRolesT[] | BreakpointRolesT[];
  tokens: (typeof tokenDocs)[number][];
}) => {
  const sortedTokens = tokens.sort(sortTokens);
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
  return (
    <section aria-labelledby={id}>
      <Heading id={id} level="2" size="large" spacing>
        {title}
      </Heading>
      <div>
        <VStack gap="4">
          <BodyLong as="p">{description}</BodyLong>
          {roles && (
            <TokenRolesChips
              roles={roles}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
            />
          )}
          <div>
            {sortedTokens
              .filter(
                (token) => selectedRole === null || token.role === selectedRole,
              )
              .map((token, index) => {
                return (
                  <TokenEntry token={token} key={token.name} index={index} />
                );
              })}
          </div>
        </VStack>
      </div>
    </section>
  );
};

export default TokenCategory;
