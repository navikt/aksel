import { useContext } from "react";
import { FieldsetContext } from ".";
import { CheckboxGroupContext } from "./checkbox/CheckboxGroup";
import { RadioGroupContext } from "./radio/RadioGroup";
import useId from "./useId";

// TODO: Fjerne spread props fra ferdig obj
export const useForm = (props: any, type?: string) => {
  let newProps = {} as any;

  const { size, error, errorId: propErrorId, ...rest } = props;
  const id = useId({ id: props.id, prefix: type ?? "" });
  const errorId = useId({ id: propErrorId, prefix: type + "Error" ?? "" });

  const {
    error: fieldsetError,
    errorId: fieldsetErrorId,
    size: fieldsetSize,
  } = useContext(FieldsetContext);
  const checkboxGroupState = useContext(CheckboxGroupContext);
  const radioGroup = useContext(RadioGroupContext);

  newProps = {
    ...rest,
    showErrorMsg: !props.disabled && props.error && !fieldsetError,
    showErrorStyle: !props.disabled && (props.error || fieldsetError),
    _errorId: errorId,
    _size: size ? size : fieldsetSize ?? "m",
    inputProps: {
      id,
      "aria-invalid": !props.disabled && !!(props.error || fieldsetError),
      "aria-describedby":
        !props.disabled && (props.error || fieldsetError)
          ? props.error
            ? props.errorId
              ? props.errorId
              : errorId
            : fieldsetErrorId
          : undefined,
    },
  };

  switch (type) {
    case "checkbox": {
      if (checkboxGroupState) {
        if (props.checked) {
          console.warn(
            "`checked` is unsupported on <Checkbox> elements within a <CheckboxGroup>. Please set a `value` or `defaultValue` on <CheckboxGroup> instead."
          );
        }
        if (props.value === null) {
          console.warn(
            "A <Checkbox> element within a <CheckboxGroup> requires a `value` property."
          );
        }
      }
      newProps = {
        ...newProps,
        showErrorMsg:
          (checkboxGroupState?.disabled || props.disabled) &&
          props.error &&
          !fieldsetError,
        inputProps: {
          ...newProps.inputProps,
          type: "checkbox",
          disabled: checkboxGroupState?.disabled || props.disabled,
          checked: checkboxGroupState?.value
            ? checkboxGroupState.value.includes(props.value as string)
            : props.checked,
          defaultChecked: checkboxGroupState
            ? checkboxGroupState.defaultValue.includes(props.value as string)
            : props.defaultChecked,
          onChange: (e) => {
            props.onChange && props.onChange(e);
            checkboxGroupState &&
              checkboxGroupState.toggleValue(props.value as string);
          },
        },
      };
      break;
    }
    case "radio": {
      if (!radioGroup) {
        console.warn("<Radio> must be used inside <RadioGroup>.");
      }
      newProps = {
        ...newProps,
        initialProps: {
          ...newProps.initialProps,
          type: "radio",
          name: radioGroup?.name,
          checked:
            (radioGroup?.value ?? radioGroup?.defaultValue) === props.value
              ? true
              : undefined,
          onChange: (e) => {
            console.log("ran");
            props.onChange && props.onChange(e);
            radioGroup?.onChange && radioGroup.onChange(props.value);
          },
          required: radioGroup?.required || props.required,
          disabled: radioGroup?.disabled || props.disabled,
        },
      };
      break;
    }
    default:
      break;
  }

  return newProps;
};
