import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const Counter = ({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || value === 0) return;
    let frame = 0;
    const total = 48;
    const id = setInterval(() => {
      frame += 1;
      setDisplay(Math.round(value * (1 - Math.pow(1 - frame / total, 3))));
      if (frame >= total) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [inView, value]);

  return (
    <span ref={ref} className={`display leading-none ${className || "text-5xl md:text-7xl"}`}>
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
};

export default Counter;
