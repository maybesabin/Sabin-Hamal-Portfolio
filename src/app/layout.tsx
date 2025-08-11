import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import icon from "../assets/logo.png"
import pfp from "../assets/pfp.jpg"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: [
    "100", "200", "300", "400", "500", "600", "700", "800", "900"
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sabinhamal.com.np"),
  title: "Sabin Hamal | Fullstack Developer",
  description:
    "Portfolio of Sabin Hamal, a passionate fullstack developer specializing in Frontend Development. Explore my projects, skills, and contact details.",
  icons: [icon.src],
  keywords: [
    "Sabin Hamal",
    "Fullstack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "UI/UX Designer",
    "Portfolio Website",
    "Web Developer Nepal",
  ],
  authors: [{ name: "Sabin Hamal", url: "https://sabinhamal.com.np" }],
  openGraph: {
    title: "Sabin Hamal | Fullstack Developer",
    description:
      "Explore my portfolio showcasing modern web applications, landing pages, and e-commerce sites.",
    url: "https://sabinhamal.com.np",
    siteName: "Sabin Hamal Portfolio",
    images: [
      {
        url: pfp.src,
        width: 1200,
        height: 630,
        alt: "Sabin Hamal Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
