import React from "react";
import { BodyLong, Heading, VStack } from "@navikt/ds-react";
import TokenRolesChips from "./TokenRolesChips";
import { TOKEN_CATEGORIES } from "./config";
import { sortTokens } from "./token-utils";
import TokenEntry from "./token/example/TokenEntry";

const TokenCategory = ({
  category,
  description = "Lorem ipsum",
  tokens,
}: {
  category: string;
  description: string;
  tokens: (typeof tokenDocs)[number][];
}) => {
  const roles = tokens
    .filter((token) => token.role !== undefined)
    .map((token) => token.role)
    .filter(
      (role, index, array) => array.findIndex((r) => r === role) === index,
    )
    .sort();
  const sortedTokens = tokens.sort(sortTokens);
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
  return (
    <section>
      <Heading id={category} level="2" size="large" spacing>
        {TOKEN_CATEGORIES[category]}
      </Heading>
      <div>
        <VStack gap="4">
          <BodyLong as="p">{description}</BodyLong>
          <TokenRolesChips
            roles={roles}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
          />
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
