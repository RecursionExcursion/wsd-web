"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";

const styles = {
  none: "",
  base: "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
  redToOrange:
    "text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
  danger:
    "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
};

type ButtonProps = {
  children: ReactNode;
  styleKey?: keyof typeof styles;
} & ComponentPropsWithoutRef<"button">;

export default function Button(props: ButtonProps) {
  const { children, styleKey, ...attributes } = props;

  const styleToImpl = !styleKey ? styles.redToOrange : styles[styleKey];

  return (
    <button className={styleToImpl} {...attributes}>
      {children}
    </button>
  );
}
