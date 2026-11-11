// Accent/case-insensitive "every word must match somewhere" search over a few text fields.
export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

export function matches(query: string, haystack: (string | null | undefined)[]): boolean {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const text = normalize(haystack.filter(Boolean).join(" "));
  return words.every((w) => text.includes(w));
}
