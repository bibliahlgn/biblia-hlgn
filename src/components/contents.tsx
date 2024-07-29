import React, { useEffect } from "react";
import DOMPurify from "dompurify";

export default function Contents({
  activeTestament,
  selectedBook,
  rawContent,
  setRawContent,
  selectedChapter,
}: {
  activeTestament: "old" | "new";
  selectedBook: string;
  rawContent: string;
  setRawContent: React.Dispatch<React.SetStateAction<string>>;
  selectedChapter: string;
}) {
  useEffect(() => {
    const fetchBook = async () => {
      if (
        selectedBook != "" &&
        selectedChapter != "" &&
        activeTestament != null
      ) {
        const pathToBook = `books/${activeTestament}/${selectedBook}/${selectedBook}${selectedChapter}.htm`;

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
  }, [selectedChapter]);

  return (
    <article
      className="prose prose-h1:text-lg"
      dangerouslySetInnerHTML={{ __html: rawContent }}
    ></article>
  );
}
