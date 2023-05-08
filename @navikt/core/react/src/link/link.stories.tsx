import { PlusCircleFillIcon } from "@navikt/aksel-icons";
import React from "react";
import {
  BodyLong,
  Alert as DsAlert,
  ConfirmationPanel as DsConfirmationPanel,
  Link,
} from "..";
export default {
  title: "ds-react/Link",
  component: Link,
};

export const Default = {
  render: (props) => {
    const LinkD = () => (
      <Link href="#">
        {props.icon && <PlusCircleFillIcon />}Ex aliqua incididunt{" "}
        {props.icon && <PlusCircleFillIcon />}
      </Link>
    );

    if (props.inline) {
      return (
        <BodyLong>
          Incididunt laborum nisi nisi Lorem <LinkD /> in. Laborum aute fugiat
          officia adipisicing non veniam dolor nulla non ex consectetur fugiat
          eiusmod aute. Culpa sit aute est duis minim in in voluptate velit
          fugiat. Laboris est id deserunt ut ea Lorem eu. Esse elit laboris aute
          commodo sint laborum fugiat aliqua.
        </BodyLong>
      );
    }
    return <LinkD />;
  },

  args: {
    icon: false,
    inline: false,
  },
};

const DemoLink = () => (
  <Link href="#">
    <PlusCircleFillIcon aria-hidden /> Ex aliqua incididunt{" "}
    <PlusCircleFillIcon aria-hidden />
  </Link>
);

export const Icon = () => <DemoLink />;

export const Alert = () => {
  return (
    <div className="colgap">
      <DsAlert variant="info">
        <DemoLink />
      </DsAlert>
      <DsAlert variant="success">
        <DemoLink />
      </DsAlert>
      <DsAlert variant="warning">
        <DemoLink />
      </DsAlert>
      <DsAlert variant="error">
        <DemoLink />
      </DsAlert>
    </div>
  );
};

export const ConfirmationPanel = () => {
  return (
    <div className="colgap">
      <DsConfirmationPanel label="demo">
        <DemoLink />
      </DsConfirmationPanel>
      <DsConfirmationPanel checked label="demo">
        <DemoLink />
      </DsConfirmationPanel>
      <DsConfirmationPanel error="demo" label="demo">
        <DemoLink />
      </DsConfirmationPanel>
    </div>
  );
};
