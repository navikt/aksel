import { InputWithCounter } from "./schema/custom-components";

export const form = {
  form: {
    components: {
      field: (props) => {
        const name = props.schemaType?.name;

        if (name === "string" && props.schemaType?.options?.maxLength) {
          return <InputWithCounter {...props.inputProps} />;
        }

        if (name === "text" && props.schemaType?.options?.maxLength) {
          return <InputWithCounter {...props.inputProps} size="large" />;
        }
        return props.renderDefault(props);
      },
    },
  },
};
