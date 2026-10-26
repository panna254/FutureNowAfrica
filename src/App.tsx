import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useRoute } from '@/router-state';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ProgramsPage } from '@/pages/ProgramsPage';
import { ImpactPage } from '@/pages/ImpactPage';
import { GetInvolvedPage } from '@/pages/GetInvolvedPage';
import { NewsPage } from '@/pages/NewsPage';
import { ContactPage } from '@/pages/ContactPage';

function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="type-meta text-leaf-600 mb-3">
          404
        </p>
        <h1 className="text-page text-forest-900">Page not found</h1>
        <p className="mt-4 text-body text-forest-700/80">
          The page you are looking for does not exist. Use the navigation above
          to find what you need.
        </p>
      </div>
    </section>
  );
}

function App() {
  const path = useRoute();

  const renderPage = () => {
    switch (path) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/programs':
        return <ProgramsPage />;
      case '/impact':
        return <ImpactPage />;
      case '/get-involved':
        return <GetInvolvedPage />;
      case '/news':
        return <NewsPage />;
      case '/contact':
        return <ContactPage />;
      default:
        return <NotFound />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-60 focus:rounded-lg focus:bg-forest-800 focus:text-cream focus:px-4 focus:py-2 focus:text-ui"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
