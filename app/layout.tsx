import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Inter as FontSans } from "next/font/google";

import "./styles/globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
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
