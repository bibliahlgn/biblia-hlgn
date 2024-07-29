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
        className="data-activelist:block absolute bottom-0 top-0 z-10 hidden w-3/4 bg-slate-400"
      >
        <TestamentSwitch
          setActiveTestament={setActiveTestament}
        ></TestamentSwitch>
        <ul>
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
        className="data-activelist:block absolute inset-0 hidden bg-black opacity-50"
      ></div>
    </div>
  );
}
