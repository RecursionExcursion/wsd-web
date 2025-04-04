"use client";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {};

export default function Button(props: ButtonProps) {
  const { ...attributes } = props;

  return (
    <button
      {...attributes}
      className={
        "w-fit bg-[var(--color-tertiary)] px-4 py-0.5 rounded-lg border border-[var(--color-trim)] " +
        attributes.className
      }
    />
  );
}
