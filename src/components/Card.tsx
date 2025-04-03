import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export default function Card(props: CardProps) {
  return (
    <div
      className="border border-[#22272c]
                bg-[#191d22] rounded-xl py-6 px-8"
    >
      {props.children}
    </div>
  );
}
