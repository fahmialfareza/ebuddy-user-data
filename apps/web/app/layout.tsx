import { ReactNode } from "react";
import Head from "next/head";
import Providers from "./providers";
import Navbar from "../components/Header/Navbar";

export const metadata = {
  title: "My App",
  description: "Next.js App with Redux and Firebase",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="emotion-insertion-point"
          content="emotion-insertion-point"
        />
      </Head>

      <body>
        <Providers>
          <Navbar />

          {children}
        </Providers>
      </body>
    </html>
  );
}
