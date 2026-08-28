const MAX_CHARS = 220;

export function chunkText(text: string): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const sentences = clean.match(/[^.!?।\n]+[.!?।\n]*/g) ?? [clean];
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if (sentence.length > MAX_CHARS) {
      if (current.trim()) chunks.push(current.trim());
      current = "";
      for (let i = 0; i < sentence.length; i += MAX_CHARS) {
        chunks.push(sentence.slice(i, i + MAX_CHARS));
      }
      continue;
    }
    if (current.length + sentence.length > MAX_CHARS) {
      if (current.trim()) chunks.push(current.trim());
      current = "";
    }
    current += sentence;
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.slice(0, 8);
}
