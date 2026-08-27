/**
 * Numbers the home page quotes that aren't in the CV.
 *
 * The design mocked these as `[N]` placeholders. Rather than ship invented
 * figures, every value below is optional: leave one empty and the element that
 * would have shown it is dropped from the page. Fill one in and the sentence
 * or metric tile appears, with no markup changes.
 */
export const metrics = {
  /** e.g. "1,200": rendered as "{N} bookings a month" and as a HomeOS tile. */
  bookingsPerMonth: "",
  /** e.g. "180ms": p99 on the HomeOS booking endpoint. */
  bookingP99: "",
};

/**
 * Recruiter-facing links, same rule as `metrics`: an empty value means the
 * link simply isn't rendered, so nothing ships broken.
 */
export const links = {
  /** e.g. "https://www.linkedin.com/in/your-handle" */
  linkedin: "",
  /** Drop the PDF in `public/` and set this to e.g. "/olayiwola-odunsi-cv.pdf". */
  resume: "",
};

/**
 * Screenshots for the case studies. Drop files in `public/work/` and point at
 * them; until then each slot renders an empty placeholder.
 */
export const media = {
  homeos: "/homeos.png",
  itan: "/itan.png",
  khanzuo: "/khnazuo.png",
};
