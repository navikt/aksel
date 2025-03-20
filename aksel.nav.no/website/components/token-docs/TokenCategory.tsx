import React from "react";
import { BodyLong, Chips, Heading, VStack } from "@navikt/ds-react";
import { TOKEN_CATEGORIES } from "./config";
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
  const sortedTokens = tokens.sort((a, b) => {
    switch (a.category) {
      case "backgroundColor":
      case "borderColor":
      case "textColor": {
        if ((a.role || "") > (b.role || "")) {
          return 1;
        } else if ((a.role || "") < (b.role || "")) {
          return -1;
        }
        return 0;
      }
      case "breakpoint":
        return (
          parseFloat(a.value.replace("px", "")) -
          parseFloat(b.value.replace("px", ""))
        );
      case "font": {
        if (a.group === b.group) {
          if (a.modifier === b.modifier) {
            return (
              parseFloat(a.rawValue.replace("rem", "")) -
              parseFloat(b.rawValue.replace("rem", ""))
            );
          }
          return (a.modifier || "").localeCompare(b.modifier || "", "nb") || -1;
        }
        return (a.group || "").localeCompare(b.group || "", "nb");
      }
      default:
        return parseFloat(a.rawValue.replace("px", "")) >
          parseFloat(b.rawValue.replace("px", ""))
          ? 1
          : -1;
    }
  });
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
  return (
    <section>
      <Heading id={category} level="2" size="large" spacing>
        {TOKEN_CATEGORIES[category]}
      </Heading>
      <div>
        <VStack gap="4">
          <BodyLong as="p">{description}</BodyLong>
          <Chips>
            {roles.length > 0 &&
              roles.map((role) => (
                <Chips.Toggle
                  checkmark={false}
                  key={role}
                  selected={selectedRole === role}
                  onClick={() =>
                    selectedRole !== role
                      ? setSelectedRole(role)
                      : setSelectedRole(null)
                  }
                >
                  {role
                    .split("-")
                    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                    .join(" ")}
                </Chips.Toggle>
              ))}
          </Chips>
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
