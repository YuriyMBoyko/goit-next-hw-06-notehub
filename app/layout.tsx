import type { Metadata } from "next";
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import 'modern-normalize/modern-normalize.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub react.js+next.js application",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
            {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
