import { Controller,DeepMap,FieldError,FieldErrors,FieldValues } from "react-hook-form";
import { Input as ChakraInput } from "@chakra-ui/react";


import { ValidationRule, UseFormReturn } from "react-hook-form";

interface InputProps
  extends Partial<Pick<UseFormReturn, "register">> {
  rules?: ValidationRule;
  name: string;
  label: string;
  errors: DeepMap<FieldValues, FieldError>;
  type: "text" | "email" | "number";
}

export const Input = ({
  name,
  type,
  label,
  rules,
  register,
  errors,
  ...rest
}:InputProps) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        aria-invalid={errors[name] ? "true" : "false"}
        type={type}
        name={name}
        id={name}
        {...rest}
      />
      <br />
      {errors[name] && (
        <p className="help is-danger" role="alert">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};
