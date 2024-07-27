export default function ChapterList({
  chapterCount,
}: {
  chapterCount: number;
}) {
  const renderChapterButtons = () => {
    let items = [];

    for (let i = 1; i <= chapterCount; i++) {
      items.push(
        <li key={i} className="cursor-pointer">
          {i}
        </li>,
      );
    }
    return items;
  };

  return <ul className="flex flex-wrap gap-2">{renderChapterButtons()}</ul>;
}
