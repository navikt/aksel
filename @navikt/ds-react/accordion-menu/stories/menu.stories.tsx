import * as React from "react";
import Menu from "../src/index";
import { useEffect } from "react";
import { Right } from "../../layout/stories/components/sections/Right";
import { ContentContainer, Heading, Layout } from "../../index";
import { Normaltekst } from "nav-frontend-typografi";
import "./components/styles.css";

export default {
  title: "@navikt/accordion-menu",
  component: { Menu },
  decorators: [
    (Story) => {
      useEffect(() => {
        document.getElementById("decorator-header").style.display = "block";
        document.getElementById("decorator-footer").style.display = "block";
        return () => {
          document.getElementById("decorator-header").style.display = "none";
          document.getElementById("decorator-footer").style.display = "none";
        };
      }, []);
      return <Story />;
    },
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "NAV gray",
      values: [
        {
          name: "NAV gray",
          value: "#f1f1f1",
        },
        {
          name: "white",
          value: "#ffffff",
        },
      ],
    },
  },
};

export const All = () => (
  <ContentContainer>
    <Layout>
      <Layout.Section left sticky>
        <Menu title={"Minima"}>
          <Menu.Item href={"#quis-autem"}>Quis autem </Menu.Item>
          <Menu.Collapsable title={"Nulla pariatur?"}>
            <Menu.Item href={"#ipsum-quia"}>Ipsum quia</Menu.Item>
            <Menu.Item href={"#perspiciatis-unde-omnis"}>
              Perspiciatis unde omnis
            </Menu.Item>
            <Menu.Item href={"#voluptatem-accusantium"}>
              Voluptatem accusantium
            </Menu.Item>
          </Menu.Collapsable>
          <Menu.Item href={"#dolores-eos"}>Dolores eos</Menu.Item>
          <Menu.Item href={"#ratione-voluptatem"}>Ratione voluptatem</Menu.Item>
          <Menu.Item href={"#quis-nostrum"}>Quis nostrum</Menu.Item>
        </Menu>
      </Layout.Section>
      <Layout.Section>
        <div>
          <a id="quis-autem" />
          <Heading size={"xl"} level={1}>
            Quis autem
          </Heading>
          <Normaltekst className={"navds-story-section"}>
            Proin nec luctus justo. Pellentesque et dapibus libero. Phasellus
            non elit eget justo mattis venenatis.
          </Normaltekst>
        </div>
        <div>
          <a id="quis-autem" />
          <Heading className={"navds-story-section"} level={2}>
            Nulla pariatur
          </Heading>
          <Normaltekst className={"navds-story-section"}>
            Proin nec luctus justo. Pellentesque et dapibus libero. Phasellus
            non elit eget justo mattis venenatis.
          </Normaltekst>
          <a id="ipsum-quia" />
          <Heading className={"navds-story-section"} level={3}>
            Ipsum quia
          </Heading>
          Nam id metus libero. Nunc sed ipsum neque. Donec et tortor sit amet
          eros condimentum facilisis non vitae massa.
          <a id="perspiciatis-unde-omnis" />
          <Heading className={"navds-story-section"} level={3}>
            Perspiciatis unde omnis
          </Heading>
          Nam id metus libero. Nunc sed ipsum neque. Donec et tortor sit amet
          eros condimentum facilisis non vitae massa.
          <a id="voluptatem-accusantium" />
          <Heading className={"navds-story-section"} level={3}>
            Voluptatem accusantium
          </Heading>
          Nam id metus libero. Nunc sed ipsum neque. Donec et tortor sit amet
          eros condimentum facilisis non vitae massa.
        </div>
        <div>
          <a id="dolores-eos" />
          <Heading className={"navds-story-section"} level={2}>
            Dolores eos
          </Heading>
          Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Fusce finibus nunc et ex bibendum fermentum.
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos.
        </div>
        <div>
          <a id="ratione-voluptatem" />
          <Heading className={"navds-story-section"} level={2}>
            Ratione voluptatem
          </Heading>
          <Normaltekst className={"navds-story-section"}>
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Fusce finibus nunc et ex bibendum fermentum.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos.
          </Normaltekst>
          <Normaltekst className={"navds-story-section"}>
            Suspendisse ullamcorper sapien at augue ornare sagittis. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Proin quis erat
            elementum, dictum mauris ac, convallis ipsum.
          </Normaltekst>
        </div>
        <div>
          <a id="quis-nostrum" />
          <Heading className={"navds-story-section"} level={2}>
            Quis nostrum
          </Heading>
          <Normaltekst className={"navds-story-section"}>
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Fusce finibus nunc et ex bibendum fermentum.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos.
          </Normaltekst>
          <Normaltekst className={"navds-story-section"}>
            Mauris et mauris auctor, consequat felis vitae, tincidunt arcu.
          </Normaltekst>
          <Normaltekst className={"navds-story-section"}>
            Sed congue massa lectus, laoreet ultricies augue pharetra nec. Etiam
            eleifend velit eget tortor sollicitudin, eget finibus nunc dapibus.
            Maecenas eu justo ultrices, lacinia neque nec, rutrum eros. Duis at
            mauris rutrum, feugiat augue at, congue urna. Quisque eu ante
            tortor. Nulla a urna leo. Nunc id ultrices elit. Etiam pulvinar
            ipsum eget nisl vehicula, bibendum porta odio facilisis. Vivamus
            eleifend orci gravida, vulputate mauris quis, euismod sapien. In
            faucibus placerat pharetra.
          </Normaltekst>
        </div>
      </Layout.Section>
      <Layout.Section right sticky>
        <Right />
      </Layout.Section>
    </Layout>
  </ContentContainer>
);
