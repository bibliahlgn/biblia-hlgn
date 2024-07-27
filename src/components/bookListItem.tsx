export default function BookListItem({
  bookname,
  toggleChapters,
  getBookName,
}: {
  bookname: string;
  toggleChapters: Function;
  getBookName: Function;
}) {
  return (
    <li onClick={() => toggleChapters(bookname)} className="cursor-pointer">
      {getBookName(bookname)}
    </li>
  );
}
