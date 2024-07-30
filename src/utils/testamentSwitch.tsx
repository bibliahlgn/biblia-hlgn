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
    <button
      onClick={() => toggleTestament()}
      className="relative grid grid-cols-2 items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-md border px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      <span
        data-isnew={isNewTestament ? "true" : "false"}
        className="z-10 text-white transition-all duration-500 data-isnew:text-black"
      >
        Da-an
      </span>
      <span
        data-isnew={isNewTestament ? "true" : "false"}
        className="z-10 text-black transition-all duration-500 data-isnew:text-white"
      >
        Bag-o
      </span>
      <div
        data-isnew={isNewTestament ? "true" : "false"}
        className="absolute inset-y-0 left-0 h-full w-1/2 bg-black transition-all duration-300 data-isnew:left-1/2 data-isnew:right-0"
      ></div>
    </button>
  );
}
