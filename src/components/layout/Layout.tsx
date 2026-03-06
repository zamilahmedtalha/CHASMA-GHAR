import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import LoadingScreen from '../LoadingScreen';
import FluidBackground from '../FluidBackground';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col text-white relative selection:bg-[#6E60EE] selection:text-white">
      <LoadingScreen />
      <FluidBackground />
      <Header />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
