import React from "react";
import { bookToOpenTYPES } from "../types";

export default function TestamentSwitch({
  bookToOpen,
  setBookToOpen,
}: {
  bookToOpen: bookToOpenTYPES;
  setBookToOpen: React.Dispatch<React.SetStateAction<bookToOpenTYPES>>;
}) {
  const toggleTestament = () => {
    const getTestament = (testament: string) => {
      if (testament == "old") {
        return "new";
      } else if (testament == "new") {
        return "old";
      } else return "old";
    };
    setBookToOpen((prev) => ({
      testament: getTestament(prev.testament!),
      bookName: prev.bookName,
      chapter: prev.chapter,
    }));
  };

  const isnew = bookToOpen.testament == "new";

  return (
    <button
      onClick={() => toggleTestament()}
      className="border-border_clr/40 hover:bg-accent group relative grid grid-cols-2 items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-md border px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <span
        data-isnew={isnew ? "true" : "false"}
        className="data-isnew:text-foreground text-background z-10 transition-all duration-500"
      >
        Da-an
      </span>
      <span
        data-isnew={isnew ? "true" : "false"}
        className="data-isnew:text-background text-foreground z-10 transition-all duration-500"
      >
        Bag-o
      </span>
      <div
        data-isnew={isnew ? "true" : "false"}
        className="bg-foreground group-hover:bg-foreground/80 absolute inset-y-0 left-0 h-full w-1/2 transition-all duration-300 data-isnew:left-1/2 data-isnew:right-0"
      ></div>
    </button>
  );
}
