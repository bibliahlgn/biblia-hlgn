import React, { useEffect, useState } from "react";
import books from "../data/booklist.json";
import BookListItem from "./bookListItem";
import { activeListTYPES } from "../types";

export default function BookList({
  setChapterCount,
  selectedBook,
  setSelectedBook,
  setActiveTestament,
  setBookListText,
  activeList,
  setActiveList,
  setRawContent,
  setSelectedChapter,
}: {
  setChapterCount: React.Dispatch<React.SetStateAction<number>>;
  setSelectedBook: React.Dispatch<React.SetStateAction<string>>;
  selectedBook: string;
  setActiveTestament: React.Dispatch<React.SetStateAction<"old" | "new">>;
  setBookListText: React.Dispatch<React.SetStateAction<string>>;
  activeList: activeListTYPES;
  setActiveList: React.Dispatch<React.SetStateAction<activeListTYPES>>;
  setRawContent: React.Dispatch<React.SetStateAction<string>>;
  setSelectedChapter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isNewTestament, setNewTestament] = useState<boolean>(() => {
    const selectedTestament = sessionStorage.getItem("isNewTestament");
    return selectedTestament ? JSON.parse(selectedTestament) : false;
  });

  useEffect(() => {
    sessionStorage.setItem("isNewTestament", JSON.stringify(isNewTestament));

    if (isNewTestament) {
      setActiveTestament("new");
    } else setActiveTestament("old");
  }, [isNewTestament]);

  const toggleTestament = () => {
    setNewTestament((prevState) => !prevState);
  };

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
        <button onClick={() => toggleTestament()} className="border">
          <span
            data-isnew={isNewTestament ? "true" : "false"}
            className="bg-slate-400 data-isnew:bg-transparent"
          >
            Old
          </span>
          <span
            data-isnew={isNewTestament ? "true" : "false"}
            className="bg-transparent data-isnew:bg-slate-400"
          >
            New
          </span>
        </button>

        <ul>
          {(isNewTestament ? books.new : books.old).map((i) => (
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
        onClick={() => setActiveList({ bookList: false })}
        className="data-activelist:block absolute inset-0 hidden bg-black opacity-50"
      ></div>
    </div>
  );
}
