export default function ChapterList({
  chapterCount,
  selectedBook,
  setBookToOpen,
}: {
  chapterCount: number;
  selectedBook: string;
  setBookToOpen: React.Dispatch<React.SetStateAction<string>>;
}) {
  const setWhatToOpen = (e: React.MouseEvent<HTMLLIElement>) => {
    setBookToOpen(
      //e.target.textContent is the the selected verse or activeVerse
      `${selectedBook.toLowerCase()}${(e.target as HTMLLIElement).textContent}`,
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
