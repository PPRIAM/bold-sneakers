import type { Metadata } from "next";
import "./globals.css";
import TransitionWrapper from "@/components/TransitionWrapper";
import { AppProvider } from "@/context/AppContext";
import CartModal from "@/components/CartModal";

export const metadata: Metadata = {
  title: {
    default: "B0LD | Precision Footwear for the Urban Explorer",
    template: "%s | B0LD"
  },
  description: "Experience b0ldness in every step. Premium high-performance sneakers engineered for the future of athletic footwear.",
  keywords: ["sneakers", "high-performance", "athletic footwear", "b0ld", "urban explorer", "limited edition"],
  authors: [{ name: "B0LD Team" }],
  creator: "B0LD",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://b0ld-sneakers.com",
    title: "B0LD | Precision Footwear",
    description: "Experience b0ldness in every step. Premium high-performance sneakers for the urban explorer.",
    siteName: "B0LD",
  },
  twitter: {
    card: "summary_large_image",
    title: "B0LD | Precision Footwear",
    description: "Experience b0ldness in every step. Premium high-performance sneakers for the urban explorer.",
    creator: "@b0ld_sneakers",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-primary selection:text-white bg-black">
        <div className="grain" />
        <AppProvider>
          <TransitionWrapper>
            {children}
          </TransitionWrapper>
          <CartModal />
        </AppProvider>
      </body>
    </html>
  );
}
