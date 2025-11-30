// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flood & Landslide SOS – Sri Lanka",
  description: "Emergency flood and landslide help portal for Sri Lanka",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FFF5F2] text-slate-900">
        <div className="min-h-screen flex justify-center">
          <main className="w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
