import books from "../data/booklist.json";
import { useEffect, useState } from "react";

export default function BookList({
  chapterCount,
  setChapterCount,
}: {
  chapterCount: number;
  setChapterCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isNewTestament, setNewTestament] = useState<boolean>(() => {
    const selectedTestament = sessionStorage.getItem("OpenTESTAMENT");
    return selectedTestament ? JSON.parse(selectedTestament) : false;
  });

  const toggleTestament = () => {
    setNewTestament((prevState) => !prevState);
    if (chapterCount !== 0) {
      setChapterCount(0);
    }
  };

  useEffect(() => {
    sessionStorage.setItem("OpenTESTAMENT", JSON.stringify(isNewTestament));
  }, [isNewTestament]);

  const [openBook, setOpenBook] = useState("");

  const bookName = (i: string) => i.replace(/\d+$/, "");
  const toggleChapters = (i: string) => {
    const count = parseInt(i.match(/\d+/)![0]);

    if (count === chapterCount && bookName(i) === openBook) {
      setChapterCount(0);
    } else {
      setChapterCount(count);
      setOpenBook(bookName(i));
    }
  };

  return (
    <>
      <div>
        <button onClick={() => toggleTestament()}>
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
            <li
              key={i.toLowerCase()}
              onClick={() => toggleChapters(i)}
              className="cursor-pointer"
            >
              {bookName(i)}
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {books.new.map((i) => (
            <li key={i.toLowerCase()}>{bookName(i)}</li>
          ))}
        </ul>
      )}
    </>
  );
}
