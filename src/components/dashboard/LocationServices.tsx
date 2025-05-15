
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

type Facility = {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy' | 'park' | 'caretaker';
  address: string;
  distance: number; // in km
  rating?: number;
  contact?: string;
};

const LocationServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);

  useEffect(() => {
    // Simulate getting user's location
    const getUserLocation = () => {
      toast.info("Accessing your location for nearby services...");
      // In a real app, we would use the browser's geolocation API
    };

    getUserLocation();

    // Mock data for demonstration
    const mockFacilities: Facility[] = [
      {
        id: '1',
        name: 'Apollo Hospitals',
        type: 'hospital',
        address: '154, Bannerghatta Road, Bengaluru',
        distance: 1.2,
        rating: 4.5,
        contact: '+91 80 4612 4444'
      },
      {
        id: '2',
        name: 'Fortis Hospital',
        type: 'hospital',
        address: 'Bannerghatta Road, Bengaluru',
        distance: 3.5,
        rating: 4.3,
        contact: '+91 80 6621 4444'
      },
      {
        id: '3',
        name: 'MedPlus Pharmacy',
        type: 'pharmacy',
        address: 'HSR Layout, Bengaluru',
        distance: 0.7,
        rating: 4.1,
        contact: '+91 98765 43210'
      },
      {
        id: '4',
        name: 'Apollo Pharmacy',
        type: 'pharmacy',
        address: 'Koramangala, Bengaluru',
        distance: 1.9,
        rating: 4.0,
        contact: '+91 87654 32109'
      },
      {
        id: '5',
        name: 'Cubbon Park',
        type: 'park',
        address: 'Kasturba Road, Bengaluru',
        distance: 5.3,
        rating: 4.7
      },
      {
        id: '6',
        name: 'Lalbagh Botanical Garden',
        type: 'park',
        address: 'Mavalli, Bengaluru',
        distance: 4.1,
        rating: 4.8
      },
      {
        id: '7',
        name: 'Dr. Sharma\'s Clinic',
        type: 'clinic',
        address: 'Jayanagar, Bengaluru',
        distance: 2.3,
        rating: 4.6,
        contact: '+91 98765 12345'
      },
      {
        id: '8',
        name: 'Agarwal Family Clinic',
        type: 'clinic',
        address: 'JP Nagar, Bengaluru',
        distance: 1.6,
        rating: 4.2,
        contact: '+91 87654 54321'
      },
      {
        id: '9',
        name: 'Sunita Verma',
        type: 'caretaker',
        address: 'HSR Layout, Bengaluru',
        distance: 0.9,
        rating: 4.9,
        contact: '+91 98765 67890'
      },
      {
        id: '10',
        name: 'Aarav Caretaker Services',
        type: 'caretaker',
        address: 'Koramangala, Bengaluru',
        distance: 2.1,
        rating: 4.4,
        contact: '+91 87654 09876'
      }
    ];

    setFacilities(mockFacilities);
    setFilteredFacilities(mockFacilities);
  }, []);

  useEffect(() => {
    // Apply filters when searchTerm or selectedType changes
    let results = facilities;
    
    if (searchTerm) {
      results = results.filter(facility => 
        facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedType !== 'all') {
      results = results.filter(facility => facility.type === selectedType);
    }
    
    setFilteredFacilities(results);
  }, [searchTerm, selectedType, facilities]);

  const handleGetDirections = (facility: Facility) => {
    toast.info(`Getting directions to ${facility.name}...`);
    // In a real app, this would open maps with directions
  };

  const handleCall = (facility: Facility) => {
    if (facility.contact) {
      toast.info(`Calling ${facility.name} at ${facility.contact}...`);
    } else {
      toast.error('No contact information available.');
    }
  };

  const getIconForFacilityType = (type: string) => {
    switch (type) {
      case 'hospital':
        return <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
          <MapPin className="h-5 w-5" />
        </div>;
      case 'pharmacy':
        return <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
          <MapPin className="h-5 w-5" />
        </div>;
      case 'park':
        return <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500">
          <MapPin className="h-5 w-5" />
        </div>;
      case 'clinic':
        return <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
          <MapPin className="h-5 w-5" />
        </div>;
      case 'caretaker':
        return <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
          <MapPin className="h-5 w-5" />
        </div>;
      default:
        return <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
          <MapPin className="h-5 w-5" />
        </div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="h-7 w-7 text-care-blue" />
            Nearby Services
          </h1>
          <p className="text-gray-600">Find healthcare facilities and services near you</p>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Map View</CardTitle>
          <CardDescription>Your location and nearby facilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted w-full h-[300px] md:h-[400px] rounded-md flex flex-col items-center justify-center">
            <MapPin className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Map view will be displayed here</p>
            <p className="text-xs text-muted-foreground">Allow location access to view nearby facilities on map</p>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <Input
            placeholder="Search by name or address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-48">
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2 h-10"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="hospital">Hospitals</option>
            <option value="clinic">Clinics</option>
            <option value="pharmacy">Pharmacies</option>
            <option value="park">Parks</option>
            <option value="caretaker">Caretakers</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFacilities.map((facility) => (
          <Card key={facility.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {getIconForFacilityType(facility.type)}
                <div className="flex-grow">
                  <h3 className="font-medium text-lg">{facility.name}</h3>
                  <p className="text-sm text-muted-foreground">{facility.address}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                      {facility.distance} km away
                    </span>
                    {facility.rating && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex items-center">
                        ★ {facility.rating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleGetDirections(facility)}
                  className="bg-care-blue hover:bg-care-blue/90"
                  size="sm"
                >
                  Get Directions
                </Button>
                {facility.contact && (
                  <Button
                    onClick={() => handleCall(facility)}
                    variant="outline"
                    size="sm"
                  >
                    Call
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredFacilities.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">
              No results found. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationServices;
