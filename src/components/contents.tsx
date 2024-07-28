import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function Contents({
  bookToOpen,
  activeTestament,
}: {
  bookToOpen: string;
  activeTestament: "old" | "new";
}) {
  const [rawContent, setRawContent] = useState("");
  console.log(rawContent);

  useEffect(() => {
    const fetchBook = async () => {
      if (bookToOpen != "" && activeTestament != null) {
        const resp = await fetch(
          `books/${activeTestament}/genesis/${bookToOpen}.htm`,
        );
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
