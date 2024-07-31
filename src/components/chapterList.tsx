import { activeListTYPES, bookToOpenTYPES } from "../types";

export default function ChapterList({
  chapterCount,
  activeList,
  setActiveList,
  setBookToOpen,
}: {
  chapterCount: number;
  activeList: activeListTYPES;
  setActiveList: React.Dispatch<React.SetStateAction<activeListTYPES>>;
  setBookToOpen: React.Dispatch<React.SetStateAction<bookToOpenTYPES>>;
}) {
  const prepareContent = (e: React.MouseEvent<HTMLLIElement>) => {
    const chapter: string = (e.target as HTMLLIElement).textContent!;
    setActiveList({ chapterList: false });

    setBookToOpen((prev) => ({
      testament: prev.testament,
      bookName: prev.bookName,
      chapter: chapter,
    }));
  };

  const renderChapterButtons = () => {
    let items = [];

    for (let i = 1; i <= chapterCount; i++) {
      items.push(
        <li key={i} className="cursor-pointer" onClick={prepareContent}>
          {i}
        </li>,
      );
    }
    return items;
  };

  return (
    <div
      data-activelist={activeList.chapterList ? "true" : "false"}
      className="absolute inset-0 hidden bg-slate-400 data-activelist:block"
    >
      <ul className="flex flex-wrap gap-2">{renderChapterButtons()}</ul>
    </div>
  );
}
