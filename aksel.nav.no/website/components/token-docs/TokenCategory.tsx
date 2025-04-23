import React, { useEffect } from "react";
import { BodyLong, Heading, VStack } from "@navikt/ds-react";
import { TextWithMarkdown } from "@/web/TextWithMarkdown";
import { TokenForDocumentationT } from "../types/tokens";
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
  roles?: ColorRolesT | FontRolesT | BreakpointRolesT;
  tokens: TokenForDocumentationT[];
}) => {
  const sortedTokens = tokens.sort(sortTokens);
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
  const filteredRoles = Object.entries(roles || {})
    .filter(([role]) => tokens.some((token) => token.role === role))
    .map(([, role]) => role);
  useEffect(() => {
    if (filteredRoles.length === 1) {
      setSelectedRole(filteredRoles[0].title.replace(" ", "-").toLowerCase());
    }
  }, [filteredRoles]);
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
          {selectedRole && roles && (
            <BodyLong as="p">
              <TextWithMarkdown>
                {roles[selectedRole]?.description}
              </TextWithMarkdown>
            </BodyLong>
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
