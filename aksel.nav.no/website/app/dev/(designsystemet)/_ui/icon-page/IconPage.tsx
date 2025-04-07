import * as Icons from "@navikt/aksel-icons";
import { HGrid, HStack, Heading } from "@navikt/ds-react";
import { IconPageProvider } from "@/app/dev/(designsystemet)/_ui/icon-page/IconPage.provider";
import pagestyles from "../Designsystemet.module.css";
import { DesignsystemetPageLayout } from "../DesignsystemetPage";
import { IconPageButton } from "./IconPage.button";
import { IconPageForm } from "./IconPage.form";
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
  /* const focusRef = React.useRef<HTMLButtonElement | null>(null); */

  /* const hideModal = useMedia("screen and (min-width: 1024px)"); */

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
            columns={{ xs: 1, lg: "3fr minmax(300px, 2fr)" }}
            gap="space-40"
            marginBlock="space-24 0"
          >
            <section aria-label="Ikonliste" className="flex flex-col gap-10">
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
                            icon={
                              <T
                                fontSize="1.5rem"
                                aria-hidden
                                title={icon.name}
                              />
                            }
                          />
                        );
                      })}
                    </HStack>
                  </div>
                );
              })}
            </section>
            <section>modal thing</section>
          </HGrid>
        </div>
      </DesignsystemetPageLayout>
    </IconPageProvider>
  );
}

export { IconPage };
