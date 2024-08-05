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
  chapterFragment: string;
}) {
  const toggleAbout = () => setActiveAbout((prevState) => !prevState);

  return (
    <header className="sticky top-0 z-10 flex min-h-[50px] justify-between border border-border_clr/40 bg-background/90 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/50 lg:px-8">
      <div className="flex">
        {activeAbout ? (
          <div className="ghost-button text-foreground">About</div>
        ) : (
          <>
            <GhostButton
              action={() => toggleBookList({ setActiveList })}
              classname="px-2 lg:hover:!cursor-text lg:!bg-transparent"
            >
              {bookToOpen.bookName == "" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 9.525 9.525"
                  className="lg:hidden"
                >
                  <path
                    fill="currentColor"
                    d="M.529 5.291a.53.53 0 0 0 .529-.529.53.53 0 0 0-.529-.529.53.53 0 0 0-.529.529.53.53 0 0 0 .529.529m0 2.117a.53.53 0 0 0 .529-.529.53.53 0 0 0-.529-.529.53.53 0 0 0-.529.529.53.53 0 0 0 .529.529m0-4.233a.53.53 0 0 0 .529-.529.53.53 0 0 0-.529-.529.53.53 0 0 0-.529.529.53.53 0 0 0 .529.529m2.117 2.117h6.35a.53.53 0 0 0 .529-.529.53.53 0 0 0-.529-.529h-6.35a.53.53 0 0 0-.529.529.53.53 0 0 0 .529.529m0 2.117h6.35a.53.53 0 0 0 .529-.529.53.53 0 0 0-.529-.529h-6.35a.53.53 0 0 0-.529.529.53.53 0 0 0 .529.529m-.529-4.763a.53.53 0 0 0 .529.529h6.35a.53.53 0 0 0 .529-.529.53.53 0 0 0-.529-.529h-6.35a.53.53 0 0 0-.529.529M.529 5.291a.53.53 0 0 0 .529-.529.53.53 0 0 0-.529-.529.53.53 0 0 0-.529.529.53.53 0 0 0 .529.529m0 2.117a.53.53 0 0 0 .529-.529.53.53 0 0 0-.529-.529.53.53 0 0 0-.529.529.53.53 0 0 0 .529.529m0-4.233a.53.53 0 0 0 .529-.529.53.53 0 0 0-.529-.529.53.53 0 0 0-.529.529.53.53 0 0 0 .529.529m2.117 2.117h6.35a.53.53 0 0 0 .529-.529.53.53 0 0 0-.529-.529h-6.35a.53.53 0 0 0-.529.529.53.53 0 0 0 .529.529m0 2.117h6.35a.53.53 0 0 0 .529-.529.53.53 0 0 0-.529-.529h-6.35a.53.53 0 0 0-.529.529.53.53 0 0 0 .529.529m-.529-4.763a.53.53 0 0 0 .529.529h6.35a.53.53 0 0 0 .529-.529.53.53 0 0 0-.529-.529h-6.35a.53.53 0 0 0-.529.529"
                  />
                </svg>
              ) : (
                bookToOpen.bookName
              )}
            </GhostButton>
            {bookToOpen.chapter != "" && (
              <GhostButton
                action={() => toggleChapterList({ setActiveList })}
                classname="min-w-8 md:hover:!cursor-text md:!bg-transparent"
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
              width="36"
              height="36"
              viewBox="0 0 9.525 9.525"
            >
              <path
                fill="currentColor"
                d="M4.763 5.311l2.239 2.239c.155.15.402.148.555-.005s.155-.399.005-.555L5.322 4.751l2.239-2.239c.15-.155.148-.402-.005-.555s-.399-.155-.555-.005L4.763 4.192 2.524 1.953c-.156-.146-.4-.142-.551.009s-.155.395-.009.551l2.238 2.239L1.964 6.99c-.103.099-.144.246-.108.385s.144.246.283.283.285-.005.385-.108z"
                fillRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 9.525 9.525"
            >
              <path
                fill="currentColor"
                d="M4.286 7.144h.953V4.286h-.953zm.476-3.81q.202 0 .34-.137.137-.137.137-.339 0-.202-.137-.339-.137-.137-.339-.137-.202 0-.339.137-.137.137-.137.339 0 .202.137.34.138.138.339.137m0 6.191q-.988 0-1.857-.375-.869-.375-1.512-1.018Q.75 7.489.375 6.62 0 5.75 0 4.762q0-.988.375-1.857.376-.87 1.018-1.512Q2.035.75 2.905.375 3.775 0 4.762 0 5.75 0 6.62.375q.87.375 1.512 1.018.642.642 1.018 1.512.376.87.375 1.857-.002.988-.375 1.857-.374.87-1.018 1.512-.644.642-1.512 1.018-.868.376-1.857.375m0-.952q1.595 0 2.703-1.107 1.107-1.107 1.107-2.703 0-1.595-1.107-2.703Q6.358.952 4.762.952 3.167.952 2.06 2.06.952 3.167.952 4.762q0 1.595 1.107 2.703 1.107 1.107 2.703 1.107m0-3.81"
              />
            </svg>
          )}
        </GhostButton>
      </div>
    </header>
  );
}

export default Header;
