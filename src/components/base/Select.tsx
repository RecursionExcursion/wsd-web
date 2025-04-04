"use client";

type SelectProps = React.ComponentPropsWithoutRef<"select"> & {};

export default function Select(props: SelectProps) {
  const { ...atr } = props;
  return <select {...atr} />;
}
