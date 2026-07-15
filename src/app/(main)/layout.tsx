import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({
  children,
}: Readonly<MainLayoutProps>) => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 transition-colors duration-300 dark:bg-black dark:text-neutral-100">
      <Navbar />

      <main className="min-h-0 flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;