import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Inter as FontSans } from "next/font/google";
import type { Metadata } from 'next'

import "./styles/globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface Props {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: 'DrPhysio - Your Personal AI Physiotherapist',
  description: 'Get personalized physiotherapy assessments and treatment plans with DrPhysio, your AI-powered physiotherapy assistant.',
  keywords: 'physiotherapy, AI, health, wellness, rehabilitation, physical therapy',
  openGraph: {
    title: 'DrPhysio - Your Personal AI Physiotherapist',
    description: 'Get personalized physiotherapy assessments and treatment plans with DrPhysio.',
    type: 'website',
    url: 'https://drphysio.co',
    images: [
      {
        url: "/physio_logo.webp"
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@drphysio',
    title: 'DrPhysio - Your Personal AI Physiotherapist',
    description: 'Get personalized physiotherapy assessments and treatment plans with DrPhysio.',
    images: [
      {
        url: "/physio_logo.webp"
      },
    ],
  },
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href="https://www.physioai.com" />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
