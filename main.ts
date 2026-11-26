import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Spec: one line plus a single trailing newline, 1..200 characters total.
const MAX_CHARS = 200;

// Setup: the everyday annoyance of mismatched earbud batteries.
const SETUP =
  "My earbuds never die together: the left sits smug at 82% while the right quits at noon";
// Punchline: reframe the faulty bud as a coworker.
const PUNCHLINE =
  "I didn't buy stereo sound, I adopted a coworker who clocks out early.";
const ENTRY = `${SETUP} — ${PUNCHLINE}`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const content = ENTRY + "\n";

// Guard: no embedded line terminators (including Unicode ones).
if (/[\r\n\u0085\u2028\u2029]/.test(ENTRY)) {
  throw new Error("Entry must be a single line");
}
// Guard: the line itself must carry visible text.
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be empty");
}
// Guard: count code points (not UTF-16 units), newline included.
const length = [...content].length;
if (length < 1 || length > MAX_CHARS) {
  throw new Error(`Entry length ${length} out of range 1..${MAX_CHARS}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), content, "utf8");
