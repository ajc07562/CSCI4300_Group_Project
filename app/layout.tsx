// app/layout.tsx
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClientLayout from '../components/ClientLayout';

export const metadata = {
  title: 'Campus Cravings',
  description: 'Affordable, easy-to-make recipes tailored for UGA students in dorms and small kitchens.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <>
            <Header />
            <main>{children}</main>
            <Footer />
          </>
        </ClientLayout>
      </body>
    </html>
  );
}


