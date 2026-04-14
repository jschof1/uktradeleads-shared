import type { LayoutProps } from "../types";

export const Layout = ({
  children,
  TopBar: TopBarComponent,
  Header,
  Footer,
  showSkipLink = true,
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showSkipLink && (
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Skip to main content
        </a>
      )}
      {TopBarComponent && <TopBarComponent />}
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};
