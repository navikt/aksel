import { Page as AkselPage } from "@navikt/ds-react/Page";
import Footer from "@/app/_ui/footer/Footer";
import GenericErrorPage from "@/app/_ui/generic-error-page";
import { Header } from "@/app/_ui/header/Header";

export default function Page() {
  return (
    <AkselPage footer={<Footer />} footerPosition="belowFold">
      <Header />
      <GenericErrorPage />
    </AkselPage>
  );
}
