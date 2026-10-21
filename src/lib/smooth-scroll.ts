// Frame-based eased scroll. The target position is re-read every frame, so
// the scroll still lands cleanly when layout above the target is animating
// (for example the unpicked team half collapsing). Respects reduced motion.

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

export function smoothScrollTo(
  target: HTMLElement,
  { duration = 1100, offset = 0 }: { duration?: number; offset?: number } = {}
): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targetY = () => target.getBoundingClientRect().top + window.scrollY - offset;

  if (reduce) {
    window.scrollTo(0, targetY());
    return;
  }

  const startY = window.scrollY;
  const startTime = performance.now();

  function step(now: number) {
    const t = Math.min(1, (now - startTime) / duration);
    const y = startY + (targetY() - startY) * easeOutQuint(t);
    window.scrollTo(0, y);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
