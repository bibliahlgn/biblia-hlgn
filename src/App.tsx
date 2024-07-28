import { useState } from "react";
import Header from "./components/header";
import BookList from "./components/bookList";
import ChapterList from "./components/chapterList";
import Contents from "./components/contents";

function App() {
  const [chapterCount, setChapterCount] = useState<number>(0);
  const [bookToOpen, setBookToOpen] = useState<string>("");
  const [openBook, setOpenBook] = useState<string>("");
  const [activeTestament, setActiveTestament] = useState<"old" | "new">("old");

  // if (bookToOpen != "") {
  //   console.log(bookToOpen);
  // }

  return (
    <>
      <Header />
      <main>
        <BookList
          chapterCount={chapterCount}
          setChapterCount={setChapterCount}
          openBook={openBook}
          setOpenBook={setOpenBook}
          setActiveTestament={setActiveTestament}
        />
        <Contents
          bookToOpen={bookToOpen}
          activeTestament={activeTestament}
        ></Contents>
        <ChapterList
          chapterCount={chapterCount}
          openBook={openBook}
          setBookToOpen={setBookToOpen}
        />
      </main>
    </>
  );
}

export default App;
