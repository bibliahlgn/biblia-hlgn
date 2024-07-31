export type activeListTYPES = {
  bookList?: boolean;
  chapterList?: boolean;
};

export type bookToOpenTYPES = {
  testament?: "old" | "new";
  bookName?: string;
  chapter?: string;
};
