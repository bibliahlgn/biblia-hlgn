import { useEffect, useState } from "react";
import books from "../data/booklist.json";
import BookListItem from "./bookListItem";

export default function BookList({
  setChapterCount,
  setSelectedBook,
  setActiveTestament,
}: {
  setChapterCount: React.Dispatch<React.SetStateAction<number>>;
  setSelectedBook: React.Dispatch<React.SetStateAction<string>>;
  setActiveTestament: React.Dispatch<React.SetStateAction<"old" | "new">>;
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
  };

  return (
    <div>
      <div>
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
      </div>
      {!isNewTestament ? (
        <ul>
          {books.old.map((i) => (
            <BookListItem
              key={i}
              bookname={i}
              getBookName={getBookName}
              toggleChapters={toggleChapters}
            ></BookListItem>
          ))}
        </ul>
      ) : (
        <ul>
          {books.new.map((i) => (
            <BookListItem
              key={i}
              bookname={i}
              getBookName={getBookName}
              toggleChapters={toggleChapters}
            ></BookListItem>
          ))}
        </ul>
      )}
    </div>
  );
}
