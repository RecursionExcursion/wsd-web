"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
type usePortalProps = {
  targetId: string;
  node: ReactNode;
};

export function usePortal(props: usePortalProps) {
  const { node, targetId: portalTargetId } = props;
  const [portalTarget, setPortalTarget] = useState<HTMLElement>();

  useEffect(() => {
    const target = document.getElementById(portalTargetId);
    if (target) {
      setPortalTarget(target);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderPortal() {
    if (portalTarget && node) {
      return createPortal(node, portalTarget);
    }
  }

  return {
    renderPortal,
  };
}
