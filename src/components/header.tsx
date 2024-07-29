import { activeListTYPES } from "../types";
import { toggleBookList, toggleChapterList } from "../utils/toggleList";

function Header({
  bookListText,
  selectedChapter,
  setActiveList,
}: {
  bookListText: string;
  selectedChapter: string;
  setActiveList: React.Dispatch<React.SetStateAction<activeListTYPES>>;
}) {
  return (
    <header className="flex justify-between px-4 py-3">
      <div className="flex gap-2">
        <button onClick={() => toggleBookList({ setActiveList })}>
          {bookListText}
        </button>
        <button onClick={() => toggleChapterList({ setActiveList })}>
          {selectedChapter}
        </button>
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
