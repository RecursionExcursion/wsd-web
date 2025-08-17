"use client";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | undefined;
};

export default function Button(props: ButtonProps) {
  const { variant, ...attributes } = props;
  let styles;

  switch (variant) {
    case "primary":
      styles = "bg-yellow hover:bg-pr-hover text-cosmos";
      break;
    case "secondary":
      styles = "bg-pink ";
      break;

    case undefined:
      styles = "bg-purple hover:bg-y-hover ";
      break;
  }

  return (
    <button
      {...attributes}
      className={
        "w-fit px-6 py-1.5 rounded-md border-2 border-[var(--color-trim)] cursor-pointer " +
        styles +
        attributes.className
      }
    />
  );
}
