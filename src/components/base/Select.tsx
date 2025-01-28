"use client";

import { ComponentPropsWithoutRef } from "react";

const selectStyles = {
  base: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
};

type SelectProps = {
  styleKey?: keyof typeof selectStyles;
} & ComponentPropsWithoutRef<"select">;

export default function Select(props: SelectProps) {
  const { styleKey, ...attributes } = props;

  const styleImpl = !!styleKey ? selectStyles[styleKey] : selectStyles.base;

  return <select className={styleImpl} {...attributes}></select>;
}
