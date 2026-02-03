import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import './layout.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Hospital Management',
  description: 'Hospital Patient System',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="layoutWrapper">
          <Navbar />
          <main className="mainContent">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
