import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { BodyShort, Heading, VStack } from "@navikt/ds-react";
import { MarkdownText } from "@/app/_ui/typography/MarkdownText";
import TokenRolesChips from "./TokenRolesChips";
import TokensList from "./TokensList";
import { BreakpointRoleT, ColorRoleT, FontRoleT } from "./config";
import { sortTokens } from "./token-utils";
import { TokenForDocumentationT } from "./types";

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
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
  const searchParams = useSearchParams();
  const tokenQuery = searchParams?.get("tokenQuery") as string | undefined;

  useEffect(() => {
    setSelectedRole(null);
  }, [tokenQuery]);

  const filteredRoles = roles?.filter((role) =>
    tokens.some((token) => token.role === role.id),
  );
  const filteredTokens =
    selectedRole === null
      ? tokens
      : tokens.filter((token) => token.role === selectedRole);
  const filteredAndSortedTokens = filteredTokens.sort(sortTokens);

  return (
    <VStack gap="space-24" aria-labelledby={categoryId} as="section">
      <VStack gap="space-16">
        <VStack gap="space-8">
          <Heading
            id={categoryId}
            level="2"
            size="large"
            style={{ scrollMarginBlockStart: "5.5rem" }}
          >
            {title}
          </Heading>
          {description && (
            <BodyShort as="p">
              <MarkdownText>{description}</MarkdownText>
            </BodyShort>
          )}
        </VStack>
        {filteredRoles && filteredRoles.length > 1 && (
          <TokenRolesChips
            category={title}
            roles={filteredRoles}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
          />
        )}
      </VStack>
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
            <VStack gap="space-16" key={role.id}>
              <VStack gap="space-8">
                <Heading
                  level="3"
                  size="medium"
                  id={`${categoryId}-${role.id}`}
                  style={{ scrollMarginBlockStart: "6rem" }}
                >
                  {role.title}
                </Heading>
                {role.description && (
                  <BodyShort as="p">
                    <MarkdownText>{role.description}</MarkdownText>
                  </BodyShort>
                )}
              </VStack>
              <TokensList tokens={tokensForRole} />
            </VStack>
          );
        })
      )}
    </VStack>
  );
};

export default TokenCategory;
