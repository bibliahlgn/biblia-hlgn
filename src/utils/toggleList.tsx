import { activeListTYPES } from "../types";

export function toggleBookList({
  setActiveList,
}: {
  setActiveList: React.Dispatch<React.SetStateAction<activeListTYPES>>;
}) {
  setActiveList((prevState) => ({ bookList: !prevState.bookList }));
}

export function toggleChapterList({
  setActiveList,
}: {
  setActiveList: React.Dispatch<React.SetStateAction<activeListTYPES>>;
}) {
  setActiveList((prevState) => ({
    bookList: prevState.bookList ? !prevState.bookList : prevState.bookList,
    chapterList: !prevState.chapterList,
  }));
}
