
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

type MedicalRecord = {
  id: string;
  date: string;
  type: string;
  doctor: string;
  description: string;
  attachments?: string[];
};

type Medication = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
};

const MedicalHistory = () => {
  const [activeTab, setActiveTab] = useState('records');
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  
  // Form states
  const [showRecordForm, setShowRecordForm] = useState(false);
  const [showMedicationForm, setShowMedicationForm] = useState(false);
  const [newRecord, setNewRecord] = useState<Partial<MedicalRecord>>({
    date: new Date().toISOString().split('T')[0],
    type: '',
    doctor: '',
    description: ''
  });
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({
    name: '',
    dosage: '',
    frequency: '',
    startDate: new Date().toISOString().split('T')[0],
    prescribedBy: ''
  });

  useEffect(() => {
    // Mock data for demonstration
    const mockRecords: MedicalRecord[] = [
      {
        id: '1',
        date: '2023-10-15',
        type: 'Annual Check-up',
        doctor: 'Dr. Rajesh Sharma',
        description: 'Routine annual physical examination. Blood pressure 120/80. Cholesterol levels normal.'
      },
      {
        id: '2',
        date: '2023-09-05',
        type: 'Cardiology',
        doctor: 'Dr. Priya Patel',
        description: 'Echocardiogram conducted. Results show normal heart function.'
      },
      {
        id: '3',
        date: '2023-07-22',
        type: 'Eye Examination',
        doctor: 'Dr. Amit Singh',
        description: 'Visual acuity 20/30 in both eyes. New prescription for reading glasses provided.'
      }
    ];

    const mockMedications: Medication[] = [
      {
        id: '1',
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        startDate: '2023-08-10',
        prescribedBy: 'Dr. Rajesh Sharma'
      },
      {
        id: '2',
        name: 'Amlodipine',
        dosage: '5mg',
        frequency: 'Once daily in the morning',
        startDate: '2023-09-15',
        prescribedBy: 'Dr. Priya Patel'
      }
    ];

    setMedicalRecords(mockRecords);
    setMedications(mockMedications);
  }, []);

  const handleSubmitRecord = (e: React.FormEvent) => {
    e.preventDefault();
    
    const record: MedicalRecord = {
      ...newRecord as MedicalRecord,
      id: Date.now().toString(),
    };
    
    setMedicalRecords([record, ...medicalRecords]);
    setShowRecordForm(false);
    setNewRecord({
      date: new Date().toISOString().split('T')[0],
      type: '',
      doctor: '',
      description: ''
    });
    
    toast.success('Medical record added successfully!');
  };

  const handleSubmitMedication = (e: React.FormEvent) => {
    e.preventDefault();
    
    const medication: Medication = {
      ...newMedication as Medication,
      id: Date.now().toString(),
    };
    
    setMedications([medication, ...medications]);
    setShowMedicationForm(false);
    setNewMedication({
      name: '',
      dosage: '',
      frequency: '',
      startDate: new Date().toISOString().split('T')[0],
      prescribedBy: ''
    });
    
    toast.success('Medication added successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-7 w-7 text-care-blue" />
            Medical History
          </h1>
          <p className="text-gray-600">Manage your medical records and medications</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="records" className="mt-4">
          <div className="flex justify-end mb-4">
            <Button 
              onClick={() => setShowRecordForm(!showRecordForm)}
              className="bg-care-blue hover:bg-care-blue/90"
            >
              {showRecordForm ? 'Cancel' : 'Add New Record'}
            </Button>
          </div>

          {showRecordForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Medical Record</CardTitle>
                <CardDescription>Enter the details of your medical visit or procedure</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitRecord} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newRecord.date}
                        onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Visit Type</Label>
                      <Input
                        id="type"
                        placeholder="E.g., Annual Check-up, Specialist Visit"
                        value={newRecord.type}
                        onChange={(e) => setNewRecord({...newRecord, type: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor's Name</Label>
                    <Input
                      id="doctor"
                      placeholder="Enter doctor's name"
                      value={newRecord.doctor}
                      onChange={(e) => setNewRecord({...newRecord, doctor: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description / Notes</Label>
                    <textarea
                      id="description"
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                      placeholder="Enter details about the visit, diagnosis, recommendations, etc."
                      value={newRecord.description}
                      onChange={(e) => setNewRecord({...newRecord, description: e.target.value})}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="attachment">Attachments (Optional)</Label>
                    <Input
                      id="attachment"
                      type="file"
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">Upload prescriptions, test results, or other relevant documents</p>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-care-blue hover:bg-care-blue/90"
                    >
                      Save Record
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {medicalRecords.length > 0 ? (
            <div className="space-y-4">
              {medicalRecords.map((record) => (
                <Card key={record.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{record.type}</CardTitle>
                        <CardDescription>
                          {new Date(record.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{record.doctor}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{record.description}</p>
                    {record.attachments && record.attachments.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Attachments:</p>
                        <div className="flex gap-2">
                          {record.attachments.map((attachment, i) => (
                            <div 
                              key={i} 
                              className="bg-muted px-3 py-1 rounded-full text-xs flex items-center gap-1"
                            >
                              <FileText className="h-3 w-3" />
                              <span>Document {i+1}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-xl font-medium mb-2">No Medical Records</p>
                <p className="text-muted-foreground text-center mb-6">
                  You haven't added any medical records yet.
                </p>
                <Button 
                  onClick={() => setShowRecordForm(true)}
                  className="bg-care-blue hover:bg-care-blue/90"
                >
                  Add Your First Record
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="medications" className="mt-4">
          <div className="flex justify-end mb-4">
            <Button 
              onClick={() => setShowMedicationForm(!showMedicationForm)}
              className="bg-care-blue hover:bg-care-blue/90"
            >
              {showMedicationForm ? 'Cancel' : 'Add New Medication'}
            </Button>
          </div>

          {showMedicationForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Medication</CardTitle>
                <CardDescription>Enter the details of your prescribed medication</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitMedication} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="med-name">Medication Name</Label>
                      <Input
                        id="med-name"
                        placeholder="Enter medication name"
                        value={newMedication.name}
                        onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dosage">Dosage</Label>
                      <Input
                        id="dosage"
                        placeholder="E.g., 500mg, 10ml"
                        value={newMedication.dosage}
                        onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency / Instructions</Label>
                    <Input
                      id="frequency"
                      placeholder="E.g., Twice daily with meals"
                      value={newMedication.frequency}
                      onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newMedication.startDate}
                        onChange={(e) => setNewMedication({...newMedication, startDate: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date (Optional)</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newMedication.endDate || ''}
                        onChange={(e) => setNewMedication({...newMedication, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="prescribedBy">Prescribed By</Label>
                    <Input
                      id="prescribedBy"
                      placeholder="Enter doctor's name"
                      value={newMedication.prescribedBy}
                      onChange={(e) => setNewMedication({...newMedication, prescribedBy: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-care-blue hover:bg-care-blue/90"
                    >
                      Save Medication
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {medications.length > 0 ? (
            <div className="space-y-4">
              {medications.map((medication) => (
                <Card key={medication.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{medication.name}</CardTitle>
                        <CardDescription>
                          {medication.dosage}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Prescribed By</p>
                        <p className="text-sm text-muted-foreground">{medication.prescribedBy}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Instructions</p>
                        <p className="text-gray-700">{medication.frequency}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-gray-700">
                          From {new Date(medication.startDate).toLocaleDateString('en-IN')}
                          {medication.endDate && ` to ${new Date(medication.endDate).toLocaleDateString('en-IN')}`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-xl font-medium mb-2">No Medications</p>
                <p className="text-muted-foreground text-center mb-6">
                  You haven't added any medications yet.
                </p>
                <Button 
                  onClick={() => setShowMedicationForm(true)}
                  className="bg-care-blue hover:bg-care-blue/90"
                >
                  Add Your First Medication
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalHistory;
