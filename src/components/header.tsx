import { activeListTYPES, bookToOpenTYPES } from "../types";
import { GhostButton } from "../utils/buttons";
import {
  ToggleTheme,
  toggleBookList,
  toggleChapterList,
} from "../utils/toggleSwitch";

function Header({
  setActiveList,
  bookToOpen,
  activeAbout,
  setActiveAbout,
}: {
  setActiveList: React.Dispatch<React.SetStateAction<activeListTYPES>>;
  bookToOpen: bookToOpenTYPES;
  activeAbout: boolean;
  setActiveAbout: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const toggleAbout = () => {
    setActiveList({
      bookList: false,
      chapterList: false,
    });
    setActiveAbout((prevState) => !prevState);
  };

  return (
    <header className="sticky top-0 z-10 flex justify-between border border-border_clr/40 bg-background/90 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="flex">
        {activeAbout ? (
          <div className="ghost-button text-foreground">About</div>
        ) : (
          <>
            <GhostButton
              action={() => toggleBookList({ setActiveList })}
              classname="px-2"
            >
              {bookToOpen.bookName == "" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="size-5"
                >
                  <path
                    fill="currentColor"
                    d="M7 9V7h14v2zm0 4v-2h14v2zm0 4v-2h14v2zM4 9q-.425 0-.712-.288T3 8t.288-.712T4 7t.713.288T5 8t-.288.713T4 9m0 4q-.425 0-.712-.288T3 12t.288-.712T4 11t.713.288T5 12t-.288.713T4 13m0 4q-.425 0-.712-.288T3 16t.288-.712T4 15t.713.288T5 16t-.288.713T4 17"
                  />
                </svg>
              ) : (
                bookToOpen.bookName
              )}
            </GhostButton>
            {bookToOpen.chapter != "" && !activeAbout && (
              <GhostButton
                action={() => toggleChapterList({ setActiveList })}
                classname="min-w-8"
              >
                {bookToOpen.chapter}
              </GhostButton>
            )}
          </>
        )}
      </div>
      <div className="flex gap-x-1">
        <ToggleTheme></ToggleTheme>
        <GhostButton action={toggleAbout}>
          {activeAbout ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M4.28 3.22a.75.75 0 0 0-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 1 0 1.06 1.06L8 9.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L9.06 8l3.72-3.72a.75.75 0 0 0-1.06-1.06L8 6.94z"
                clip-rule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="size-5 text-foreground transition-colors"
            >
              <path
                fill="currentColor"
                d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
              />
            </svg>
          )}
        </GhostButton>
      </div>
    </header>
  );
}

export default Header;
