import Service from "../../../src/views/Service.jsx";
import { services } from "../../../src/data/catalog.js";
import fr from "../../../src/i18n/fr.js";

const service = services.find(({ id }) => id === "vtc");

export const metadata = {
  title: fr.services.vtc.title,
  description: fr.services.vtc.description,
};

export default function VtcPage() {
  return <Service service={service} />;
}
