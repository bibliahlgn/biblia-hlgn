export function FontControl({
  setFontSize,
}: {
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
}) {
  const increaseFont = () =>
    setFontSize((prevSize) => Math.min(prevSize + 0.1, 2));

  const decreaseFont = () =>
    setFontSize((prevSize) => Math.max(prevSize - 0.1, 1));

  return (
    <div className="pointer-events-auto col-start-2 mb-4 mr-4 w-max place-self-end overflow-hidden rounded-md bg-foreground font-medium text-background *:whitespace-nowrap *:px-5 *:py-1 *:transition-colors hover:*:bg-accent/80 hover:*:text-foreground">
      <button onClick={increaseFont}>&#65291;</button>
      <button onClick={decreaseFont}>&#65293;</button>
    </div>
  );
}
