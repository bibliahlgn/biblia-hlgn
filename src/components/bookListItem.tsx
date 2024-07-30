export default function BookListItem({
  bookName,
  toggleChapters,
}: {
  bookName: string;
  toggleChapters: () => void;
}) {
  return (
    <li onClick={() => toggleChapters()} className="cursor-pointer">
      {bookName}
    </li>
  );
}
