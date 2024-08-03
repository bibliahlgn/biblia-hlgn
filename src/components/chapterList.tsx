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

  //Chapter list needs to stay open when opening the about section

  return (
    <div
      data-activelist={activeList.chapterList ? "true" : "false"}
      className="absolute inset-x-0 top-0 hidden min-h-dvh p-4 data-activelist:block"
    >
      <ul className="flex flex-wrap gap-2">{renderChapterButtons()}</ul>
    </div>
  );
}
