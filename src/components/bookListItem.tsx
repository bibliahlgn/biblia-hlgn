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
      className="text-muted_fg hover:text-accent_fg cursor-pointer font-medium transition-colors"
    >
      {bookName}
    </li>
  );
}
