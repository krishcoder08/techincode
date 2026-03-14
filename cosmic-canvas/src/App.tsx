import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages Imports
import Index from "./pages/Index";
import About from "./pages/About";
import Internships from "./pages/Internships";
import Apply from "./pages/Apply";
import Founders from "./pages/Founders";
import Certificate from "./pages/Certificate";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { AuthPage } from "./pages/AuthPage";
import AddInternship from "./pages/AddInternship"; // Naya Admin Page

// Context Import
import { AuthProvider } from "./context/AuthContext";

// QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Global Notifications */}
        <Toaster />
        <Sonner position="top-center" richColors closeButton /> 
        
        <BrowserRouter>
          {/* AuthProvider wraps everything to share user state */}
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/founders" element={<Founders />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin Protected Route */}
              <Route path="/admin/add" element={<AddInternship />} />

              {/* 404 Route - Always keep this at the end */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;