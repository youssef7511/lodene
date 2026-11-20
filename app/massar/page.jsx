import Massar from "../../src/views/Massar.jsx";
import fr from "../../src/i18n/fr.js";

export const metadata = {
  title: fr.services.massar.title,
  description: fr.services.massar.description,
};

export default function MassarPage() {
  return <Massar />;
}
