import React, { useEffect, useState } from "react";

export default function TestamentSwitch({
  setActiveTestament,
}: {
  setActiveTestament: React.Dispatch<React.SetStateAction<"old" | "new">>;
}) {
  const [isNewTestament, setNewTestament] = useState<boolean>(() => {
    const selectedTestament = sessionStorage.getItem("isNewTestament");
    return selectedTestament ? JSON.parse(selectedTestament) : false;
  });

  useEffect(() => {
    sessionStorage.setItem("isNewTestament", JSON.stringify(isNewTestament));

    if (isNewTestament) {
      setActiveTestament("new");
    } else setActiveTestament("old");
  }, [isNewTestament]);

  const toggleTestament = () => {
    setNewTestament((prevState) => !prevState);
  };

  return (
    <button onClick={() => toggleTestament()} className="border">
      <span
        data-isnew={isNewTestament ? "true" : "false"}
        className="bg-slate-400 data-isnew:bg-transparent"
      >
        Old
      </span>
      <span
        data-isnew={isNewTestament ? "true" : "false"}
        className="bg-transparent data-isnew:bg-slate-400"
      >
        New
      </span>
    </button>
  );
}
