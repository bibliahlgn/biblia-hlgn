import React from "react";

export default function TestamentSwitch({
  activeTestament,
  setActiveTestament,
}: {
  activeTestament: "old" | "new";
  setActiveTestament: React.Dispatch<React.SetStateAction<"old" | "new">>;
}) {
  const toggleTestament = () => {
    const getTestament = (testament: string) => {
      if (testament == "old") {
        return "new";
      } else if (testament == "new") {
        return "old";
      } else return "old";
    };
    setActiveTestament((prev) => getTestament(prev));
  };

  const isnew = activeTestament == "new";

  return (
    <button
      onClick={() => toggleTestament()}
      className="group relative grid grid-cols-2 items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-md border border-border_clr/40 px-3 py-1 text-sm font-medium transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
    >
      <span
        data-isnew={isnew ? "true" : "false"}
        className="z-10 text-background transition-all duration-500 data-isnew:text-foreground"
      >
        Da-an
      </span>
      <span
        data-isnew={isnew ? "true" : "false"}
        className="z-10 text-foreground transition-all duration-500 data-isnew:text-background"
      >
        Bag-o
      </span>
      <div
        data-isnew={isnew ? "true" : "false"}
        className="absolute inset-y-0 left-0 h-full w-1/2 bg-foreground transition-all duration-300 group-hover:bg-foreground/80 group-focus-visible:bg-foreground/80 data-isnew:left-1/2 data-isnew:right-0"
      ></div>
    </button>
  );
}
