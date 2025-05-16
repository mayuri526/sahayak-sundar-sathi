
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Calendar, FileText, MapPin, User, LogOut } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

type UserData = {
  name: string;
  role: string;
  id: string;
};

const Dashboard = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [upcomingReminders, setUpcomingReminders] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      navigate('/login');
    }

    // Initialize with empty reminders instead of mock data
    setUpcomingReminders([]);
  }, [navigate]);

  const handleAddReminder = () => {
    navigate('/dashboard/reminders');
  };

  const handleSOS = () => {
    toast.error('Emergency alert sent to all your emergency contacts!');
  };

  if (!user) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            नमस्ते (Namaste), {user.name}!
          </h1>
          <p className="text-gray-600">Welcome to your care dashboard</p>
        </div>
        
        <button 
          onClick={handleSOS}
          className="btn-emergency mt-4 md:mt-0 flex items-center gap-2 animate-pulse-slow"
        >
          <span className="h-3 w-3 rounded-full bg-white"></span>
          Emergency SOS
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-care-blue/90 to-care-blue text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{upcomingReminders.length}</p>
            <p className="text-sm opacity-90">Today's reminders</p>
          </CardContent>
          <CardFooter>
            <button 
              className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
              onClick={handleAddReminder}
            >
              Manage reminders
            </button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-care-orange/90 to-care-orange text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Medical Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm opacity-90">Health records</p>
          </CardContent>
          <CardFooter>
            <button 
              className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
              onClick={() => navigate('/dashboard/medical-history')}
            >
              View records
            </button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-care-purple/90 to-care-purple text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm opacity-90">Upcoming appointments</p>
          </CardContent>
          <CardFooter>
            <button 
              className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
              onClick={() => navigate('/dashboard/reminders')}
            >
              Schedule new
            </button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-care-teal/90 to-care-teal text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Nearby Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm opacity-90">Healthcare facilities nearby</p>
          </CardContent>
          <CardFooter>
            <button 
              className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
              onClick={() => navigate('/dashboard/location-services')}
            >
              View map
            </button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your reminders and appointments for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingReminders.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  No reminders for today
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button 
                className="p-4 border rounded-lg hover:bg-muted transition-colors flex flex-col items-center justify-center gap-2 text-center"
                onClick={() => navigate('/dashboard/reminders')}
              >
                <Bell className="h-6 w-6 text-care-blue" />
                <span className="text-sm">Set Reminder</span>
              </button>
              
              <button 
                className="p-4 border rounded-lg hover:bg-muted transition-colors flex flex-col items-center justify-center gap-2 text-center"
                onClick={() => navigate('/dashboard/medical-history')}
              >
                <FileText className="h-6 w-6 text-care-orange" />
                <span className="text-sm">Add Medical Record</span>
              </button>
              
              <button 
                className="p-4 border rounded-lg hover:bg-muted transition-colors flex flex-col items-center justify-center gap-2 text-center"
                onClick={() => navigate('/dashboard/emergency-sos')}
              >
                <span className="h-3 w-3 rounded-full bg-destructive"></span>
                <span className="text-sm">Configure SOS</span>
              </button>
              
              <button 
                className="p-4 border rounded-lg hover:bg-muted transition-colors flex flex-col items-center justify-center gap-2 text-center"
                onClick={() => navigate('/dashboard/location-services')}
              >
                <MapPin className="h-6 w-6 text-care-purple" />
                <span className="text-sm">Find Nearby</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
