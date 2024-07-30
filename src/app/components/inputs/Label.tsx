import { createElement } from "react";
import classNames from "clsx";

type Props = React.LabelHTMLAttributes<unknown> & {
  as?: string;
} & Readonly<{
    children: React.ReactNode;
  }>;

const Label: React.FC<Props> = ({ children, className, as, ...props }) => {
  const tag = as ?? `div`;

  return createElement(
    tag,
    {
      className: classNames(
        `w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]`,
        className
      ),
      ...props,
    },
    children
  );
};

export default Label;
