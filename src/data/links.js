import { massarLink } from "./catalog.js";

const massarBase = import.meta.env?.VITE_MASSAR_URL || "http://localhost:3000";
export const candidateUrl = massarLink(massarBase, "candidat");
export const schoolUrl = massarLink(massarBase, "auto-ecole");
