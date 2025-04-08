import * as Icons from "@navikt/aksel-icons";
import { Button, HGrid, HStack, Heading } from "@navikt/ds-react";
import { EmptyStateCard } from "@/app/_ui/empty-state/EmptyState";
import { IconPageSidepanel } from "@/app/dev/(designsystemet)/_ui/icon-page/IconPage.sidepanel";
import pagestyles from "../Designsystemet.module.css";
import { DesignsystemetPageLayout } from "../DesignsystemetPage";
import { IconPageButton } from "./IconPage.button";
import { IconPageForm } from "./IconPage.form";
import { IconPageProvider } from "./IconPage.provider";
import { categorizeIcons, searchIcons } from "./IconPage.utils";

function IconPage({
  iconName,
  iconQuery,
  iconToggle,
}: {
  iconName?: string;
  iconQuery?: string;
  iconToggle: "stroke" | "fill";
}) {
  const iconsWithCategories = categorizeIcons(
    searchIcons({ query: iconQuery ?? "", toggle: iconToggle ?? "stroke" }),
  );

  return (
    <IconPageProvider>
      <DesignsystemetPageLayout>
        <div>
          <Heading
            level="1"
            size="xlarge"
            className={pagestyles.pageHeaderHeading}
          >
            Ikoner
          </Heading>
        </div>

        <div>
          <IconPageForm />
          <HGrid
            columns={{ xs: 1, xl: "3fr minmax(300px, 2fr)" }}
            gap="space-40"
            marginBlock="space-24 0"
          >
            <section aria-label="Ikonliste" className="flex flex-col gap-10">
              {iconsWithCategories.length === 0 && (
                <EmptyStateCard
                  variant="questionmark"
                  actionComponent={
                    <Button
                      as="a"
                      href="https://github.com/navikt/aksel/issues/new?labels=nytt+✨%2Cikoner+🖼%2Cforespørsel+🥰&template&template=new-icon.yaml&title=%5BNytt+ikon%5D%3A+"
                      variant="secondary-neutral"
                    >
                      Send innspill
                    </Button>
                  }
                />
              )}
              {iconsWithCategories.map((section) => {
                return (
                  <div key={section.category}>
                    <Heading level="2" size="large" spacing>
                      {section.category}
                    </Heading>

                    <HStack gap="space-8">
                      {section.icons.map((icon) => {
                        const T = Icons[`${icon.id}Icon`]; // eslint-disable-line import/namespace
                        if (T === undefined) {
                          return null;
                        }
                        return (
                          <IconPageButton
                            key={icon.id}
                            iconName={icon.id}
                            activeIconName={iconName}
                            icon={<T fontSize="1.5rem" title={icon.name} />}
                          />
                        );
                      })}
                    </HStack>
                  </div>
                );
              })}
            </section>
            <IconPageSidepanel iconName={iconName} />
          </HGrid>
        </div>
      </DesignsystemetPageLayout>
    </IconPageProvider>
  );
}

export { IconPage };
