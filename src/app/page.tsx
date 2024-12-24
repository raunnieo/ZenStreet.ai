import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ClientFormWrapper } from '@/components/ClientFormWrapper';

// Remove "use client" - this should be a server component
export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-16 flex items-center justify-center bg-background">
        <ClientFormWrapper />
      </main>
      <Footer />
    </>
  );
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
