import { activeListTYPES, bookToOpenTYPES } from "../types";

export default function ChapterList({
  chapterCount,
  setActiveList,
  setBookToOpen,
}: {
  chapterCount: number;
  setActiveList: React.Dispatch<React.SetStateAction<activeListTYPES>>;
  setBookToOpen: React.Dispatch<React.SetStateAction<bookToOpenTYPES>>;
}) {
  const prepareContent = (e: React.MouseEvent<HTMLLIElement>) => {
    const chapter: string = (e.target as HTMLLIElement).textContent!;
    setActiveList({ chapterList: false });

    setBookToOpen((prev) => ({
      ...prev,
      chapter: chapter,
    }));
  };

  const renderChapterButtons = () => {
    let items = [];

    for (let i = 1; i <= chapterCount; i++) {
      items.push(
        <li
          key={i}
          className="ghost-hover flex-shrink-0 basis-10 rounded-md p-1 text-center text-foreground"
          onClick={prepareContent}
        >
          {i}
        </li>,
      );
    }
    return items;
  };

  return (
    <ul className="flex max-h-[calc(100vh-8rem)] flex-wrap gap-2 overflow-y-auto">
      {renderChapterButtons()}
    </ul>
  );
}
