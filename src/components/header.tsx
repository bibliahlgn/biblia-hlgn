import { activeListTYPES, bookToOpenTYPES } from "../types";
import {
  ToggleTheme,
  toggleBookList,
  toggleChapterList,
} from "../utils/toggleSwitch";

function Header({
  setActiveList,
  bookToOpen,
}: {
  setActiveList: React.Dispatch<React.SetStateAction<activeListTYPES>>;
  bookToOpen: bookToOpenTYPES;
}) {
  return (
    <header className="bg-background/90 supports-[backdrop-filter]:bg-background/50 border-border_clr/40 sticky top-0 z-10 flex justify-between border px-4 py-2 backdrop-blur">
      <div className="flex gap-2">
        <button onClick={() => toggleBookList({ setActiveList })}>
          {bookToOpen.bookName == "" && (
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
          )}
          {bookToOpen.bookName}
        </button>
        {bookToOpen.chapter != "" && (
          <button onClick={() => toggleChapterList({ setActiveList })}>
            {bookToOpen.chapter}
          </button>
        )}
      </div>
      <div className="flex gap-x-3">
        {/* <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="size-6"
          >
            <path
              fill="currentColor"
              d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
            />
          </svg>
        </button> */}
        <ToggleTheme></ToggleTheme>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="text-foreground size-5 transition-colors"
          >
            <path
              fill="currentColor"
              d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
