"use client";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {};

export default function Button(props: ButtonProps) {
  const { ...attributes } = props;

  return (
    <button
    {...attributes}
    className={
      "w-fit bg-[#1c2226] px-4 py-0.5 rounded-lg border border-[#22272c] " +
      attributes.className
    }
    />
  );
}
