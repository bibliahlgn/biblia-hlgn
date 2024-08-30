import React from "react";
import books from "../data/booklist.json";
import BookListItem from "./bookListItem";
import { activeListTYPES, bookToOpenTYPES } from "../types";
import { toggleBookList } from "../utils/toggleSwitch";
import TestamentSwitch from "../utils/testamentSwitch";
import { getBookName } from "../utils/smallFunctions";
import { GhostButton } from "../utils/buttons";

export default function BookList({
  setChapterCount,
  activeList,
  setActiveList,
  setRawContent,
  bookToOpen,
  setBookToOpen,
  activeTestament,
  setActiveTestament,
}: {
  setChapterCount: React.Dispatch<React.SetStateAction<number>>;
  activeList: activeListTYPES;
  setActiveList: React.Dispatch<React.SetStateAction<activeListTYPES>>;
  setRawContent: React.Dispatch<React.SetStateAction<string>>;
  bookToOpen: bookToOpenTYPES;
  setBookToOpen: React.Dispatch<React.SetStateAction<bookToOpenTYPES>>;
  activeTestament: "old" | "new";
  setActiveTestament: React.Dispatch<React.SetStateAction<"old" | "new">>;
}) {
  const toggleChapters = (i: string) => {
    const count = parseInt(i.match(/\d+$/)![0]);

    setChapterCount(count);
    setBookToOpen((prev) => ({
      ...prev,
      bookName: getBookName(i),
    }));
    setActiveList({ chapterList: true, bookList: false });

    if (bookToOpen.bookName !== getBookName(i)) {
      setRawContent("");
      setBookToOpen((prev) => ({
        ...prev,
        chapter: "",
      }));
    }
  };

  return (
    <>
      <nav
        data-activelist={activeList.bookList ? "true" : "false"}
        className="fixed inset-y-0 -left-full z-20 w-3/4 bg-background py-6 pl-12 transition-all duration-300 data-activelist:left-0 md:w-1/2 lg:sticky lg:top-[50px] lg:h-[calc(100dvh-50px)] lg:w-full lg:border-r-2 lg:border-border_clr"
      >
        <div className="flex justify-between">
          <TestamentSwitch
            activeTestament={activeTestament}
            setActiveTestament={setActiveTestament}
          ></TestamentSwitch>
          <GhostButton
            classname="mr-8 lg:hidden"
            action={() => toggleBookList({ setActiveList })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 9.525 9.525"
            >
              <path
                fill="currentColor"
                d="M4.763 5.311l2.239 2.239c.155.15.402.148.555-.005s.155-.399.005-.555L5.322 4.751l2.239-2.239c.15-.155.148-.402-.005-.555s-.399-.155-.555-.005L4.763 4.192 2.524 1.953c-.156-.146-.4-.142-.551.009s-.155.395-.009.551l2.238 2.239L1.964 6.99c-.103.099-.144.246-.108.385s.144.246.283.283.285-.005.385-.108z"
                fillRule="evenodd"
              />
            </svg>
          </GhostButton>
        </div>
        <ul className="scrollbar mt-4 grid max-h-[calc(100vh-8rem)] gap-y-3 overflow-y-auto pb-12">
          {(activeTestament === "new" ? books.new : books.old).map((i) => (
            <BookListItem
              key={i}
              bookName={getBookName(i)}
              toggleChapters={() => toggleChapters(i)}
            ></BookListItem>
          ))}
        </ul>
      </nav>
      <div
        data-activelist={activeList.bookList ? "true" : "false"}
        onClick={() => toggleBookList({ setActiveList })}
        className="void-screen fixed inset-0 z-10 hidden bg-black/80 backdrop-blur data-activelist:block supports-[backdrop-filter]:bg-black/55 lg:!hidden"
      ></div>
    </>
  );
}
