import { useState } from "react";

function Header() {
  const [menuStatus, setMenuStatus] = useState<string>("close");

  const closeMenu = () =>
    menuStatus === "open" ? setMenuStatus("close") : null;

  return (
    <header className="flex justify-between px-4 py-3">
      <button
        onClick={() => (menuStatus === "close" ? setMenuStatus("open") : null)}
      >
        Book List
      </button>
      <div
        data-menustatus={menuStatus === "open" ? "open" : "close"}
        className="invisible fixed left-0 top-0 z-10 h-dvh w-2/3 bg-white p-4 data-menustatus:visible"
      >
        <div className="flex justify-between">
          <div>BIBLE</div>
          <button
            onClick={() => closeMenu()}
            className="bg-slate-500 text-white"
          >
            close menu
          </button>
        </div>
        <ul>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </div>
      <div
        data-menustatus={menuStatus === "open" ? "open" : "close"}
        onClick={() => closeMenu()}
        className="fixed left-0 top-0 hidden h-dvh w-full bg-black opacity-50 data-menustatus:block"
      ></div>
      <div className="flex gap-x-2">
        <button>Search</button>
        <button>Darkmode</button>
      </div>
    </header>
  );
}

export default Header;
