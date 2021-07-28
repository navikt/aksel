import { useContext, useEffect, useState } from "react";
import { FieldsetContext } from "../index";
import { v4 as uuidv4 } from "uuid";

type FormHandlerProps = {
  describeBy: string;
  errorMsg: string;
  errorId: string;
  id: string;
  renderErrorMsg: boolean;
  size: string;
  intId: string;
  intErrorId: string;
};

export function useFormHandler(props) {
  const {
    error,
    errorId: oldErrorId,
    id: oldId,
    disabled,
    size: oldSize,
    ...rest
  } = props;
  const [state, setState] = useState<Partial<FormHandlerProps>>({});

  const context = useContext(FieldsetContext);

  useEffect(() => {
    setState((old) => ({ ...old, intId: uuidv4(), intErrorId: uuidv4() }));
  }, []);

  useEffect(() => {
    setState((old) => ({ ...old, errorMsg: context.error ?? error }));
  }, [error, context.error]);

  useEffect(() => {
    setState((old) => ({ ...old, errorId: oldErrorId ?? old.intErrorId }));
  }, [oldErrorId, state.intErrorId]);

  useEffect(() => {
    setState((old) => ({ ...old, id: oldId ?? old.intId }));
  }, [oldId, state.intId]);

  useEffect(() => {
    setState((old) => ({
      ...old,
      renderErrorMsg: !context.error && !!old.errorMsg && !disabled,
    }));
  }, [context.error, disabled, state.errorMsg]);

  useEffect(() => {
    setState((old) => ({
      ...old,
      size: oldSize ? oldSize : context.size ?? "m",
    }));
  }, [context.size, oldSize]);

  useEffect(() => {
    setState((old) => ({
      ...old,
      describeBy:
        !!old.errorMsg && !disabled
          ? context.errorId ?? old.errorId
          : undefined,
    }));
  }, [context.errorId, disabled, state.errorId, state.errorMsg]);

  return {
    isInvalid: !!state.errorMsg && !disabled,
    describeBy: state.describeBy,
    errorMsg: state.errorMsg,
    errorId: state.errorId,
    id: state.id,
    renderErrorMsg: state.renderErrorMsg,
    size: state.size,
    restProps: { ...rest, disabled },
  };
}
