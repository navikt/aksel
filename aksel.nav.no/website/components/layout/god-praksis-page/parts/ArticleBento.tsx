import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Box, Button, HGrid, HStack, Heading } from "@navikt/ds-react";
import { ArticleCard } from "./ArticleCard";

function ArticleBento({ name }) {
  return (
    <>
      <style>
        {`
          .aksel-bento {
              height: 350px;
          }
          `}
      </style>
      <Box>
        <HStack justify="space-between">
          <Heading level="2" size="medium" className="text-aksel-heading">
            {name}
          </Heading>
          <Button
            variant="tertiary-neutral"
            size="small"
            icon={<ArrowRightIcon aria-hidden />}
            iconPosition="right"
          >
            Se alle
          </Button>
        </HStack>
        <Box paddingBlock="5 0">
          <HGrid gap="6" columns="1fr 1fr 1fr" className="aksel-bento">
            <ArticleCard
              title="New things"
              main
              content={`Return to the fleet. What is the point of all this? We can't blow
                up three tiny cruisers? They are faster and lighter, sir. They
                can't lose us but they can keep at a range where, that our cannons
                are not effective against their shields. Well, keep up the
                barrage. Return to the fleet. What is the point of all this? We can't blow
                up three tiny cruisers? They are faster and lighter, sir. They
                can't lose us but they can keep at a range where, that our cannons
                are not effective against their shields. Well, keep up the
                barrage. Return to the fleet. What is the point of all this? We can't blow
                up three tiny cruisers? They are faster and lighter, sir. They
                can't lose us but they can keep at a range where, that our cannons
                are not effective against their shields. Well, keep up the
                barrage.`}
            />

            <ArticleCard
              title="New things"
              content={`Return to the fleet. What is the point of all this? We can't blow
                up three tiny cruisers? They are faster and lighter, sir. They
                can't lose us but they can keep at a range where, that our cannons
                are not effective against their shields. Well, keep up the
                barrage. Return to the fleet. What is the point of all this? We can't blow
                up three tiny cruisers? They are faster and lighter, sir. They
                can't lose us but they can keep at a range where, that our cannons
                are not effective against their shields. Well, keep up the
                barrage. Return to the fleet. What is the point of all this? We can't blow
                up three tiny cruisers? They are faster and lighter, sir. They
                can't lose us but they can keep at a range where, that our cannons
                are not effective against their shields. Well, keep up the
                barrage.`}
            />
            <ArticleCard
              title="New things"
              content={`Return to the fleet. What is the point of all this? We can't blow
                up three tiny cruisers? They are faster and lighter, sir. They
                can't lose us but they can keep at a range where, that our cannons
                are not effective against their shields. Well, keep up the
                barrage. Return to the fleet. What is the point of all this? We can't blow
                up three tiny cruisers? They are faster and lighter, sir. They
                can't lose us but they can keep at a range where, that our cannons
                are not effective against their shields. Well, keep up the
                barrage. Return to the fleet. What is the point of all this? We can't blow
                up three tiny cruisers? They are faster and lighter, sir. They
                can't lose us but they can keep at a range where, that our cannons
                are not effective against their shields. Well, keep up the
                barrage.`}
            />
          </HGrid>
        </Box>
      </Box>
    </>
  );
}

export default ArticleBento;
