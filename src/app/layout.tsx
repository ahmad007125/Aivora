import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProviderClient } from "@/components/ThemeProviderClient";
// import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aivora",
  description: "Minimal Aivora using Next.js + Tailwind + Shadcn UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground flex flex-col justify-between min-h-screen`}>
        <ThemeProviderClient>
          <div>
            <Header />
            <main className="container mx-auto px-4 py-6 max-w-6xl">
              {/* <PageTransition>{children}</PageTransition> */}
              {children}
            </main>
          </div>
          <Footer />
        </ThemeProviderClient>
      </body>
    </html>
  );
}
