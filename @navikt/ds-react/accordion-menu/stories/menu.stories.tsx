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
        <Menu>
          <Menu.Dropdown title={"Dropdown 1"}>
            <Menu.Item href={"#test1"}>Dropdown 1 lenke 1</Menu.Item>
            <Menu.Item href={"#test1"}>Dropdown 2 lenke 2</Menu.Item>
            <Menu.Item href={"#test1"}>Dropdown 3 lenke 3</Menu.Item>
          </Menu.Dropdown>
          <Menu.Item href={"#test2"}>Lenke 1</Menu.Item>
          <Menu.Item href={"#test3"}>Lenke 2</Menu.Item>
          <Menu.Item href={"#test4"}>Lenke 3</Menu.Item>
          <Menu.Item href={"#test5"}>Lenke 4</Menu.Item>
          <Menu.Dropdown title={"Dropdown 2"}>
            <Menu.Dropdown title={"Dropdown 2 Subdropdown 1"}>
              <Menu.Item href={"#test1"}>Dropdown 3 lenke 1</Menu.Item>
              <Menu.Item href={"#test1"}>Dropdown 3 lenke 2</Menu.Item>
              <Menu.Item href={"#test1"}>Dropdown 3 lenke 3</Menu.Item>
            </Menu.Dropdown>
            <Menu.Item href={"#test1"}>Dropdown 2 lenke 2</Menu.Item>
            <Menu.Item href={"#test1"}>Dropdown 2 lenke 3</Menu.Item>
          </Menu.Dropdown>
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
