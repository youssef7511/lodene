export const services = [
  {
    id: "massar",
    path: "/massar",
    brand: "massar",
    image: "/images/massar-quiz.webp",
    icon: "car",
    category: "driving",
  },
  {
    id: "conduite",
    path: "/lodene/conduite",
    brand: "lodene",
    image: "/images/backhoe.png",
    icon: "tractor",
    category: "driving",
  },
  {
    id: "vtc",
    path: "/lodene/vtc",
    brand: "lodene",
    image: "/images/vtc.webp",
    icon: "car",
    category: "professional",
    official: "https://lodene.fr/vtc",
  },
  {
    id: "sst",
    path: "/lodene/sst",
    brand: "lodene",
    image: "/images/sst.webp",
    icon: "heart",
    category: "professional",
    official: "https://lodene.fr/sst",
  },
  {
    id: "logistique",
    path: "/lodene/logistique",
    brand: "lodene",
    image: "/images/logistics.jpg",
    icon: "package",
    category: "professional",
    official: "https://lodene.fr/formations",
  },
  {
    id: "langues",
    path: "/lodene/langues",
    brand: "lodene",
    image: "/images/language-workshop.png",
    icon: "languages",
    category: "languages",
    official:
      "https://lodene.fr/cadre-europeen-commun-de-reference-pour-les-langues",
  },
];

export const equipment = [
  { id: "tractopelle", image: "/images/backhoe.png" },
  { id: "chariot", image: "/images/forklift.webp" },
  { id: "gerbeur", image: "/images/stacker.webp" },
  { id: "nacelle", image: "/images/platform.webp" },
];

export const lodene = {
  website: "https://lodene.fr",
  catalog: "https://lodene.fr/formations",
  portal: "https://lodene.fr/espace-eleve",
  email: "ae@lodene.fr",
  phone: "+33660325087",
  phoneLabel: "+33 6 60 32 50 87",
  address: "30 rue Pierre Le Guen, 78700 Conflans-Sainte-Honorine, France",
};

export function massarLink(base, role) {
  const url = new URL("/login", base || "http://localhost:3000");
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("Massar URL must use HTTP or HTTPS");
  url.searchParams.set("role", role);
  return url.href;
}
