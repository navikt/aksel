import * as React from "react";
import Menu from "../src/index";
import { useEffect } from "react";
import { Layout } from "../../layout/src";
import { ContentContainer } from "../../content-container/src";
import { Main } from "../../layout/stories/components/sections/Main";
import { Right } from "../../layout/stories/components/sections/Right";
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
            <Menu.Item href={"#nulla-pariatur"}>Ipsum quia</Menu.Item>
            <Menu.Item href={"#test1"}>Perspiciatis unde omnis</Menu.Item>
            <Menu.Item href={"#test1"}>Voluptatem accusantium</Menu.Item>
          </Menu.Collapsable>
          <Menu.Item href={"#test3"}>Dolores eos</Menu.Item>
          <Menu.Item href={"#test4"}>Ratione voluptatem</Menu.Item>
          <Menu.Item href={"#test5"}>Quis nostrum</Menu.Item>
          <Menu.Collapsable title={"Etiam viverra"}>
            <Menu.Collapsable title={"Ullam corporis"}>
              <Menu.Item href={"#test1"}>Curabitur a purus</Menu.Item>
              <Menu.Item href={"#test1"}>Scelerisque sapien</Menu.Item>
              <Menu.Item href={"#test1"}>Sed ac augue</Menu.Item>
            </Menu.Collapsable>
            <Menu.Item href={"#test1"}>Cras vestibulum</Menu.Item>
            <Menu.Item href={"#test1"}>Metus sed pellentesque.</Menu.Item>
          </Menu.Collapsable>
        </Menu>
      </Layout.Section>
      <Layout.Section>
        <Main />
      </Layout.Section>
      <Layout.Section right sticky>
        <Right />
      </Layout.Section>
    </Layout>
  </ContentContainer>
);
