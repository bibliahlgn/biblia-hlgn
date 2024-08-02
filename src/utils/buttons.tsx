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
      className={`${classname && classname} ghost-hover text-foreground ghost-button`}
      onClick={() => action()}
    >
      {children}
    </button>
  );
}
