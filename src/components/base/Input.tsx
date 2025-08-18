"use client";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {};

export default function Input(props: InputProps) {
  const { ...attributes } = props;

  return (
    <input
      {...attributes}
      className={
        "border border-nebula-purple/30 bg-cosmic-black/50 text-milky-white p-2 rounded-lg focus:border-starlight-yellow focus:outline-none transition-colors " +
        attributes.className
      }
    />
  );
}
