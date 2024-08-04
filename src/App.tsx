import { useEffect, useState } from "react";
import Header from "./components/header";
import BookList from "./components/bookList";
import ChapterList from "./components/chapterList";
import Contents from "./components/contents";
import { activeListTYPES, bookToOpenTYPES } from "./types";

function App() {
  const [rawContent, setRawContent] = useState<string>("");
  const [activeAbout, setActiveAbout] = useState<boolean>(false);
  const [activeTestament, setActiveTestament] = useState<"old" | "new">(() => {
    const session = sessionStorage.getItem("TESTAMENT") as "old" | "new";
    return session || "old";
  });
  //chapterCount is the total number of chapters in a book (selected book)
  const [chapterCount, setChapterCount] = useState<number>(() => {
    const session = sessionStorage.getItem("CHAPTERCOUNT");
    return session ? JSON.parse(session) : 0;
  });
  const [bookToOpen, setBookToOpen] = useState<bookToOpenTYPES>(() => {
    const session = sessionStorage.getItem("BOOKTOOPEN");
    return session
      ? JSON.parse(session)
      : {
          testament: "old",
          bookName: "",
          chapter: "",
        };
  });
  const [activeList, setActiveList] = useState<activeListTYPES>({
    bookList:
      bookToOpen.chapter != "" ||
      (bookToOpen.bookName != "" && bookToOpen.chapter == "")
        ? false
        : true,
    chapterList:
      (bookToOpen.bookName != "" && bookToOpen.chapter == "") ||
      bookToOpen.chapter == ""
        ? true
        : false,
  });

  useEffect(() => {
    sessionStorage.setItem("BOOKTOOPEN", JSON.stringify(bookToOpen));
    sessionStorage.setItem("CHAPTERCOUNT", JSON.stringify(chapterCount));
  }, [bookToOpen, chapterCount]);

  useEffect(() => {
    //Temporary fix, needs the client to refresh
    //FIXED
    ///

    if (activeList.bookList) {
      document.body.classList.add("overflow-hidden");
    } else document.body.classList.remove("overflow-hidden");
  }, [activeList.bookList]);

  //This is the fix of the above issue
  useEffect(() => {
    setBookToOpen((prev) => ({
      ...prev,
      testament: activeTestament,
    }));

    sessionStorage.setItem("TESTAMENT", activeTestament);
  }, [bookToOpen.bookName]);

  useEffect(() => {
    setActiveList((prev) => ({
      ...prev,
      chapterList: bookToOpen.chapter == "" && !activeAbout ? true : false,
    }));
  }, [activeAbout]);

  return (
    <>
      <Header
        setActiveList={setActiveList}
        bookToOpen={bookToOpen}
        activeAbout={activeAbout}
        setActiveAbout={setActiveAbout}
        chapterFragment={bookToOpen.chapter!}
      />
      <main className="relative grid min-h-dvh grid-cols-4">
        <BookList
          setChapterCount={setChapterCount}
          activeList={activeList}
          setActiveList={setActiveList}
          setRawContent={setRawContent}
          bookToOpen={bookToOpen}
          setBookToOpen={setBookToOpen}
          activeTestament={activeTestament}
          setActiveTestament={setActiveTestament}
        />
        <div
          data-activelist={activeList.chapterList ? "true" : "false"}
          className="prose px-5 py-12 prose-headings:mb-4 prose-headings:text-center prose-headings:text-foreground prose-h1:text-xl prose-p:my-3 prose-p:text-foreground prose-strong:mb-10 prose-strong:mt-4 prose-strong:block prose-strong:!text-center prose-strong:text-3xl prose-strong:font-bold prose-strong:text-foreground max-md:data-activelist:hidden md:col-span-2"
        >
          <Contents
            rawContent={rawContent}
            setRawContent={setRawContent}
            pathFragments={bookToOpen}
            activeAbout={activeAbout}
          ></Contents>
        </div>
        <div
          data-activelist={activeList.chapterList ? "true" : "false"}
          className="absolute inset-x-0 top-0 hidden min-h-dvh p-4 data-activelist:block md:static md:block"
        >
          <ChapterList
            chapterCount={chapterCount}
            setActiveList={setActiveList}
            setBookToOpen={setBookToOpen}
          />
        </div>
      </main>
    </>
  );
}

export default App;
