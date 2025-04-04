"use client";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {};

export default function Input(props: InputProps) {
  const { ...attributes } = props;

  return (
    <input
      className="border border-[var(--color-trim)] bg-[var(--color-tertiary)] p-1 rounded-lg"
      {...attributes}
    />
  );
}
