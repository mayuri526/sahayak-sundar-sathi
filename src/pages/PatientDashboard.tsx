
import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Dashboard from '@/components/dashboard/Dashboard';
import { Bell, FileText, Calendar, Map, User, LogOut } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  // If we're on the main dashboard path, render the Dashboard component
  if (location.pathname === '/dashboard') {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Navigation Header */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center md:hidden">
        <h1 className="text-xl font-bold text-care-blue">SahayakApp</h1>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col p-2">
            <button 
              onClick={() => {
                navigate('/dashboard');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100"
            >
              <User className="h-5 w-5 text-gray-600" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => {
                navigate('/dashboard/reminders');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-md ${
                isCurrentPath('/dashboard/reminders') ? 'bg-care-blue/10 text-care-blue' : 'hover:bg-gray-100'
              }`}
            >
              <Bell className="h-5 w-5" />
              <span>Reminders</span>
            </button>
            <button 
              onClick={() => {
                navigate('/dashboard/medical-history');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-md ${
                isCurrentPath('/dashboard/medical-history') ? 'bg-care-blue/10 text-care-blue' : 'hover:bg-gray-100'
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>Medical History</span>
            </button>
            <button 
              onClick={() => {
                navigate('/dashboard/emergency-sos');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-md ${
                isCurrentPath('/dashboard/emergency-sos') ? 'bg-care-blue/10 text-care-blue' : 'hover:bg-gray-100'
              }`}
            >
              <span className="h-3 w-3 rounded-full bg-destructive"></span>
              <span>Emergency SOS</span>
            </button>
            <button 
              onClick={() => {
                navigate('/dashboard/location-services');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-md ${
                isCurrentPath('/dashboard/location-services') ? 'bg-care-blue/10 text-care-blue' : 'hover:bg-gray-100'
              }`}
            >
              <Map className="h-5 w-5" />
              <span>Nearby Services</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 text-destructive"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation (Desktop) */}
        <div className="hidden md:flex md:w-64 bg-white border-r flex-col">
          <div className="p-6">
            <h1 className="text-xl font-bold text-care-blue">SahayakApp</h1>
            <p className="text-sm text-gray-500">Elder Care Companion</p>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-gray-100"
            >
              <User className="h-5 w-5 text-gray-600" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => navigate('/dashboard/reminders')}
              className={`w-full flex items-center gap-3 p-3 rounded-md ${
                isCurrentPath('/dashboard/reminders') ? 'bg-care-blue/10 text-care-blue' : 'hover:bg-gray-100'
              }`}
            >
              <Bell className="h-5 w-5" />
              <span>Reminders</span>
            </button>
            <button 
              onClick={() => navigate('/dashboard/medical-history')}
              className={`w-full flex items-center gap-3 p-3 rounded-md ${
                isCurrentPath('/dashboard/medical-history') ? 'bg-care-blue/10 text-care-blue' : 'hover:bg-gray-100'
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>Medical History</span>
            </button>
            <button 
              onClick={() => navigate('/dashboard/emergency-sos')}
              className={`w-full flex items-center gap-3 p-3 rounded-md ${
                isCurrentPath('/dashboard/emergency-sos') ? 'bg-care-blue/10 text-care-blue' : 'hover:bg-gray-100'
              }`}
            >
              <span className="h-3 w-3 rounded-full bg-destructive"></span>
              <span>Emergency SOS</span>
            </button>
            <button 
              onClick={() => navigate('/dashboard/location-services')}
              className={`w-full flex items-center gap-3 p-3 rounded-md ${
                isCurrentPath('/dashboard/location-services') ? 'bg-care-blue/10 text-care-blue' : 'hover:bg-gray-100'
              }`}
            >
              <Map className="h-5 w-5" />
              <span>Nearby Services</span>
            </button>
          </nav>
          <div className="p-4 border-t">
            <Button 
              onClick={handleLogout}
              className="w-full flex items-center gap-2 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto pb-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
