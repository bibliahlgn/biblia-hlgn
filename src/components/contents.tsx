import React, { useEffect } from "react";
import DOMPurify from "dompurify";
import { bookToOpenTYPES } from "../types";

export default function Contents({
  rawContent,
  setRawContent,
  pathFragments,
}: {
  rawContent: string;
  setRawContent: React.Dispatch<React.SetStateAction<string>>;
  pathFragments: bookToOpenTYPES;
}) {
  useEffect(() => {
    const fetchBook = async () => {
      if (
        pathFragments.bookName != "" &&
        pathFragments.chapter != "" &&
        pathFragments.testament != null
      ) {
        const pathToBook = `books/${pathFragments.testament.toLowerCase()}/${pathFragments.bookName?.toLowerCase()}/${pathFragments.bookName?.toLowerCase()}${pathFragments.chapter}.htm`;

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
  }, [pathFragments.chapter]);

  return (
    <article
      className="prose px-4 py-2 prose-h1:text-lg"
      dangerouslySetInnerHTML={{ __html: rawContent }}
    ></article>
  );
}
