export default function ChapterList({
  chapterCount,
  openBook,
  setBookToOpen,
}: {
  chapterCount: number;
  openBook: string;
  setBookToOpen: React.Dispatch<React.SetStateAction<string>>;
}) {
  const setWhatToOpen = (e: React.MouseEvent<HTMLLIElement>) => {
    setBookToOpen(
      `${openBook.toLowerCase()}${(e.target as HTMLLIElement).textContent}`,
    );
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

  return <ul className="flex flex-wrap gap-2">{renderChapterButtons()}</ul>;
}
