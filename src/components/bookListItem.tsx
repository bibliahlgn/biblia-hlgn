export default function BookListItem({
  bookName,
  toggleChapters,
}: {
  bookName: string;
  toggleChapters: () => void;
}) {
  return (
    <li
      onClick={() => toggleChapters()}
      className="text-muted_fg cursor-pointer font-medium"
    >
      {bookName}
    </li>
  );
}
