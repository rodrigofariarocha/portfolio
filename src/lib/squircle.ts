/**
 * The iOS "squircle" — a superellipse, not a rounded rectangle.
 *
 * `border-radius` joins straight edges to circular corners, and the eye catches
 * the seam where the curvature jumps. A superellipse has continuous curvature
 * all the way round, which is why Apple's icons and hardware use it and why the
 * shape reads as calm rather than merely rounded.
 *
 *   |x|^n + |y|^n = 1
 *
 * n = 2 is a circle; n → ∞ approaches a square. Apple's icon grid sits near 5.
 */
function superellipsePath(exponent: number, steps: number) {
  const points: string[] = [];

  for (let i = 0; i < steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const x = Math.sign(cos) * Math.abs(cos) ** (2 / exponent);
    const y = Math.sign(sin) * Math.abs(sin) ** (2 / exponent);

    // Map -1..1 onto a 0..100 box.
    points.push(`${(((x + 1) / 2) * 100).toFixed(3)},${(((y + 1) / 2) * 100).toFixed(3)}`);
  }

  return `M${points.join("L")}Z`;
}

const PATH = superellipsePath(5, 192);

/**
 * A CSS mask rather than an SVG `clipPath` reference: no DOM id to keep unique,
 * and it composites correctly under the portrait's 3D tilt.
 */
export const SQUIRCLE_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path d='${PATH}' fill='%23000'/></svg>`,
)}")`;

/** Spread onto any element to clip it to the squircle. */
export const squircleStyle = {
  WebkitMaskImage: SQUIRCLE_MASK,
  maskImage: SQUIRCLE_MASK,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
} as const;
