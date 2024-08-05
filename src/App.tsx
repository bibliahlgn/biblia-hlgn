import { useEffect, useState } from "react";
import Header from "./components/header";
import BookList from "./components/bookList";
import ChapterList from "./components/chapterList";
import Contents from "./components/contents";
import { activeListTYPES, bookToOpenTYPES } from "./types";
import DOMPurify from "dompurify";

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
    if (activeList.bookList) {
      document.body.classList.add("overflow-hidden");
    } else document.body.classList.remove("overflow-hidden");
  }, [activeList.bookList]);

  useEffect(() => {
    if (activeTestament != bookToOpen.testament) {
      setBookToOpen((prev) => ({
        ...prev,
        testament: activeTestament,
      }));
    }

    sessionStorage.setItem("TESTAMENT", activeTestament);
  }, [bookToOpen.bookName]);

  useEffect(() => {
    setActiveList((prev) => ({
      ...prev,
      chapterList: bookToOpen.chapter == "" && !activeAbout ? true : false,
    }));
  }, [activeAbout]);

  useEffect(() => {
    const fetchBook = async () => {
      if (
        bookToOpen.bookName != "" &&
        bookToOpen.chapter != "" &&
        bookToOpen.testament != null
      ) {
        const pathToBook = `books/${bookToOpen.testament.toLowerCase()}/${bookToOpen.bookName?.toLowerCase()}/${bookToOpen.bookName?.toLowerCase()}${bookToOpen.chapter}.htm`;

        const resp = await fetch(pathToBook);
        const raw = await resp.text();
        const purifiedHTML = DOMPurify.sanitize(raw, {
          ALLOWED_TAGS: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "p",
            "strong",
            "sup",
          ],
          USE_PROFILES: {
            html: true,
          },
        });

        setRawContent(purifiedHTML);
      }
    };
    fetchBook();
    setActiveTestament(sessionStorage.getItem("TESTAMENT") as "old" | "new");
  }, [bookToOpen.chapter]);

  return (
    <>
      <Header
        setActiveList={setActiveList}
        bookToOpen={bookToOpen}
        activeAbout={activeAbout}
        setActiveAbout={setActiveAbout}
        chapterFragment={bookToOpen.chapter!}
      />
      <main className="relative md:grid md:grid-cols-3 lg:grid-cols-4">
        {!activeAbout && (
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
        )}
        <article
          data-activeabout={activeAbout ? "true" : "false"}
          data-activelist={activeList.chapterList ? "true" : "false"}
          className="md:data-activeabout:m-auto md:data-activeabout:col-span-full prose px-5 py-12 prose-headings:mb-4 prose-headings:text-center prose-headings:text-foreground prose-h1:text-xl prose-p:my-3 prose-p:text-foreground prose-strong:mb-10 prose-strong:mt-4 prose-strong:block prose-strong:!text-center prose-strong:text-3xl prose-strong:font-bold prose-strong:text-foreground max-md:data-activelist:hidden md:col-span-2"
        >
          <Contents
            rawContent={rawContent}
            activeAbout={activeAbout}
          ></Contents>
        </article>
        {!activeAbout && (
          <nav
            data-activelist={activeList.chapterList ? "true" : "false"}
            className="sticky inset-x-0 top-[50px] hidden h-[calc(100dvh-50px)] p-4 data-activelist:block md:block md:overflow-y-auto md:pr-0"
          >
            <ChapterList
              chapterCount={chapterCount}
              setActiveList={setActiveList}
              setBookToOpen={setBookToOpen}
            />
          </nav>
        )}
      </main>
    </>
  );
}

export default App;
