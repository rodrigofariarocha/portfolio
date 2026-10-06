import { Logo } from "@/components/ui/logo";
import { site } from "@/content/site";

/**
 * Plays once per browser session, before anything else paints. Without this
 * script the intro would replay on every full page load, which is fine the
 * first time and tiresome on the fifth. It runs inline, ahead of the markup it
 * hides, so a returning visitor never sees a frame of it.
 */
const ONCE_PER_SESSION = `try{var k="intro-played";if(sessionStorage.getItem(k))document.documentElement.setAttribute("data-intro-played","");else sessionStorage.setItem(k,"1")}catch(e){}`;

/**
 * The entry sequence: the RR monogram draws itself stroke by stroke in the
 * middle of the screen with the name underneath, then glides up into its slot
 * in the nav bar while the page fades in around it — and hands over to the
 * nav's own logo, which has been waiting invisibly in exactly that spot.
 *
 * Entirely CSS — keyframes in globals.css. Nothing waits on hydration, so it
 * starts on first paint, still plays with JavaScript off, and is skipped
 * outright under prefers-reduced-motion.
 *
 * Decorative only: hidden from assistive tech, and it never takes a click
 * once it has faded.
 */
export function Intro({ role }: { role: string }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: ONCE_PER_SESSION }} />
      <div className="intro" aria-hidden>
        <div className="intro-veil" />
        <div className="intro-stage">
          <Logo className="intro-mark" />
          <p className="intro-name">
            <span className="block text-[15px] font-semibold tracking-[-0.01em]">
              {site.name}
            </span>
            <span className="mt-0.5 block text-[13px] text-text-muted">{role}</span>
          </p>
        </div>
      </div>
    </>
  );
}
