import { EB_Garamond, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

const grotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-grotesk",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Let'em Know® | Founder-led Creative Agency",
  description:
    "Strategy, identity, campaigns, and founder-led content from a creative studio that understands the feed and the room. Based in Gurgaon, India.",
  keywords: [
    "creative agency",
    "founder-led",
    "brand strategy",
    "content",
    "Gurgaon",
    "India",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${garamond.variable} ${grotesk.variable} ${mono.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
        />
      </head>
      <body className="font-grotesk bg-background-paper text-text-ink overflow-x-hidden">
        <SmoothScroll />
        <CustomCursor />
        <Header />
        <div className="pt-[72px]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
