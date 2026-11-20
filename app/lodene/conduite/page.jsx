import Conduite from "../../../src/views/Conduite.jsx";
import fr from "../../../src/i18n/fr.js";

export const metadata = {
  title: fr.services.conduite.title,
  description: fr.services.conduite.description,
};

export default function ConduitePage() {
  return <Conduite />;
}
