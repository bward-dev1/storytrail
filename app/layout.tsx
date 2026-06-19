import type { Metadata } from "next";
import PlausibleScript from "@/components/PlausibleScript";
import "./globals.css";

export const metadata: Metadata = {
  title: "StoryTrail – track the books you love",
  description:
    "A reading tracker built by kids, for kids. Log books, build streaks, share with your class.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <PlausibleScript />
      </body>
    </html>
  );
}