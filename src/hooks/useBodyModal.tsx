"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

type UseBodyModalProps = {
  condition: boolean;
  content: ReactNode;
};

export function useModal(props: UseBodyModalProps) {
  function modal() {
    return (
      props.condition &&
      createPortal(
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "1000",
          }}
        >
          {props.content}
        </div>,
        document.body
      )
    );
  }

  return { modal };
}
