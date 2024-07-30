import React from "react";
import books from "../data/booklist.json";
import BookListItem from "./bookListItem";
import { activeListTYPES } from "../types";
import { toggleBookList } from "../utils/toggleList";
import TestamentSwitch from "../utils/testamentSwitch";

export default function BookList({
  setChapterCount,
  selectedBook,
  setSelectedBook,
  activeTestament,
  setActiveTestament,
  setBookListText,
  activeList,
  setActiveList,
  setRawContent,
  setSelectedChapter,
}: {
  setChapterCount: React.Dispatch<React.SetStateAction<number>>;
  selectedBook: string;
  setSelectedBook: React.Dispatch<React.SetStateAction<string>>;
  activeTestament: "old" | "new";
  setActiveTestament: React.Dispatch<React.SetStateAction<"old" | "new">>;
  setBookListText: React.Dispatch<React.SetStateAction<string>>;
  activeList: activeListTYPES;
  setActiveList: React.Dispatch<React.SetStateAction<activeListTYPES>>;
  setRawContent: React.Dispatch<React.SetStateAction<string>>;
  setSelectedChapter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const getBookName = (i: string) => i.replace(/\d+$/, "");

  const toggleChapters = (i: string) => {
    const count = parseInt(i.match(/\d+/)![0]);

    setChapterCount(count);
    setSelectedBook(getBookName(i));
    setBookListText(getBookName(i));
    setActiveList({ chapterList: true, bookList: false });

    if (selectedBook !== getBookName(i)) {
      setRawContent("");
      setSelectedChapter("");
    }
  };

  return (
    <div>
      <nav
        data-activelist={activeList.bookList ? "true" : "false"}
        className="fixed inset-y-0 -left-full z-10 w-3/4 bg-slate-400 py-6 pl-12 transition-all duration-300 data-activelist:left-0"
      >
        <div className="flex justify-between">
          <TestamentSwitch
            setActiveTestament={setActiveTestament}
          ></TestamentSwitch>
          <button
            className="mr-8"
            onClick={() => toggleBookList({ setActiveList })}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <ul className="mt-4 grid max-h-[calc(100vh-8rem)] gap-y-3 pb-12">
          {(activeTestament === "new" ? books.new : books.old).map((i) => (
            <BookListItem
              key={i}
              bookname={i}
              getBookName={getBookName}
              toggleChapters={toggleChapters}
            ></BookListItem>
          ))}
        </ul>
      </nav>
      <div
        data-activelist={activeList.bookList ? "true" : "false"}
        onClick={() => toggleBookList({ setActiveList })}
        className="fixed inset-0 hidden bg-black opacity-50 data-activelist:block"
      ></div>
    </div>
  );
}
