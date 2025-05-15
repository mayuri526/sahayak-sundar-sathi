
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import CaretakerPortal from "./pages/CaretakerPortal";
import NotFound from "./pages/NotFound";

// Dashboard components
import MedicalHistory from "./components/dashboard/MedicalHistory";
import Reminders from "./components/dashboard/Reminders";
import EmergencySOS from "./components/dashboard/EmergencySOS";
import LocationServices from "./components/dashboard/LocationServices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/caretaker-portal" element={<CaretakerPortal />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<PatientDashboard />}>
            <Route path="medical-history" element={<MedicalHistory />} />
            <Route path="reminders" element={<Reminders />} />
            <Route path="emergency-sos" element={<EmergencySOS />} />
            <Route path="location-services" element={<LocationServices />} />
          </Route>
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
