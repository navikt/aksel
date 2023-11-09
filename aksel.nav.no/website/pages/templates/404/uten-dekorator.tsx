import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import {
  BodyShort,
  Box,
  HGrid,
  Heading,
  Link,
  List,
  Page,
} from "@navikt/ds-react";

export default function Example() {
  return (
    <Page footer={<Footer />}>
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="20 16">
          <HGrid gap="12" columns={{ sm: 1, md: 2 }}>
            <div>
              <Heading level="1" size="large" spacing>
                Beklager, vi fant ikke siden
              </Heading>
              <BodyShort>
                Denne siden kan være slettet eller flyttet, eller det er en feil
                i lenken.
              </BodyShort>
              <List>
                <List.Item>Bruk gjerne søket eller menyen</List.Item>
                <List.Item>
                  <Link href="#">Gå til forsiden</Link>
                </List.Item>
              </List>
            </div>
            <StatusSvg />
          </HGrid>
        </Box>
      </Page.Block>
    </Page>
  );
}

function StatusSvg() {
  return (
    <svg
      data-aksel-template="404-v1"
      width="min(100%, 500px)"
      viewBox="0 0 550 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="404-illustration"
    >
      <title id="404-illustration">404 - fant ikke siden</title>
      <path
        d="M60.0927 243.567L95.542 245.427L96.7806 221.769C97.1476 214.76 97.7964 206.556 98.7272 197.16C99.8768 187.775 100.745 179.584 101.33 172.585L100.017 172.516C97.0704 178.512 94.0083 184.612 90.831 190.815C87.6652 196.799 84.3842 202.887 80.9881 209.079L60.0927 243.567ZM90.8631 334.801L93.3058 288.143L4.68237 283.493L6.74662 244.063L84.0445 125.551L154.287 129.236L148.06 248.182L170.38 249.353L168.143 292.069L145.823 290.898L143.381 337.556L90.8631 334.801Z"
        stroke="var(--a-border-default)"
        strokeWidth="2.19124"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="6.57 8.76"
      />
      <path
        d="M265.703 258.53C242.695 258.53 223.96 249.317 209.498 230.891C195.255 212.246 188.133 185.046 188.133 149.291C188.133 113.536 195.255 86.7747 209.498 69.0069C223.96 51.0198 242.695 42.0263 265.703 42.0263C288.711 42.0263 307.337 51.0198 321.58 69.0069C336.042 86.994 343.273 113.755 343.273 149.291C343.273 185.046 336.042 212.246 321.58 230.891C307.337 249.317 288.711 258.53 265.703 258.53ZM265.703 215.097C270.085 215.097 274.139 213.452 277.864 210.162C281.589 206.871 284.548 200.51 286.739 191.078C288.93 181.646 290.026 167.717 290.026 149.291C290.026 130.865 288.93 117.155 286.739 108.162C284.548 98.9489 281.589 92.9166 277.864 90.065C274.139 86.994 270.085 85.4585 265.703 85.4585C261.321 85.4585 257.267 86.994 253.542 90.065C249.817 92.9166 246.858 98.9489 244.667 108.162C242.476 117.155 241.38 130.865 241.38 149.291C241.38 167.717 242.476 181.646 244.667 191.078C246.858 200.51 249.817 206.871 253.542 210.162C257.267 213.452 261.321 215.097 265.703 215.097Z"
        stroke="var(--a-border-default)"
        strokeWidth="2.19124"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="6.57 8.76"
      />
      <path
        d="M429.98 129.301L465.429 127.441L464.191 103.783C463.824 96.7733 463.613 88.5473 463.557 79.105C463.721 69.6512 463.728 61.4137 463.58 54.3925L462.267 54.4614C459.962 60.7326 457.554 67.1192 455.042 73.621C452.518 79.9038 449.891 86.3018 447.16 92.8151L429.98 129.301ZM470.108 216.815L467.666 170.156L379.042 174.806L376.978 135.376L441.478 9.42432L511.72 5.7392L517.947 124.686L540.267 123.515L542.503 166.23L520.183 167.401L522.626 214.06L470.108 216.815Z"
        stroke="var(--a-border-default)"
        strokeWidth="2.19124"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="6.57 8.76"
      />
    </svg>
  );
}

export const args = {
  index: 5,
  title: "Uten dekoratøren",
  desc: "404-malen kan også enkelt brukes på sider uten nav-dekoratøren.",
  sandbox: false,
};
