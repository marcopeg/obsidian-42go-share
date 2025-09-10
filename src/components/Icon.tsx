import { useEffect, useRef } from "react";
import { setIcon } from "obsidian";

type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | string | number;

export const Icon = ({
  name,
  size = "sm",
}: {
  name: string;
  size?: IconSize;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setIcon(ref.current, name);
    }
  }, [name]);

  // map common size tokens to Tailwind width/height classes
  const sizeClass =
    typeof size === "string"
      ? ((): string | undefined => {
          switch (size) {
            case "xs":
              return "w-3 h-3";
            case "sm":
              return "w-4 h-4";
            case "md":
              return "w-5 h-5";
            case "lg":
              return "w-6 h-6";
            case "xl":
              return "w-8 h-8";
            case "2xl":
              return "w-10 h-10";
            default:
              // allow passing a custom Tailwind size class like "w-6 h-6"
              return size || undefined;
          }
        })()
      : undefined;

  const style =
    typeof size === "number"
      ? { width: `${size}px`, height: `${size}px` }
      : undefined;

  return (
    <span
      ref={ref}
      className={`inline-flex items-center justify-center ${
        sizeClass ?? ""
      }`.trim()}
      style={style}
      aria-hidden
    />
  );
};
