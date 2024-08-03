import { useEffect, useState } from "react";
import { activeListTYPES } from "../types";
import { GhostButton } from "./buttons";

export function toggleBookList({
  setActiveList,
}: {
  setActiveList: React.Dispatch<React.SetStateAction<activeListTYPES>>;
}) {
  setActiveList((prevState) => ({
    bookList: !prevState.bookList,
    chapterList: prevState.chapterList,
  }));
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

export function ToggleTheme() {
  type ThemeTYPES = "dark" | "light";

  const [theme, setTheme] = useState<ThemeTYPES>(() => {
    const localTheme: "dark" | "light" = localStorage.getItem(
      "THEME",
    ) as ThemeTYPES;

    return localTheme || "light";
  });

  useEffect(() => {
    localStorage.setItem("THEME", theme);

    if (theme == "dark") {
      document.body.classList.add(theme);
    } else if (theme == "light") {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const switchTheme = () => {
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  return (
    <GhostButton
      action={() => switchTheme()}
      classname="isolate grid place-items-center *:col-span-full *:row-start-1 *:row-end-[-1]"
    >
      {theme == "light" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 9.525 9.525"
        >
          <path
            fill="currentColor"
            d="M4.52 1.202V.231c.001-.134.109-.242.243-.242s.242.108.243.242v.971c-.001.134-.109.242-.243.242s-.242-.108-.243-.242m2.751 3.56a2.51 2.51 0 0 1-2.508 2.509 2.51 2.51 0 0 1-2.508-2.509 2.51 2.51 0 0 1 2.508-2.509 2.51 2.51 0 0 1 2.508 2.509m-.485 0c0-.818-.493-1.556-1.249-1.869s-1.626-.14-2.204.439-.752 1.449-.439 2.205 1.051 1.249 1.869 1.249c1.117-.001 2.021-.906 2.023-2.023M2.002 2.344c.061.065.152.092.238.07s.153-.089.175-.175-.005-.177-.07-.238l-.647-.647c-.096-.089-.245-.086-.337.006s-.095.241-.006.337zm0 4.836l-.647.647c-.065.061-.092.152-.07.238s.089.153.175.175.177-.005.238-.07l.647-.647c.065-.061.092-.152.07-.238s-.089-.153-.175-.175-.177.005-.238.07m5.35-4.765c.064 0 .126-.026.172-.071l.647-.647c.089-.096.086-.245-.006-.337s-.241-.095-.337-.006l-.647.647c-.069.069-.09.174-.053.264s.126.15.224.15m.172 4.765c-.096-.089-.245-.086-.337.006s-.095.241-.006.337l.647.647c.096.089.245.086.337-.006s.095-.241.006-.337zM1.445 4.762c0-.134-.109-.243-.243-.243H.231c-.134 0-.242.109-.242.243s.108.242.242.243h.971c.134 0 .243-.109.243-.243M4.762 8.08c-.064 0-.126.026-.172.071s-.071.107-.071.172v.971c.001.134.109.242.243.242s.242-.108.243-.242v-.971c0-.064-.026-.126-.071-.172s-.107-.071-.172-.071m4.531-3.56h-.971c-.134 0-.242.109-.242.243s.108.242.242.243h.971c.134 0 .242-.109.242-.243s-.108-.242-.242-.243"
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
            d="M5.407 2.216c.055 0 .087-.037.095-.087.141-.755.137-.774.924-.928.054-.009.087-.037.087-.091s-.032-.086-.087-.096C5.639.855 5.643.842 5.502.086 5.493.036 5.461 0 5.407 0s-.082.036-.091.086c-.146.755-.137.769-.929.928-.05.009-.086.037-.086.096s.036.082.086.091c.796.155.783.173.929.928.009.05.036.087.091.087m2.18 3.076c.082 0 .141-.059.15-.146.15-1.224.2-1.242 1.443-1.447.1-.018.159-.064.159-.155s-.059-.141-.141-.155c-1.261-.214-1.311-.223-1.461-1.447-.009-.086-.068-.146-.15-.146a.15.15 0 0 0-.155.141c-.159 1.224-.196 1.238-1.461 1.452-.082.014-.141.068-.141.155s.059.137.141.155c1.265.205 1.311.223 1.461 1.456a.15.15 0 0 0 .155.136M4.164 9.525c1.666 0 3.013-.837 3.627-2.262.082-.196.054-.346-.032-.437-.082-.077-.218-.096-.382-.032-.341.136-.76.214-1.283.214-2.034 0-3.345-1.27-3.345-3.267 0-.551.105-1.097.246-1.383.091-.182.082-.337.004-.432-.086-.1-.241-.132-.455-.046C1.147 2.448.186 3.904.186 5.607c0 2.216 1.629 3.918 3.977 3.918m.009-.692C2.229 8.833.878 7.418.878 5.552a3.5 3.5 0 0 1 1.379-2.803c-.109.296-.173.751-.173 1.188 0 2.239 1.547 3.741 3.836 3.741.41 0 .783-.05.974-.118-.569.787-1.584 1.274-2.721 1.274"
          />
        </svg>
      )}
    </GhostButton>
  );
}
