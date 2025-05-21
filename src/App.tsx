
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import AdminLogin from "./components/AdminLogin";
import AdminProperties from "./pages/admin/AdminProperties";

const queryClient = new QueryClient();

// Simple layout wrapper that excludes Navbar and Footer for admin routes
const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

// Standard layout with Navbar and Footer
const StandardLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
    <WhatsAppButton />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-dark text-white">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout><AdminLogin /></AdminLayout>} />
            <Route path="/admin/properties" element={<AdminLayout><AdminProperties /></AdminLayout>} />
            
            {/* Standard Routes */}
            <Route path="/" element={<StandardLayout><Index /></StandardLayout>} />
            <Route path="/properties" element={<StandardLayout><Properties /></StandardLayout>} />
            <Route path="/property/:id" element={<StandardLayout><PropertyDetail /></StandardLayout>} />
            <Route path="/about" element={<StandardLayout><About /></StandardLayout>} />
            <Route path="/contact" element={<StandardLayout><Contact /></StandardLayout>} />
            <Route path="*" element={<StandardLayout><NotFound /></StandardLayout>} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
