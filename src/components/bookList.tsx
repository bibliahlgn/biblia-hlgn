import books from "../data/booklist.json";
import { useEffect, useState } from "react";

type testamentTYPE = "old" | "new";

export default function BookList({
  chapterCount,
  setChapterCount,
}: {
  chapterCount: number;
  setChapterCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [testament, setTestament] = useState<testamentTYPE>(() => {
    const selectedTestament = sessionStorage.getItem("OpenTESTAMENT");
    return selectedTestament === "old" || selectedTestament === "new"
      ? selectedTestament
      : "old";
  });

  useEffect(() => {
    sessionStorage.setItem("OpenTESTAMENT", testament);
  }, [testament]);

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
        <button onClick={() => setTestament("old")}>Old</button>
        <button onClick={() => setTestament("new")}>New</button>
      </div>
      <ul
        data-isnew={testament === "new" ? "true" : "false"}
        className="data-isnew:hidden"
      >
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
      <ul
        data-isnew={testament === "new" ? "true" : "false"}
        className="hidden data-isnew:block"
      >
        {books.new.map((i) => (
          <li key={i.toLowerCase()}>{bookName(i)}</li>
        ))}
      </ul>
    </>
  );
}
