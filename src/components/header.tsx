import { activeListTYPES } from "../types";

function Header({
  bookListText,
  selectedChapter,
  setActiveList,
}: {
  bookListText: string;
  selectedChapter: string;
  setActiveList: React.Dispatch<React.SetStateAction<activeListTYPES>>;
}) {
  const openChapterList = () => {
    setActiveList((prevState) => ({
      bookList: prevState.bookList ? !prevState.bookList : prevState.bookList,
      chapterList: !prevState.chapterList,
    }));
  };

  return (
    <header className="flex justify-between px-4 py-3">
      <div className="flex gap-2">
        <button
          onClick={() =>
            setActiveList((prevState) => ({ bookList: !prevState.bookList }))
          }
        >
          {bookListText}
        </button>

        <button onClick={() => openChapterList()}>{selectedChapter}</button>
      </div>
      <div className="flex gap-x-2">
        <button>Search</button>
        <button>Darkmode</button>
        <button>About</button>
      </div>
    </header>
  );
}

export default Header;
