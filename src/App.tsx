import { useState } from "react";
import Header from "./components/header";
import BookList from "./components/bookList";
import ChapterList from "./components/chapterList";

function App() {
  const [chapterCount, setChapterCount] = useState(0);

  return (
    <>
      <Header />
      <div>
        <BookList
          chapterCount={chapterCount}
          setChapterCount={setChapterCount}
        />
        <div className="texts">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum amet
          ab cupiditate.
        </div>
        <ChapterList chapterCount={chapterCount} />
      </div>
    </>
  );
}

export default App;
