import "./globals.css";
import { TransactionProvider } from "./context/TransactionContext";
import Navbar from "./components/navbar/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TransactionProvider>
          {/* Ana kapsayıcı div */}
          <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <header className="bg-gray-800 text-white shadow-md">
              <Navbar />
            </header>

            {/* Sayfa içeriği */}
            <main className="flex-grow bg-gray-100">
              {children}
            </main>
          </div>
        </TransactionProvider>
      </body>
    </html>
  );
}
