import Header from "./components/header";
import { BookList } from "./components/bookList";
import { ChapterList } from "./components/chapterList";

function App() {
  return (
    <>
      <Header />
      <div>
        <BookList />
        <div className="texts">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum amet
          ab cupiditate.
        </div>
        <ChapterList />
      </div>
    </>
  );
}

export default App;
