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
        menu
      </button>
      <div className="fixed invisible top-0 left-0 z-10 bg-white p-4 w-2/3 h-dvh">
        <div className="flex justify-between">
          <div>BIBLE</div>
          <button onClick={() => closeMenu} className="text-white bg-slate-500">
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
        onClick={() => closeMenu}
        className="fixed top-0 hidden left-0 h-dvh bg-black opacity-50 w-full"
      ></div>
      <div className="flex gap-x-2">
        <button>Search</button>
        <button>Darkmode</button>
      </div>
    </header>
  );
}

export default Header;
