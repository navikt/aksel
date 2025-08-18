import { ChildHairEyesIcon, FileIcon } from "@navikt/aksel-icons";
import { Heading, Link, Process } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <>
      <Heading size="medium" level="2" id="Process-heading" visuallyHidden>
        Søknadssteg med tilhørende tittel
      </Heading>
      <Process aria-labelledby="Process-heading" activeStep={4}>
        <Process.Step
          title="Barnet ble født"
          timestamp="04. august 2025"
          bullet={<Process.Checkmark />}
        />
        <Process.Step
          title="Du søkte om FORELDREPENGER"
          timestamp="22. august 2025"
          bullet={<Process.Checkmark />}
        >
          <Link href="/eksempel">
            <FileIcon aria-hidden fontSize={24} />
            Søknad om foreldrepenger ved fødsel
          </Link>
        </Process.Step>
        <Process.Step
          title="Søknaden din ble innvilget"
          timestamp="25. august 2025"
          bullet={<Process.Checkmark />}
        >
          <Link href="/eksempel">
            <FileIcon aria-hidden fontSize={24} />
            Innvilgelsesbrev Foreldrepenger
          </Link>
        </Process.Step>
        <Process.Step
          title="Du har fått et svar på søknaden din"
          timestamp="8. september 2025"
        >
          <Link href="/eksempel">
            <FileIcon aria-hidden fontSize={24} />
            Opphør Foreldrepenger
          </Link>
        </Process.Step>
        <Process.Step
          title="Nav har etterspurt opplysninger"
          timestamp="8. september 2025"
        />
        <Process.Step
          title="Barnet fyller 3 år"
          timestamp="22. august 2028"
          bullet={<ChildHairEyesIcon />}
        >
          Du må ta ut foreldrepengene før barnet fyller 3 år. Venter dere nytt
          barn, må dere ta ut foreldrepengene før ny foreldrepengeperiode
          starter.
        </Process.Step>
      </Process>
    </>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "static",
});

/* Storybook story */
export const VariantNumber = {
  render: Example,
};

export const args = {
  index: 0,
};
