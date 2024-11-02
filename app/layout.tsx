import React from 'react';
import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: 'Wraply - track, secure and monetize your links effortlessly',
  description: 'Create branded short links, gain insights with powerful analytics, secure your content, and earn from every click',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        // className={cn(
        //   "min-h-screen bg-background font-sans antialiased",
        // )}
      >
        {children}
      </body>
    </html>
  );
}
