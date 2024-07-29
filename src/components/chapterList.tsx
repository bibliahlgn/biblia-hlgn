import { activeListTYPES } from "../types";

export default function ChapterList({
  chapterCount,
  selectedBook,
  setBookToOpen,
  setSelectedChapter,
  activeList,
  setActiveList,
}: {
  chapterCount: number;
  selectedBook: string;
  setBookToOpen: React.Dispatch<React.SetStateAction<string>>;
  setSelectedChapter: React.Dispatch<React.SetStateAction<string>>;
  activeList: activeListTYPES;
  setActiveList: React.Dispatch<React.SetStateAction<activeListTYPES>>;
}) {
  const setWhatToOpen = (e: React.MouseEvent<HTMLLIElement>) => {
    const chapter: string = (e.target as HTMLLIElement).textContent!;

    setBookToOpen(
      //e.target.textContent is the the selected chapter or activeChapter
      `${selectedBook.toLowerCase()}${chapter}`,
    );
    setSelectedChapter(chapter);
    setActiveList({ chapterList: false });
  };

  const renderChapterButtons = () => {
    let items = [];

    for (let i = 1; i <= chapterCount; i++) {
      items.push(
        <li key={i} className="cursor-pointer" onClick={setWhatToOpen}>
          {i}
        </li>,
      );
    }
    return items;
  };

  return (
    <ul
      data-activelist={activeList.chapterList ? "true" : "false"}
      className="data-activelist:flex hidden flex-wrap gap-2"
    >
      {renderChapterButtons()}
    </ul>
  );
}
