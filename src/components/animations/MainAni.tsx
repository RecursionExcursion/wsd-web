"use client";

import { useEffect, useRef, useState } from "react";
import { iconServer } from "../../assets/icons";

export default function MainAnimation() {
  const serverIcon = iconServer({ iconKey: "serverIcon" });
  const messageHorz = iconServer({ iconKey: "messageHorz", size: 24 });
  const monitorIcon = iconServer({ iconKey: "monitorIcon" });
  const monitorPlay = iconServer({ iconKey: "monitorPlay" });

  const serverRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const monitorRef = useRef<HTMLDivElement>(null);
  const [monitorI, setMonitorI] = useState(monitorIcon);

  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>();

  useEffect(() => {
    if (window) {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    const msgEl = messageRef.current;
    const serverEl = serverRef.current;
    const monitorEl = monitorRef.current;

    if (!msgEl || !serverEl || !monitorEl) return;

    // Get positions of the server and monitor
    const serverRect = serverEl.getBoundingClientRect();
    const monitorRect = monitorEl.getBoundingClientRect();

    const startX = serverRect.left;
    const startY =
      (serverRect.bottom - serverRect.top) / 2 - msgEl.offsetHeight / 2;
    const endX = monitorRect.left;

    let currentX = 0;

    const setMsgStartParams = () => {
      currentX = 0;
      setMonitorI(monitorIcon);
      msgEl.style.position = "absolute";
      msgEl.style.left = `${startX}px`;
      msgEl.style.top = `${startY}px`;
      msgEl.style.transform = "translateX(0)";
      msgEl.hidden = false;
    };

    setMsgStartParams();

    const animate = () => {
      const speed = 6;
      const timeout = 1500;
      currentX += speed;

      msgEl.style.transform = `translateX(${currentX - startX}px)`;

      if (currentX + startX < endX) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        msgEl.hidden = true;
        setMonitorI(monitorPlay);
        timeoutRef.current = setTimeout(() => {
          //reset animation
          setMsgStartParams();
          animate();
        }, timeout);
      }
    };

    animate();

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  return (
    <div className="flex justify-between relative">
      <div ref={serverRef}>{serverIcon}</div>
      <div className="absolute" ref={messageRef}>
        {messageHorz}
      </div>
      <div ref={monitorRef}>{monitorI}</div>
    </div>
  );
}
