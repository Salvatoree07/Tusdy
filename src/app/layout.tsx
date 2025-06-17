import type { Metadata } from "next"; //importazione del tipo metdata
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


//l'istruzione sottostante assegna alla variabile --font-geist-sans l'oggetto geist che rappresenta il font utilizzato
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], //serve per caricare le sotofamiglie di font latini
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// i metadata sono delle informazione utili a descrivere la pagina, ci sono quelli base e quelli aggiuntivi
// openGraph è un noe di un portocollo ideato da facebook per regolare l'insieme di informazione che appaiano quando condividiamo la pagina sui social
export const metadata: Metadata = {
  title: "Tusdy",
  description: "A new and attractive dashboard for techcommerce workers",
  openGraph: {
    title: "Dashboard for workers",
    description: "Discover the new features of this dashboard",
    url: "https://techcommerce.com",
    images: [
      {
        url: "https://techcommerce/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Preview of Page of Dashboard project",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="it">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`} //serve per assegnare uffiacialmente i font alla pagina web
            //antialiased è una classe tailwind che migliora al visualizzazione dei componenti creati creando un effetto di morbidezza visiva 
          >
                <main>
                  {children}
                </main>
          </body>
      </html>
    );
}