export async function fetchStreamedAI(selectedText: string, onChunk: (chunk: string) => void) {
  const res = await fetch("/api/gemini", {
    method: "POST",
    body: JSON.stringify({ text: selectedText }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.body) throw new Error("No response body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    if (value) {
      onChunk(decoder.decode(value, { stream: true }));
    }
  }
}
