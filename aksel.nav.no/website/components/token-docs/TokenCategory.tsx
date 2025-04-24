import React, { useEffect } from "react";
import { BodyShort, Heading, VStack } from "@navikt/ds-react";
import { TextWithMarkdown } from "@/web/TextWithMarkdown";
import { TokenForDocumentationT } from "../types/tokens";
import TokenRolesChips from "./TokenRolesChips";
import TokensList from "./TokensList";
import { BreakpointRoleT, ColorRoleT, FontRoleT } from "./config";
import { sortTokens } from "./token-utils";

const TokenCategory = ({
  id: categoryId,
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

  return (
    <VStack gap="space-32" aria-labelledby={categoryId} as="section">
      <div>
        <Heading
          id={categoryId}
          level="2"
          size="large"
          spacing
          style={{ scrollMarginBlockStart: "6rem" }}
        >
          {title}
        </Heading>
        {description && (
          <BodyShort as="p">
            <TextWithMarkdown>{description}</TextWithMarkdown>
          </BodyShort>
        )}
      </div>
      {filteredRoles && filteredRoles.length > 1 && (
        <TokenRolesChips
          roles={filteredRoles}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      )}
      {filteredRoles === undefined || filteredRoles.length === 0 ? (
        <TokensList tokens={filteredAndSortedTokens} />
      ) : (
        filteredRoles?.map((role) => {
          const tokensForRole = filteredAndSortedTokens.filter(
            (token) => token.role === role.id,
          );
          if (tokensForRole.length === 0) {
            return null;
          }
          return (
            <VStack gap="space-32" key={role.id}>
              <div>
                <Heading
                  level="3"
                  size="medium"
                  id={`${categoryId}-${role.id}`}
                  spacing
                  style={{ scrollMarginBlockStart: "6rem" }}
                >
                  {role.title}
                </Heading>
                <BodyShort as="p">
                  <TextWithMarkdown>{role.description}</TextWithMarkdown>
                </BodyShort>
              </div>
              <TokensList tokens={tokensForRole} />
            </VStack>
          );
        })
      )}
    </VStack>
  );
};

export default TokenCategory;
