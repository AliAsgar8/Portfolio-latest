import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
};

/**
 * Shared page shell — equal left/right gutters for header + every section.
 * Same pattern as imzishan.com: mx-auto max-w-6xl px-6 sm:px-8
 */
export function Container({
  children,
  className = "",
  id,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
