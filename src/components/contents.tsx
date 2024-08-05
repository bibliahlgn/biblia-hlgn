import About from "./about";

export default function Contents({
  rawContent,
  activeAbout,
}: {
  rawContent: string;
  activeAbout: boolean;
}) {
  return activeAbout ? (
    <About></About>
  ) : (
    <div dangerouslySetInnerHTML={{ __html: rawContent }}></div>
  );
}
