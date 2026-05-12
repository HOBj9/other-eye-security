/** Minimal class joiner (spec `cn`; add tailwind-merge later if needed). */
export function cn(...inputs: Array<string | undefined | false | null>) {
  return inputs.filter(Boolean).join(' ');
}
