import { ReactNode } from "react";

export function GhostButton({
  children,
  action,
  classname,
}: {
  children: ReactNode;
  action: () => void;
  classname?: string;
}) {
  return (
    <button
      className={`${classname && classname} ghost-hover ghost-button text-foreground`}
      onClick={() => action()}
    >
      {children}
    </button>
  );
}
