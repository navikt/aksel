import React, { useEffect } from "react";
import { BodyLong, Heading, VStack } from "@navikt/ds-react";
import { TextWithMarkdown } from "@/web/TextWithMarkdown";
import { TokenForDocumentationT } from "../types/tokens";
import TokenRolesChips from "./TokenRolesChips";
import { BreakpointRoleT, ColorRoleT, FontRoleT } from "./config";
import { sortTokens } from "./token-utils";
import TokenEntry from "./token/example/TokenEntry";

const TokenCategory = ({
  id,
  title,
  description,
  roles,
  tokens,
}: {
  id: string;
  title: string;
  description: string;
  roles?: ColorRoleT[] | FontRoleT[] | BreakpointRoleT[];
  tokens: TokenForDocumentationT[];
}) => {
  const filteredRoles = roles?.filter((role) =>
    tokens.some((token) => token.role === role.id),
  );
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
  const filteredTokens =
    selectedRole === null
      ? tokens
      : tokens.filter((token) => token.role === selectedRole);
  const filteredAndSortedTokens = filteredTokens.sort(sortTokens);

  useEffect(() => {
    if (filteredRoles?.length === 1) {
      setSelectedRole(filteredRoles[0].id);
    }
  }, [filteredRoles]);

  const descriptionForSelectedRole =
    selectedRole &&
    roles?.find((role) => role.id === selectedRole)?.description;

  return (
    <section aria-labelledby={id}>
      <Heading
        id={id}
        level="2"
        size="large"
        spacing
        style={{ scrollMarginBlockStart: "6rem" }}
      >
        {title}
      </Heading>
      <div>
        <VStack gap="4">
          {description && (
            <BodyLong as="p">
              <TextWithMarkdown>{description}</TextWithMarkdown>
            </BodyLong>
          )}
          {filteredRoles && (
            <TokenRolesChips
              roles={filteredRoles}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
            />
          )}
          {descriptionForSelectedRole && (
            <BodyLong as="p">
              <TextWithMarkdown>{descriptionForSelectedRole}</TextWithMarkdown>
            </BodyLong>
          )}
          <div>
            {filteredAndSortedTokens.map((token, index) => {
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
