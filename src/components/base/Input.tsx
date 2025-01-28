"use client";

import { ComponentPropsWithoutRef } from "react";

const inputStyles = {
  base: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
};

type InputProps = {
  styleKey?: keyof typeof inputStyles;
} & ComponentPropsWithoutRef<"input">;

export default function Input(props: InputProps) {
  const { styleKey, ...attrubutes } = props;

  const styleImpl = !!styleKey ? inputStyles[styleKey] : inputStyles.base;

  return <input className={styleImpl} {...attrubutes} />;
}
