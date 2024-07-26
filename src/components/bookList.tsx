import { useState } from "react";

export function BookList() {
  const booknames = {
    old: ["Genesis50", "Exodus40"],
    new: ["Mateo28", "Marcos16", "Lucas24"],
  };

  const [testament, setTestament] = useState("old");

  const bookName = (i: string) => i.replace(/\d+$/, "");

  return (
    <>
      <div>
        <button onClick={() => setTestament("old")}>Old</button>
        <button onClick={() => setTestament("new")}>New</button>
      </div>
      <ul
        data-isnew={testament === "new" ? "true" : "false"}
        className="data-isnew:hidden"
      >
        {booknames.old.map((i) => (
          <li key={i.toLowerCase()} className="cursor-pointer">
            {bookName(i)}
          </li>
        ))}
      </ul>
      <ul
        data-isnew={testament === "new" ? "true" : "false"}
        className="data-isnew:block hidden"
      >
        {booknames.new.map((i) => (
          <li key={i.toLowerCase()}>{bookName(i)}</li>
        ))}
      </ul>
    </>
  );
}
