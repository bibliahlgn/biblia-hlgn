import React, { useEffect } from "react";
import DOMPurify from "dompurify";
import { bookToOpenTYPES } from "../types";
import About from "./about";

export default function Contents({
  rawContent,
  setRawContent,
  pathFragments,
  activeAbout,
}: {
  rawContent: string;
  setRawContent: React.Dispatch<React.SetStateAction<string>>;
  pathFragments: bookToOpenTYPES;
  activeAbout: boolean;
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

  return activeAbout ? (
    <About></About>
  ) : (
    <article dangerouslySetInnerHTML={{ __html: rawContent }}></article>
  );
}
