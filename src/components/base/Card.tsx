import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  height?: string;
  width?: string;
};

export default function Card(props: CardProps) {
  return (
    <div
      className="border border-nebula-purple/30 bg-nebula-purple/10 rounded-xl py-6 px-8 overflow-y-auto"
      style={{
        height: props.height ?? "100%",
        width: props.width ?? "auto",
      }}
    >
      {props.children}
    </div>
  );
}
