import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Calendar } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

type Reminder = {
  id: string;
  title: string;
  type: 'medication' | 'appointment' | 'activity' | 'other';
  time: string;
  date: string;
  recurring: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly';
  notes?: string;
};

type Appointment = {
  id: string;
  title: string;
  doctor: string;
  facility: string;
  time: string;
  date: string;
  notes?: string;
};

const Reminders = () => {
  const [activeTab, setActiveTab] = useState('reminders');
  // Initialize with empty arrays instead of mock data
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  // Form states
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    title: '',
    type: 'medication',
    time: '08:00',
    date: new Date().toISOString().split('T')[0],
    recurring: false,
  });
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    title: '',
    doctor: '',
    facility: '',
    time: '09:00',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmitReminder = (e: React.FormEvent) => {
    e.preventDefault();
    
    const reminder: Reminder = {
      ...newReminder as Reminder,
      id: Date.now().toString(),
    };
    
    setReminders([reminder, ...reminders]);
    setShowReminderForm(false);
    setNewReminder({
      title: '',
      type: 'medication',
      time: '08:00',
      date: new Date().toISOString().split('T')[0],
      recurring: false,
    });
    
    toast.success('Reminder set successfully!');
  };

  const handleSubmitAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const appointment: Appointment = {
      ...newAppointment as Appointment,
      id: Date.now().toString(),
    };
    
    setAppointments([appointment, ...appointments]);
    setShowAppointmentForm(false);
    setNewAppointment({
      title: '',
      doctor: '',
      facility: '',
      time: '09:00',
      date: new Date().toISOString().split('T')[0],
    });
    
    toast.success('Appointment scheduled successfully!');
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    toast.success('Reminder deleted successfully!');
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
    toast.success('Appointment canceled successfully!');
  };

  const getIconForReminderType = (type: string) => {
    switch (type) {
      case 'medication':
        return <div className="h-10 w-10 rounded-full bg-care-blue/20 flex items-center justify-center text-care-blue">
          <Bell className="h-5 w-5" />
        </div>;
      case 'appointment':
        return <div className="h-10 w-10 rounded-full bg-care-orange/20 flex items-center justify-center text-care-orange">
          <Calendar className="h-5 w-5" />
        </div>;
      case 'activity':
        return <div className="h-10 w-10 rounded-full bg-care-teal/20 flex items-center justify-center text-care-teal">
          <Bell className="h-5 w-5" />
        </div>;
      default:
        return <div className="h-10 w-10 rounded-full bg-care-purple/20 flex items-center justify-center text-care-purple">
          <Bell className="h-5 w-5" />
        </div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="h-7 w-7 text-care-blue" />
            Reminders & Appointments
          </h1>
          <p className="text-gray-600">Manage your medication reminders and doctor appointments</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="reminders">Daily Reminders</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reminders" className="mt-4">
          <div className="flex justify-end mb-4">
            <Button 
              onClick={() => setShowReminderForm(!showReminderForm)}
              className="bg-care-blue hover:bg-care-blue/90"
            >
              {showReminderForm ? 'Cancel' : 'Add New Reminder'}
            </Button>
          </div>

          {showReminderForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Set New Reminder</CardTitle>
                <CardDescription>Create a new reminder for medications or activities</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReminder} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Reminder Title</Label>
                    <Input
                      id="title"
                      placeholder="E.g., Take Blood Pressure Medicine"
                      value={newReminder.title}
                      onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Reminder Type</Label>
                    <select
                      id="type"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={newReminder.type}
                      onChange={(e) => setNewReminder({...newReminder, type: e.target.value as any})}
                      required
                    >
                      <option value="medication">Medication</option>
                      <option value="appointment">Appointment</option>
                      <option value="activity">Activity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newReminder.date}
                        onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newReminder.time}
                        onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="recurring"
                      checked={newReminder.recurring}
                      onChange={(e) => setNewReminder({...newReminder, recurring: e.target.checked})}
                      className="h-4 w-4 rounded border-gray-300 text-care-blue focus:ring-care-blue"
                    />
                    <Label htmlFor="recurring">Recurring Reminder</Label>
                  </div>
                  
                  {newReminder.recurring && (
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <select
                        id="frequency"
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={newReminder.frequency || 'daily'}
                        onChange={(e) => setNewReminder({...newReminder, frequency: e.target.value as any})}
                        required
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <textarea
                      id="notes"
                      className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2"
                      placeholder="Additional instructions or notes"
                      value={newReminder.notes || ''}
                      onChange={(e) => setNewReminder({...newReminder, notes: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-care-blue hover:bg-care-blue/90"
                    >
                      Save Reminder
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {reminders.length > 0 ? (
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <Card key={reminder.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {getIconForReminderType(reminder.type)}
                      <div className="flex-grow">
                        <h3 className="font-medium text-lg">{reminder.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground gap-2">
                          <span>{reminder.time}</span>
                          {reminder.recurring && (
                            <span className="bg-care-blue/10 text-care-blue text-xs px-2 py-0.5 rounded-full">
                              {reminder.frequency?.charAt(0).toUpperCase() + reminder.frequency?.slice(1)}
                            </span>
                          )}
                        </div>
                        {reminder.notes && (
                          <p className="text-sm text-gray-600 mt-1">{reminder.notes}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="text-sm text-gray-500 hover:text-care-blue"
                          onClick={() => {
                            // Edit functionality would go here
                            toast.info('Edit functionality will be available soon!');
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-sm text-gray-500 hover:text-destructive"
                          onClick={() => handleDeleteReminder(reminder.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-xl font-medium mb-2">No Reminders</p>
                <p className="text-muted-foreground text-center mb-6">
                  You haven't set any reminders yet.
                </p>
                <Button 
                  onClick={() => setShowReminderForm(true)}
                  className="bg-care-blue hover:bg-care-blue/90"
                >
                  Set Your First Reminder
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="appointments" className="mt-4">
          <div className="flex justify-end mb-4">
            <Button 
              onClick={() => setShowAppointmentForm(!showAppointmentForm)}
              className="bg-care-blue hover:bg-care-blue/90"
            >
              {showAppointmentForm ? 'Cancel' : 'Schedule Appointment'}
            </Button>
          </div>

          {showAppointmentForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Schedule New Appointment</CardTitle>
                <CardDescription>Book a new appointment with your healthcare provider</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitAppointment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Appointment Purpose</Label>
                    <Input
                      id="title"
                      placeholder="E.g., General Check-up, Follow-up"
                      value={newAppointment.title}
                      onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor's Name</Label>
                    <Input
                      id="doctor"
                      placeholder="Enter doctor's name"
                      value={newAppointment.doctor}
                      onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="facility">Medical Facility</Label>
                    <Input
                      id="facility"
                      placeholder="Enter hospital or clinic name"
                      value={newAppointment.facility}
                      onChange={(e) => setNewAppointment({...newAppointment, facility: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <textarea
                      id="notes"
                      className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2"
                      placeholder="Additional information or things to remember"
                      value={newAppointment.notes || ''}
                      onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-care-blue hover:bg-care-blue/90"
                    >
                      Save Appointment
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-care-orange/20 flex items-center justify-center text-care-orange">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-lg">{appointment.title}</h3>
                        <p className="text-sm font-medium text-care-blue">Dr. {appointment.doctor}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(appointment.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })} at {appointment.time}
                        </p>
                        <p className="text-sm text-gray-600">{appointment.facility}</p>
                        {appointment.notes && (
                          <p className="text-sm text-gray-600 mt-1 italic">Note: {appointment.notes}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="text-sm text-gray-500 hover:text-care-blue"
                          onClick={() => {
                            // Reschedule functionality would go here
                            toast.info('Reschedule functionality will be available soon!');
                          }}
                        >
                          Reschedule
                        </button>
                        <button 
                          className="text-sm text-gray-500 hover:text-destructive"
                          onClick={() => handleDeleteAppointment(appointment.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-xl font-medium mb-2">No Appointments</p>
                <p className="text-muted-foreground text-center mb-6">
                  You don't have any scheduled appointments.
                </p>
                <Button 
                  onClick={() => setShowAppointmentForm(true)}
                  className="bg-care-blue hover:bg-care-blue/90"
                >
                  Schedule Your First Appointment
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reminders;
