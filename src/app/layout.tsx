import { Poppins } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const font = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const logo = process.env.NEXT_PUBLIC_LOGO_URL;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>KAK Laporan Ponorogo</title>
        <meta name="description" content="Aplikasi KAK - Manrisk" />
        <link
          rel="icon"
          href={logo}
        />
      </head>
      <body
        className={`${font.className} antialiased`}
      >
        <div>
        <NextTopLoader color="orange"/>
          {children}
        </div>
      </body>
    </html>
  );
}
