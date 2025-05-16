import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { User, Phone } from 'lucide-react';

type EmergencyContact = {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isCaretaker?: boolean;
};

const EmergencySOS = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState<Partial<EmergencyContact>>({
    name: '',
    relationship: '',
    phone: '',
    isCaretaker: false
  });

  useEffect(() => {
    // Initialize with empty contacts instead of mock data
    setContacts([]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const contact: EmergencyContact = {
      ...newContact as EmergencyContact,
      id: Date.now().toString()
    };
    
    setContacts([...contacts, contact]);
    setShowForm(false);
    setNewContact({
      name: '',
      relationship: '',
      phone: '',
      isCaretaker: false
    });
    
    toast.success('Emergency contact added successfully!');
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast.success('Contact deleted successfully!');
  };

  const handleEmergency = () => {
    // In a real app, this would trigger notifications to all emergency contacts
    toast.error('Emergency alert sent to all your emergency contacts!', {
      duration: 5000
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            Emergency Contacts & SOS
          </h1>
          <p className="text-gray-600">Manage your emergency contacts and access quick help</p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-destructive hover:bg-destructive/90 animate-pulse-slow"
          onClick={handleEmergency}
        >
          <span className="h-3 w-3 rounded-full bg-white mr-2"></span>
          Trigger Emergency SOS
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>People who will be contacted in case of emergency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button 
                  onClick={() => setShowForm(!showForm)}
                  className="bg-care-blue hover:bg-care-blue/90"
                >
                  {showForm ? 'Cancel' : 'Add New Contact'}
                </Button>
              </div>

              {showForm && (
                <div className="bg-muted p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-medium mb-4">Add Emergency Contact</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter contact name"
                        value={newContact.name}
                        onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="relationship">Relationship</Label>
                      <Input
                        id="relationship"
                        placeholder="E.g., Son, Daughter, Doctor"
                        value={newContact.relationship}
                        onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter phone number with country code"
                        value={newContact.phone}
                        onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isCaretaker"
                        checked={newContact.isCaretaker}
                        onChange={(e) => setNewContact({...newContact, isCaretaker: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-care-blue focus:ring-care-blue"
                      />
                      <Label htmlFor="isCaretaker">This person is also my caretaker</Label>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        type="submit"
                        className="bg-care-blue hover:bg-care-blue/90"
                      >
                        Save Contact
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {contacts.length > 0 ? (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div 
                      key={contact.id} 
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-care-blue/20 flex items-center justify-center text-care-blue">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                          {contact.isCaretaker && (
                            <span className="text-xs bg-care-purple/20 text-care-purple px-2 py-0.5 rounded-full">
                              Caretaker
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {contact.phone}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            className="text-sm text-gray-500 hover:text-care-blue"
                            onClick={() => {
                              // Call functionality would go here
                              toast.info(`Calling ${contact.name}...`);
                            }}
                          >
                            Call
                          </button>
                          <button 
                            className="text-sm text-gray-500 hover:text-destructive"
                            onClick={() => handleDelete(contact.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No emergency contacts added yet.</p>
                  <p className="text-muted-foreground">Add contacts who should be notified in case of emergency.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-destructive">Emergency SOS</CardTitle>
              <CardDescription>Quick access to emergency help</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full py-6 text-lg bg-destructive hover:bg-destructive/90 animate-pulse-slow"
                onClick={handleEmergency}
              >
                <span className="h-3 w-3 rounded-full bg-white mr-2"></span>
                Trigger Emergency Alert
              </Button>
              
              <p className="text-sm text-center text-muted-foreground">
                This will immediately notify all your emergency contacts
              </p>
              
              <div className="space-y-4 mt-6">
                <h3 className="font-medium">Emergency Helplines</h3>
                
                <div className="p-3 bg-white rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium">Ambulance</p>
                    <p className="text-sm text-muted-foreground">Emergency Medical Services</p>
                  </div>
                  <button 
                    className="bg-care-blue text-white px-3 py-1 rounded-md hover:bg-care-blue/90"
                    onClick={() => toast.info('Calling 108 - Ambulance Service...')}
                  >
                    Call 108
                  </button>
                </div>
                
                <div className="p-3 bg-white rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium">Police</p>
                    <p className="text-sm text-muted-foreground">Emergency Police Assistance</p>
                  </div>
                  <button 
                    className="bg-care-blue text-white px-3 py-1 rounded-md hover:bg-care-blue/90"
                    onClick={() => toast.info('Calling 100 - Police...')}
                  >
                    Call 100
                  </button>
                </div>
                
                <div className="p-3 bg-white rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium">National Emergency</p>
                    <p className="text-sm text-muted-foreground">All Emergency Services</p>
                  </div>
                  <button 
                    className="bg-care-blue text-white px-3 py-1 rounded-md hover:bg-care-blue/90"
                    onClick={() => toast.info('Calling 112 - National Emergency Number...')}
                  >
                    Call 112
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Instructions</CardTitle>
          <CardDescription>Important information for emergency responders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Medical Information</h3>
              <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                placeholder="Enter important medical information like allergies, conditions, blood type, etc."
              ></textarea>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Current Medications</h3>
              <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                placeholder="List your current medications and dosages"
              ></textarea>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Special Instructions</h3>
              <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                placeholder="Any special instructions for emergency responders"
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <Button className="bg-care-blue hover:bg-care-blue/90">
                Save Emergency Information
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencySOS;
