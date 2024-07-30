import classNames from "clsx";
import React, { forwardRef } from "react";

import If from "../core/ui/If";
import Label from "./Label";

type Props = React.InputHTMLAttributes<unknown> & {
  icon?: JSX.Element;
  hideAsterisk?: boolean;
};

const Hint: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <span
      className={`block pl-1 text-xs
        font-normal leading-tight text-gray-500 dark:text-gray-400`}
    >
      {children}
    </span>
  );
};

const Input = forwardRef<React.ElementRef<"input">, Props>(
  function TextFieldInputComponent(
    { className, icon: icon, children, hideAsterisk, ...props },
    ref
  ) {
    return (
      <>
        <div className="relative">
          <input
            {...props}
            className={classNames(
              "flex h-10 w-full rounded-full border border-input bg-[#F9F9F9] pl-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
              className,
              {
                "pr-3": !icon,
                "pr-10": icon,
              }
            )}
            style={props.type === "date" ? { colorScheme: "auto" } : {}}
            ref={ref}
          />
          <If condition={icon}>
            <div className="absolute top-1/2 -translate-y-1/2 right-3">
              {icon}
            </div>
          </If>
        </div>
      </>
    );
  }
);

type TextFieldComponent = React.FC<
  React.PropsWithChildren<{
    className?: string;
  }>
> & {
  Label: typeof Label;
  Hint: typeof Hint;
  Input: typeof Input;
  Error: typeof ErrorMessage;
};

const TextField: TextFieldComponent = ({ children, className }) => {
  return (
    <div className={classNames(`flex flex-col space-y-1`, className)}>
      {children}
    </div>
  );
};

const ErrorMessage: React.FC<
  { error?: string | string[] } & React.HTMLAttributes<unknown>
> = ({ error, ...props }) => {
  const shouldDisplay = !!error;

  if (!shouldDisplay) {
    return null;
  }

  return (
    <Hint>
      {Array.isArray(error) ? (
        <div className="flex flex-col">
          {error.map((e, i) => (
            <span key={i} className={"py-0.5 text-red-700 dark:text-red-500"}>
              {e}
            </span>
          ))}
        </div>
      ) : (
        <span {...props} className={"py-0.5 text-red-700 dark:text-red-500"}>
          {error}
        </span>
      )}
    </Hint>
  );
};

TextField.Hint = Hint;
TextField.Label = Label;
TextField.Input = Input;
TextField.Error = ErrorMessage;

export default TextField;

export {
  TextField,
  ErrorMessage as TextFieldError,
  Hint as TextFieldHint,
  Input as TextFieldInput,
  Label as TextFieldLabel,
};
