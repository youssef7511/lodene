import { massarLink } from "./catalog.js";

const massarBase =
  process.env.NEXT_PUBLIC_MASSAR_URL || "http://localhost:3000";
export const candidateUrl = massarLink(massarBase, "candidat");
export const schoolUrl = massarLink(massarBase, "auto-ecole");
