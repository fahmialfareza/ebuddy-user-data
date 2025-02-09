import { ReactNode } from "react";
import Head from "next/head";
import Providers from "./providers";
import Navbar from "../components/Header/Navbar";
import SnackbarToast from "../components/Toast/SnackbarToast";

export const metadata = {
  title: "Ebuddy User Data",
  description: "Ebuddy user data built by Next.js App with Redux and Firebase",
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

          <SnackbarToast />
        </Providers>
      </body>
    </html>
  );
}
