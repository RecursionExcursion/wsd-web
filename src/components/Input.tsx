"use client";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {};

export default function Input(props: InputProps) {
  const { ...attributes } = props;

  return (
    <input
      className="border border-[#22272c] bg-[#1c2226] p-1 rounded-lg"
      {...attributes}
    />
  );
}
