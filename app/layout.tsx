import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WeatherGPT — Conversational Meteorological Intelligence',
  description: 'AI-Powered Conversational Weather Forecasting, Disaster Warnings, and Decision Support Platform. Smart India Hackathon 2026 (SIH26068).',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="min-h-screen antialiased bg-slate-950 text-slate-100 ambient-gradient selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
