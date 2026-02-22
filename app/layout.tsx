/**
 * ALIEN DESIGN SYSTEM — Root Layout
 */

import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Alien Design System',
  description: 'Sistema de design acessível, escalável e baseado em Atomic Design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-background-primary text-foreground-primary min-h-screen antialiased">
        {/* Skip link para acessibilidade */}
        <a
          href="#main-content"
          className="skip-link focus-ring"
        >
          Pular para o conteúdo principal
        </a>

        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
