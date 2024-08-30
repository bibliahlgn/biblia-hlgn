import { useEffect, useState } from "react";
import Header from "./components/header";
import BookList from "./components/bookList";
import ChapterList from "./components/chapterList";
import Contents from "./components/contents";
import { activeListTYPES, bookToOpenTYPES } from "./types";
import DOMPurify from "dompurify";
import { appWindow } from "@tauri-apps/api/window";
import { FontControl } from "./utils/fontSizeControl";

function App() {
  const [fontSize, setFontSize] = useState<number>(1);
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
      bookToOpen.bookName != "" && bookToOpen.chapter == ""
        ? true
        : bookToOpen.chapter != "" && bookToOpen.bookName != "" && false,
  });

  useEffect(() => {
    sessionStorage.setItem("BOOKTOOPEN", JSON.stringify(bookToOpen));
    sessionStorage.setItem("CHAPTERCOUNT", JSON.stringify(chapterCount));
  }, [bookToOpen, chapterCount]);

  useEffect(() => {
    const handleResize = () => {
      if (activeList.bookList && window.innerWidth < 1024) {
        document.body.classList.add("overflow-hidden");
      } else document.body.classList.remove("overflow-hidden");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
    const fetchBook = async () => {
      if (
        bookToOpen.bookName != "" &&
        bookToOpen.chapter != "" &&
        bookToOpen.testament != null
      ) {
        const pathToBook = `books/${bookToOpen.testament.toLowerCase()}/${bookToOpen.bookName?.toLowerCase().replace(" ", "")}/${bookToOpen.bookName?.toLowerCase().replace(" ", "")}${bookToOpen.chapter}.htm`;

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

  useEffect(() => {
    if ((bookToOpen.bookName != undefined, bookToOpen.chapter != undefined)) {
      appWindow.setTitle(`${bookToOpen.bookName} ${bookToOpen.chapter}`);
    } else null;
  }, [bookToOpen.bookName, bookToOpen.chapter]);

  useEffect(() => {
    if (bookToOpen.bookName == "" || bookToOpen.chapter == "") {
      appWindow.setTitle("Hiligaynon Bible");
    }

    // const handleContextMenu = (event: MouseEvent) => {
    //   event.preventDefault();
    // };
    // document.addEventListener("contextmenu", handleContextMenu);
    // return () => {
    //   document.removeEventListener("contextmenu", handleContextMenu);
    // };
  }, []);

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
        <div
          data-activeabout={activeAbout ? "true" : "false"}
          className="md:col-span-2 md:data-activeabout:col-span-full md:data-activeabout:m-auto"
        >
          <article
            data-activelist={
              activeList.chapterList && !activeAbout ? "true" : "false"
            }
            className="prose relative max-w-none px-5 py-12 transition-all prose-headings:mb-4 prose-headings:text-center prose-headings:text-foreground prose-h1:text-xl prose-h2:text-lg prose-p:my-3 prose-p:text-foreground prose-strong:mb-10 prose-strong:mt-4 prose-strong:block prose-strong:!text-center prose-strong:text-3xl prose-strong:font-bold prose-strong:text-foreground max-md:min-h-[calc(100dvh-50px)] max-md:data-activelist:hidden"
            style={{ fontSize: `${fontSize}rem` }}
          >
            <Contents
              rawContent={rawContent}
              activeAbout={activeAbout}
            ></Contents>
          </article>
          {!activeAbout && (
            <div className="pointer-events-none fixed bottom-0 w-full bg-transparent">
              <FontControl setFontSize={setFontSize}></FontControl>
            </div>
          )}
          {!rawContent && !activeAbout && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="absolute inset-1/2 size-32 -translate-x-1/2 -translate-y-1/2 text-muted_fg/25"
            >
              <path
                fill="currentColor"
                d="M12 21.5c-1.35-.85-3.8-1.5-5.5-1.5c-1.65 0-3.35.3-4.75 1.05c-.1.05-.15.05-.25.05c-.25 0-.5-.25-.5-.5V6c.6-.45 1.25-.75 2-1c1.11-.35 2.33-.5 3.5-.5c1.95 0 4.05.4 5.5 1.5c1.45-1.1 3.55-1.5 5.5-1.5c1.17 0 2.39.15 3.5.5c.75.25 1.4.55 2 1v14.6c0 .25-.25.5-.5.5c-.1 0-.15 0-.25-.05c-1.4-.75-3.1-1.05-4.75-1.05c-1.7 0-4.15.65-5.5 1.5M12 8v11.5c1.35-.85 3.8-1.5 5.5-1.5c1.2 0 2.4.15 3.5.5V7c-1.1-.35-2.3-.5-3.5-.5c-1.7 0-4.15.65-5.5 1.5m1 3.5c1.11-.68 2.6-1 4.5-1c.91 0 1.76.09 2.5.28V9.23c-.87-.15-1.71-.23-2.5-.23q-2.655 0-4.5.84zm4.5.17c-1.71 0-3.21.26-4.5.79v1.69c1.11-.65 2.6-.99 4.5-.99c1.04 0 1.88.08 2.5.24v-1.5c-.87-.16-1.71-.23-2.5-.23m2.5 2.9c-.87-.16-1.71-.24-2.5-.24c-1.83 0-3.33.27-4.5.8v1.69c1.11-.66 2.6-.99 4.5-.99c1.04 0 1.88.08 2.5.24z"
              />
            </svg>
          )}
        </div>
        {!activeAbout && (
          <nav
            data-activelist={activeList.chapterList ? "true" : "false"}
            className="sticky inset-x-0 top-[50px] hidden h-[calc(100dvh-50px)] p-4 data-activelist:block max-md:bg-background md:block md:pr-0"
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
