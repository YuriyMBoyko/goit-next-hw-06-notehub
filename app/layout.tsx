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

export default function RootLayout({ children }: LayoutProps<"/">) {
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
