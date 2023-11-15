import { withDsExample } from "@/web/examples/withDsExample";
import { Link } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="colgap">
      {["action", "neutral", "subtle"].map((variant) => (
        <>
          <div>
            <Link variant={variant as "action" | "neutral" | "subtle"}>
              Ex aliqua incididunt
            </Link>
          </div>
        </>
      ))}
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
