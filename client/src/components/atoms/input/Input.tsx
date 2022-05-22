import { useCallback, useState, MouseEvent, useEffect } from "react";
import {
  Field,
  FieldProps,
  FieldRenderProps,
  useField,
} from "react-final-form";
import tw from "twin.macro";
import { useActiveElement } from "../../../hooks";
import { hasContentOverflow } from "../../../utils";
import Tooltip from "../tooltip";

const Input = tw.input`px-3 py-2 bg-indigo-900 rounded text-white outline-none placeholder-indigo-500 truncate`;

export const InputField = (
  props: FieldProps<string, FieldRenderProps<string>>
) => {
  const field = useField(props.name);

  const activeElement = useActiveElement();

  const shouldRenderTooltip = useCallback(
    (element: HTMLInputElement | null) =>
      !!element && hasContentOverflow(element) && activeElement !== element,
    [activeElement]
  );

  return (
    <Tooltip
      shouldRender={shouldRenderTooltip}
      content={field.input.value}
      placement="top"
    >
      <Field
        {...props}
        tw="px-3 py-2 bg-indigo-900 rounded text-white outline-none placeholder-indigo-500 truncate"
        component="input"
      />
    </Tooltip>
  );
};

export default Input;
