import React, { HTMLAttributes, forwardRef } from "react";
import { Bleed } from "../layout/bleed";
import { Box } from "../layout/box";
import { HStack, VStack } from "../layout/stack";
import { Link } from "../link";
import { Heading } from "../typography";

type CustomContentSection = {
  title: string;
  content: string;
};

type SummaryContent = {
  title: string;
  content: string;
  customContentSection: CustomContentSection[];
};

type SummaryItem = {
  title: string;
  editLink: string;
  content: SummaryContent[];
};

export interface SummaryProps extends HTMLAttributes<HTMLDivElement> {
  items: SummaryItem[];
}

export const Summary = forwardRef<HTMLDivElement, SummaryProps>(({ items }) => {
  return (
    <div className="navds-summary">
      <Heading size="large">Oppsummering</Heading>
      <VStack gap="8">
        {items.map((item, i) => {
          return (
            <Box
              borderColor="border-subtle"
              borderWidth="1"
              borderRadius="large"
              // paddingBlock="4"
              // paddingInline="4"
              background="bg-subtle"
              key={i}
            >
              <HStack gap="4">
                <Heading size="medium">{item.title}</Heading>
                <Link href={item.editLink}>Endre</Link>
              </HStack>
              <Bleed marginInline="4" reflectivePadding asChild>
                <Box background="bg-default">
                  {item.content.map((content, j) => {
                    return (
                      <Box key={j}>
                        <Box>
                          {content.title}
                          <Box>{content.content}</Box>
                        </Box>
                        {content.customContentSection.map(
                          (customContent, k) => {
                            return (
                              <Box key={k}>
                                {customContent.title}
                                <Box>{customContent.content}</Box>
                              </Box>
                            );
                          },
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Bleed>
            </Box>
          );
        })}
      </VStack>
    </div>
  );
});

export default Summary;
