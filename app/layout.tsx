import type { Metadata } from "next";
import { IBM_Plex_Sans, Unbounded } from "next/font/google";
import { ControlDock } from "@/components/ControlDock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const display = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Lumenred — Red Light Therapy Equipment",
    template: "%s · Lumenred",
  },
  description:
    "Infrared chamber equipment for home and studio: panels, masks, wraps, and multi-panel systems. Specified by wavelength, LED count, and power class.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">
        <CartProvider>
          <div className="lab">
            <div className="ember-slit" aria-hidden />
            <Header />
            <main className="lab-stage">{children}</main>
            <Footer />
            <ControlDock />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
