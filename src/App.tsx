import { useEffect, useState } from "react";
import Header from "./components/header";
import BookList from "./components/bookList";
import ChapterList from "./components/chapterList";
import Contents from "./components/contents";
import { activeListTYPES, bookToOpenTYPES } from "./types";

function App() {
  const [rawContent, setRawContent] = useState<string>("");
  //chapterCount is the total number of chapters in a book (selected book)
  const [chapterCount, setChapterCount] = useState<number>(() => {
    const session = sessionStorage.getItem("CHAPTERCOUNT");
    return session ? JSON.parse(session) : 0;
  });
  const [bookToOpen, setBookToOpen] = useState<bookToOpenTYPES>(() => {
    const session = sessionStorage.getItem("BOOKTOOPEN");
    return session
      ? JSON.parse(session)
      : {
          testament: "old",
          bookName: "",
          chapter: "",
        };
  });
  const [activeList, setActiveList] = useState<activeListTYPES>({
    bookList:
      bookToOpen.chapter != "" ||
      (bookToOpen.bookName != "" && bookToOpen.chapter == "")
        ? false
        : true,
    chapterList:
      bookToOpen.bookName != "" && bookToOpen.chapter == "" ? true : false,
  });

  useEffect(() => {
    sessionStorage.setItem("BOOKTOOPEN", JSON.stringify(bookToOpen));
    sessionStorage.setItem("CHAPTERCOUNT", JSON.stringify(chapterCount));
  }, [bookToOpen, chapterCount]);

  return (
    <div>
      <Header setActiveList={setActiveList} bookToOpen={bookToOpen} />
      <main className="relative min-h-dvh flex-1">
        <BookList
          setChapterCount={setChapterCount}
          activeList={activeList}
          setActiveList={setActiveList}
          setRawContent={setRawContent}
          bookToOpen={bookToOpen}
          setBookToOpen={setBookToOpen}
        />
        <Contents
          rawContent={rawContent}
          setRawContent={setRawContent}
          pathFragments={bookToOpen}
        ></Contents>
        <ChapterList
          chapterCount={chapterCount}
          activeList={activeList}
          setActiveList={setActiveList}
          setBookToOpen={setBookToOpen}
        />
      </main>
    </div>
  );
}

export default App;
