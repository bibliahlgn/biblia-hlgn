import { useState } from "react";
import Header from "./components/header";
import BookList from "./components/bookList";
import ChapterList from "./components/chapterList";
import Contents from "./components/contents";

function App() {
  //chapterCount is the total number of chapters in a book (selected book)
  const [chapterCount, setChapterCount] = useState<number>(0);
  //bookToOpen will be the filename of what book + chapter to open
  const [bookToOpen, setBookToOpen] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [activeTestament, setActiveTestament] = useState<"old" | "new">("old");

  return (
    <>
      <Header />
      <main>
        <BookList
          setChapterCount={setChapterCount}
          setSelectedBook={setSelectedBook}
          setActiveTestament={setActiveTestament}
        />
        <Contents
          bookToOpen={bookToOpen}
          selectedBook={selectedBook}
          activeTestament={activeTestament}
        ></Contents>
        <ChapterList
          chapterCount={chapterCount}
          setBookToOpen={setBookToOpen}
          selectedBook={selectedBook}
        />
      </main>
    </>
  );
}

export default App;
