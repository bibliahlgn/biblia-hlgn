import { useState } from "react";
import Header from "./components/header";
import BookList from "./components/bookList";
import ChapterList from "./components/chapterList";
import Contents from "./components/contents";
import { activeListTYPES } from "./types";

function App() {
  //chapterCount is the total number of chapters in a book (selected book)
  const [chapterCount, setChapterCount] = useState<number>(0);
  //bookToOpen will be the filename of what book + chapter to open
  const [bookToOpen, setBookToOpen] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [activeTestament, setActiveTestament] = useState<"old" | "new">("old");
  const [bookListText, setBookListText] = useState<string>("Book List");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [activeList, setActiveList] = useState<activeListTYPES>({
    bookList: true,
    chapterList: false,
  });
  const [rawContent, setRawContent] = useState<string>("");

  return (
    <>
      <Header
        bookListText={bookListText}
        selectedChapter={selectedChapter}
        setActiveList={setActiveList}
      />
      <main>
        <BookList
          setChapterCount={setChapterCount}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          setActiveTestament={setActiveTestament}
          setBookListText={setBookListText}
          activeList={activeList}
          setActiveList={setActiveList}
          setRawContent={setRawContent}
          setSelectedChapter={setSelectedChapter}
        />
        <Contents
          bookToOpen={bookToOpen}
          selectedBook={selectedBook}
          activeTestament={activeTestament}
          rawContent={rawContent}
          setRawContent={setRawContent}
        ></Contents>
        <ChapterList
          chapterCount={chapterCount}
          setBookToOpen={setBookToOpen}
          selectedBook={selectedBook}
          setSelectedChapter={setSelectedChapter}
          activeList={activeList}
          setActiveList={setActiveList}
        />
      </main>
    </>
  );
}

export default App;
