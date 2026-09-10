/**
 * The RR monogram.
 *
 * Two geometric R's — straight stem, half-circle bowl, diagonal leg — set at a
 * ligature-tight pitch so the first letter's leg meets the second one's stem
 * and the pair reads as one mark. Drawn as strokes rather than set as text, so
 * it keeps its weight at 28px in the header instead of thinning out.
 *
 * The viewBox is cropped to the artwork; size it with a height and let the
 * width follow.
 */
const STEM_TO_LEG = 9;
const PITCH = 10;

function letter(x: number) {
  return [
    `M${x},26 V6`, // stem
    `H${x + 3.5}`, // top arm
    `A5,5 0 0 1 ${x + 3.5},16`, // bowl
    `H${x}`, // back to the stem
    `M${x + 3.2},16 L${x + STEM_TO_LEG - 1},26`, // leg
  ].join(" ");
}

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 22.4 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="RR"
      className={className}
    >
      <path d={letter(1.2)} />
      <path d={letter(1.2 + PITCH)} />
    </svg>
  );
}
