import Service from "../../../src/views/Service.jsx";
import { services } from "../../../src/data/catalog.js";
import fr from "../../../src/i18n/fr.js";

const service = services.find(({ id }) => id === "langues");

export const metadata = {
  title: fr.services.langues.title,
  description: fr.services.langues.description,
};

export default function LanguesPage() {
  return <Service service={service} />;
}
