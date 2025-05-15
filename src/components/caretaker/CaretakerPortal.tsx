
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { User, Bell, Calendar, MapPin, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Patient = {
  id: string;
  name: string;
  age: number;
  address: string;
  phone: string;
  medicalConditions: string[];
  nextAppointment?: {
    date: string;
    time: string;
    doctor: string;
  };
  medicationReminders: {
    id: string;
    medication: string;
    time: string;
    taken: boolean;
  }[];
};

const CaretakerPortal = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data for demonstration
    const mockPatients: Patient[] = [
      {
        id: '1',
        name: 'Raj Malhotra',
        age: 75,
        address: '42, Krishna Apartments, Bengaluru',
        phone: '+91 98765 43210',
        medicalConditions: ['Hypertension', 'Type 2 Diabetes'],
        nextAppointment: {
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: '10:30',
          doctor: 'Dr. Vikram Agarwal'
        },
        medicationReminders: [
          { id: '1', medication: 'Metformin 500mg', time: '08:00', taken: true },
          { id: '2', medication: 'Amlodipine 5mg', time: '08:00', taken: true },
          { id: '3', medication: 'Metformin 500mg', time: '20:00', taken: false }
        ]
      },
      {
        id: '2',
        name: 'Anita Desai',
        age: 68,
        address: '15, Silver Oak Society, Bengaluru',
        phone: '+91 87654 32109',
        medicalConditions: ['Arthritis', 'Glaucoma'],
        nextAppointment: {
          date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: '14:15',
          doctor: 'Dr. Priya Sharma'
        },
        medicationReminders: [
          { id: '1', medication: 'Prednisolone 5mg', time: '07:30', taken: true },
          { id: '2', medication: 'Timolol Eye Drops', time: '08:00', taken: false },
          { id: '3', medication: 'Timolol Eye Drops', time: '20:00', taken: false }
        ]
      }
    ];

    setPatients(mockPatients);
    setSelectedPatient(mockPatients[0]);
  }, []);

  const handleMarkMedication = (patientId: string, medicationId: string, taken: boolean) => {
    setPatients(patients.map(patient => {
      if (patient.id === patientId) {
        const updatedMedications = patient.medicationReminders.map(med => {
          if (med.id === medicationId) {
            return { ...med, taken };
          }
          return med;
        });
        
        return { ...patient, medicationReminders: updatedMedications };
      }
      return patient;
    }));
    
    // Also update selectedPatient if it's the one being modified
    if (selectedPatient && selectedPatient.id === patientId) {
      setSelectedPatient({
        ...selectedPatient,
        medicationReminders: selectedPatient.medicationReminders.map(med => {
          if (med.id === medicationId) {
            return { ...med, taken };
          }
          return med;
        })
      });
    }
    
    toast.success('Medication status updated!');
  };

  const handleEmergency = (patient: Patient) => {
    toast.error(`Emergency alert for ${patient.name} activated! Contacting emergency services.`, {
      duration: 5000
    });
  };

  const getTodaysMedications = (patient: Patient) => {
    return patient.medicationReminders.filter(med => !med.taken);
  };

  if (!selectedPatient) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Caretaker Portal
          </h1>
          <p className="text-gray-600">Manage and monitor your patients</p>
        </div>
        
        <Button 
          onClick={() => navigate('/')}
          className="mt-4 md:mt-0"
          variant="outline"
        >
          Dashboard Home
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Your Patients</CardTitle>
            <CardDescription>Select a patient to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {patients.map((patient) => (
                <button
                  key={patient.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-md text-left transition-colors ${
                    selectedPatient?.id === patient.id 
                      ? 'bg-care-blue text-white' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    selectedPatient?.id === patient.id 
                      ? 'bg-white/20' 
                      : 'bg-care-blue/20 text-care-blue'
                  }`}>
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className={`text-xs ${
                      selectedPatient?.id === patient.id 
                        ? 'text-white/80' 
                        : 'text-muted-foreground'
                    }`}>
                      {patient.age} years old
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-care-blue/20 flex items-center justify-center text-care-blue">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedPatient.name}</h2>
                    <p className="text-muted-foreground">{selectedPatient.age} years old</p>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => toast.info(`Calling ${selectedPatient.name}...`)}
                  >
                    Call Patient
                  </Button>
                  
                  <Button 
                    className="bg-destructive hover:bg-destructive/90"
                    onClick={() => handleEmergency(selectedPatient)}
                  >
                    Emergency
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="medical-history">Medical History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Patient Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
                      <p>{selectedPatient.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                      <p>{selectedPatient.address}</p>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Medical Conditions</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedPatient.medicalConditions.map((condition, index) => (
                          <span 
                            key={index} 
                            className="bg-care-blue/10 text-care-blue text-xs px-2 py-1 rounded-full"
                          >
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-care-orange" />
                      Next Appointment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedPatient.nextAppointment ? (
                      <>
                        <p className="font-medium">
                          {new Date(selectedPatient.nextAppointment.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })} at {selectedPatient.nextAppointment.time}
                        </p>
                        <p className="text-muted-foreground">{selectedPatient.nextAppointment.doctor}</p>
                      </>
                    ) : (
                      <p className="text-muted-foreground">No upcoming appointments</p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">
                      Schedule New
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-care-blue" />
                      Today's Medications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {getTodaysMedications(selectedPatient).length > 0 ? (
                        getTodaysMedications(selectedPatient).map((med) => (
                          <div key={med.id} className="flex items-center justify-between">
                            <div>
                              <p>{med.medication}</p>
                              <p className="text-xs text-muted-foreground">
                                {med.time}
                              </p>
                            </div>
                            <button 
                              className="text-xs px-2 py-1 border rounded-md hover:bg-muted transition-colors"
                              onClick={() => handleMarkMedication(selectedPatient.id, med.id, true)}
                            >
                              Mark as Taken
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">No pending medications for today</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-care-teal" />
                    Location & Check-ins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted w-full h-[200px] rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Location tracking will appear here</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Request Location
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="medications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Medication Schedule</CardTitle>
                  <CardDescription>Manage patient's medication reminders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedPatient.medicationReminders.length > 0 ? (
                      selectedPatient.medicationReminders.map((med) => (
                        <div 
                          key={med.id} 
                          className="flex items-center justify-between p-3 border rounded-md"
                        >
                          <div>
                            <p className="font-medium">{med.medication}</p>
                            <p className="text-sm text-muted-foreground">
                              {med.time}
                            </p>
                          </div>
                          <div>
                            {med.taken ? (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                Taken
                              </span>
                            ) : (
                              <button 
                                className="text-xs px-2 py-1 border rounded-md hover:bg-muted transition-colors"
                                onClick={() => handleMarkMedication(selectedPatient.id, med.id, true)}
                              >
                                Mark as Taken
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">
                          No medications scheduled for this patient
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => toast.info('Add medication functionality coming soon!')}
                    className="bg-care-blue hover:bg-care-blue/90"
                  >
                    Add Medication
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="appointments" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Appointments</CardTitle>
                  <CardDescription>Upcoming and past appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedPatient.nextAppointment ? (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-md">
                        <h3 className="font-medium text-lg">Upcoming Appointment</h3>
                        <p className="text-care-blue font-medium">
                          {new Date(selectedPatient.nextAppointment.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })} at {selectedPatient.nextAppointment.time}
                        </p>
                        <p>{selectedPatient.nextAppointment.doctor}</p>
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive border-destructive">
                            Cancel
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-lg mb-3">Past Appointments</h3>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-md">
                            <p className="font-medium">General Checkup</p>
                            <p className="text-sm text-muted-foreground">
                              May 10, 2023 at 11:30
                            </p>
                            <p className="text-sm">Dr. Rajesh Sharma</p>
                          </div>
                          <div className="p-3 border rounded-md">
                            <p className="font-medium">Diabetes Follow-up</p>
                            <p className="text-sm text-muted-foreground">
                              April 15, 2023 at 09:45
                            </p>
                            <p className="text-sm">Dr. Priya Patel</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        No appointments scheduled for this patient
                      </p>
                      <Button 
                        className="mt-4 bg-care-blue hover:bg-care-blue/90"
                        onClick={() => toast.info('Schedule appointment functionality coming soon!')}
                      >
                        Schedule Appointment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="medical-history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-care-blue" />
                    Medical History
                  </CardTitle>
                  <CardDescription>Patient's medical records and history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-lg mb-3">Medical Conditions</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPatient.medicalConditions.map((condition, index) => (
                          <span 
                            key={index} 
                            className="bg-care-blue/10 text-care-blue px-3 py-1 rounded-full"
                          >
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg mb-3">Recent Records</h3>
                      <div className="space-y-3">
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between">
                            <p className="font-medium">Annual Check-up</p>
                            <p className="text-sm text-muted-foreground">May 10, 2023</p>
                          </div>
                          <p className="text-sm">Dr. Rajesh Sharma</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Routine annual physical examination. Blood pressure 130/85. 
                            Cholesterol levels slightly elevated.
                          </p>
                        </div>
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between">
                            <p className="font-medium">Eye Examination</p>
                            <p className="text-sm text-muted-foreground">April 5, 2023</p>
                          </div>
                          <p className="text-sm">Dr. Sunita Verma</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Visual acuity 20/40 in both eyes. Early signs of cataract in left eye.
                            New prescription for reading glasses provided.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="bg-care-blue hover:bg-care-blue/90"
                    onClick={() => toast.info('Add medical record functionality coming soon!')}
                  >
                    Add Medical Record
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CaretakerPortal;
