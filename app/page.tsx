/**
 * ALIEN DESIGN SYSTEM — Home Page
 *
 * Página inicial do Design System
 * Demonstra os tokens e componentes
 */

import { Button } from '@/components/atoms/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-primary">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-3xl">
          {/* Overline */}
          <span className="text-xs font-semibold uppercase tracking-widest text-accent-500">
            Design System
          </span>

          {/* Title */}
          <h1 className="mt-4 font-heading text-5xl font-bold leading-tight text-neutral-100">
            Alien Design System
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            Sistema de design acessível, escalável e baseado em Atomic Design.
            Construído com React, TypeScript, Tailwind CSS e muito amor por
            detalhes.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg">Começar agora</Button>
            <Button variant="secondary" size="lg">
              Ver documentação
            </Button>
          </div>
        </div>
      </section>

      {/* Tokens Preview */}
      <section className="border-t border-border-subtle bg-background-secondary py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-2xl font-semibold text-neutral-100">
            Design Tokens
          </h2>

          {/* Colors */}
          <div className="mt-8">
            <h3 className="text-sm font-medium uppercase tracking-wide text-neutral-600">
              Cores Primárias
            </h3>
            <div className="mt-4 flex gap-2">
              {[900, 700, 500, 400, 300].map((shade) => (
                <div
                  key={shade}
                  className={`h-12 w-12 rounded-lg bg-primary-${shade}`}
                  title={`primary-${shade}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium uppercase tracking-wide text-neutral-600">
              Cores Accent
            </h3>
            <div className="mt-4 flex gap-2">
              {[700, 500, 400, 300, 200].map((shade) => (
                <div
                  key={shade}
                  className={`h-12 w-12 rounded-lg bg-accent-${shade}`}
                  title={`accent-${shade}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium uppercase tracking-wide text-neutral-600">
              Cores Aurora
            </h3>
            <div className="mt-4 flex gap-2">
              {[700, 500, 400, 300, 200].map((shade) => (
                <div
                  key={shade}
                  className={`h-12 w-12 rounded-lg bg-aurora-${shade}`}
                  title={`aurora-${shade}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Components Preview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-2xl font-semibold text-neutral-100">
            Componentes
          </h2>

          {/* Buttons */}
          <div className="mt-8">
            <h3 className="text-sm font-medium uppercase tracking-wide text-neutral-600">
              Botões
            </h3>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="link">Link</Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Button loading loadingText="Salvando...">
                Salvar
              </Button>
              <Button disabled>Desabilitado</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-subtle py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-neutral-600">
            Alien Design System v0.1.0 — Criado por Aline Barbosa
          </p>
        </div>
      </footer>
    </div>
  );
}
