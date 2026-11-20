import AppShell from "../src/components/AppShell.jsx";
import "../src/styles.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5174";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Massar × LODENE — Choisissez votre parcours",
    template: "%s — Massar × LODENE",
  },
  description:
    "Découvrez les univers Massar et LODENE : code de la route, conduite automobile et d’engins, formations professionnelles et langues.",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    title: "Massar × LODENE — Choisissez votre parcours",
    description:
      "Code de la route, conduite, formations professionnelles et langues.",
    images: ["/images/driving.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Massar × LODENE — Choisissez votre parcours",
    description:
      "Code de la route, conduite, formations professionnelles et langues.",
    images: ["/images/driving.jpg"],
  },
  other: {
    "page-type": "service",
    "site-kind": "other",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fbfcfe",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      dir="ltr"
      data-type="service"
      data-radius="soft"
      data-buttons="solid"
      suppressHydrationWarning
    >
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
