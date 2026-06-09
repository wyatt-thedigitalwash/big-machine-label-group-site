import { article as jackWharffOpryDebut } from "./articles/jack-wharff-band-grand-ole-opry-debut";
import { article as rascalFlattsBridgestone } from "./articles/rascal-flatts-bridgestone-arena-2026";
import { article as jackWharffEpStrange } from "./articles/jack-wharff-band-ep-strange-march-13";
import { article as rascalFlattsRevUp } from "./articles/rascal-flatts-life-is-a-highway-tour-2026";
import { article as jackWharffOpryAnnouncement } from "./articles/jack-wharff-band-opry-debut-announcement";
import { article as bmlgCma2025 } from "./articles/bmlg-cma-awards-2025";

export const articles = [
  jackWharffOpryDebut,
  rascalFlattsBridgestone,
  jackWharffEpStrange,
  rascalFlattsRevUp,
  jackWharffOpryAnnouncement,
  bmlgCma2025,
];

export type Article = typeof articles[0];
