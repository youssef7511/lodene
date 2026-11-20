import Service from "../../../src/views/Service.jsx";
import { services } from "../../../src/data/catalog.js";
import fr from "../../../src/i18n/fr.js";

const service = services.find(({ id }) => id === "sst");

export const metadata = {
  title: fr.services.sst.title,
  description: fr.services.sst.description,
};

export default function SstPage() {
  return <Service service={service} />;
}
