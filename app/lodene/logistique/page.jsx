import Service from "../../../src/views/Service.jsx";
import { services } from "../../../src/data/catalog.js";
import fr from "../../../src/i18n/fr.js";

const service = services.find(({ id }) => id === "logistique");

export const metadata = {
  title: fr.services.logistique.title,
  description: fr.services.logistique.description,
};

export default function LogistiquePage() {
  return <Service service={service} />;
}
