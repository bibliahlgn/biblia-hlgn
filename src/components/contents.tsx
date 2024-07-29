import React, { useEffect } from "react";
import DOMPurify from "dompurify";

export default function Contents({
  bookToOpen,
  activeTestament,
  selectedBook,
  rawContent,
  setRawContent,
}: {
  bookToOpen: string;
  activeTestament: "old" | "new";
  selectedBook: string;
  rawContent: string;
  setRawContent: React.Dispatch<React.SetStateAction<string>>;
}) {
  useEffect(() => {
    const fetchBook = async () => {
      if (bookToOpen != "" && activeTestament != null) {
        const pathToBook = `books/${activeTestament}/${selectedBook.toLowerCase()}/${bookToOpen}.htm`;

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
  }, [bookToOpen]);

  return (
    <article
      className="prose prose-h1:text-lg"
      dangerouslySetInnerHTML={{ __html: rawContent }}
    ></article>
  );
}
