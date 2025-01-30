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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {props.content}
        </div>,
        document.body
      )
    );
  }

  return { modal };
}
