import React from "react";
import { ProductHeader } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { illustrationPictogram } from "./pictogram";
export default {
  title: "ds-react/product-header",
  component: ProductHeader,
} as Meta;

export const All = () => {
  return (
    <div>
      <h2>ProductHeader</h2>
      <ProductHeader>
        <ProductHeader.Wrapper>
          <ProductHeader.Heading>
            Arbeidsavklaringspenger (AAP)
          </ProductHeader.Heading>
          <ProductHeader.Description>
            PENGESTØTTE OG OPPFØLGING
          </ProductHeader.Description>
        </ProductHeader.Wrapper>
      </ProductHeader>

      <br />
      <h2>ProductHeader m/illustration</h2>

      <ProductHeader>
        <ProductHeader.Illustration>
          {illustrationPictogram}
        </ProductHeader.Illustration>
        <ProductHeader.Wrapper>
          <ProductHeader.Heading>
            Arbeidsavklaringspenger (AAP)
          </ProductHeader.Heading>
          <ProductHeader.Description>
            PENGESTØTTE OG OPPFØLGING
          </ProductHeader.Description>
        </ProductHeader.Wrapper>
      </ProductHeader>
      <h2>ProductHeader center</h2>
      <ProductHeader variant="center">
        <ProductHeader.Wrapper>
          <ProductHeader.Heading>
            Arbeidsavklaringspenger (AAP)
          </ProductHeader.Heading>
          <ProductHeader.Description>
            PENGESTØTTE OG OPPFØLGING
          </ProductHeader.Description>
        </ProductHeader.Wrapper>
      </ProductHeader>
      <h2>ProductHeader center m/illustration</h2>
      <ProductHeader variant="center">
        <ProductHeader.Illustration>
          {illustrationPictogram}
        </ProductHeader.Illustration>
        <ProductHeader.Wrapper>
          <ProductHeader.Heading>
            Arbeidsavklaringspenger (AAP)
          </ProductHeader.Heading>
          <ProductHeader.Description>
            PENGESTØTTE OG OPPFØLGING
          </ProductHeader.Description>
        </ProductHeader.Wrapper>
      </ProductHeader>
      <h2>Header variants</h2>
      <ProductHeader theme="guide">
        <ProductHeader.Wrapper>
          <ProductHeader.Heading>
            Arbeidsavklaringspenger (AAP)
          </ProductHeader.Heading>
          <ProductHeader.Description>
            PENGESTØTTE OG OPPFØLGING
          </ProductHeader.Description>
        </ProductHeader.Wrapper>
      </ProductHeader>
      <ProductHeader theme="product">
        <ProductHeader.Wrapper>
          <ProductHeader.Heading>
            Arbeidsavklaringspenger (AAP)
          </ProductHeader.Heading>
          <ProductHeader.Description>
            PENGESTØTTE OG OPPFØLGING
          </ProductHeader.Description>
        </ProductHeader.Wrapper>
      </ProductHeader>
      <ProductHeader theme="situation">
        <ProductHeader.Wrapper>
          <ProductHeader.Heading>
            Arbeidsavklaringspenger (AAP)
          </ProductHeader.Heading>
          <ProductHeader.Description>
            PENGESTØTTE OG OPPFØLGING
          </ProductHeader.Description>
        </ProductHeader.Wrapper>
      </ProductHeader>
    </div>
  );
};
