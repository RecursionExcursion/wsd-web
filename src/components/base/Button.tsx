"use client";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {};

export default function Button(props: ButtonProps) {
  const { ...attributes } = props;

  return (
    <button
      {...attributes}
      className={
        "w-fit bg-[var(--color-tertiary)] px-6 py-1.5 rounded-md border-2 border-[var(--color-trim)] " +
        attributes.className
      }
    />
  );
}
