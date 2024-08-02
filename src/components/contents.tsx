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

  return (
    <div className="prose px-5 py-12 prose-headings:mb-4 prose-headings:text-center prose-headings:text-foreground prose-h1:text-xl prose-p:my-3 prose-p:text-foreground prose-strong:mb-10 prose-strong:mt-4 prose-strong:block prose-strong:!text-center prose-strong:text-3xl prose-strong:font-bold prose-strong:text-foreground">
      {activeAbout ? (
        <About></About>
      ) : (
        <article dangerouslySetInnerHTML={{ __html: rawContent }}></article>
      )}
    </div>
  );
}
