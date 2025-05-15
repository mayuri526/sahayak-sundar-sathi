
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';

type AuthFormProps = {
  type: 'login' | 'register';
};

type UserRole = 'patient' | 'caretaker' | 'doctor';

const AuthForm = ({ type }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('patient');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (type === 'register') {
        // Save user to localStorage for demo purposes
        const newUser = { email, password, name, role, id: Date.now().toString() };
        
        // Create empty collections for the new user
        const userData = {
          medicalHistory: [],
          medications: [],
          appointments: [],
          emergencyContacts: [],
          reminders: []
        };
        
        // Store user data
        localStorage.setItem(`user_${newUser.id}`, JSON.stringify(newUser));
        localStorage.setItem(`userData_${newUser.id}`, JSON.stringify(userData));
        
        // Set current user
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        toast.success('Registration successful!');
        
        if (role === 'patient') {
          navigate('/dashboard');
        } else {
          navigate('/caretaker-portal');
        }
      } else {
        // For demo, just log in with any credentials
        const mockUser = { 
          email, 
          name: 'Demo User', 
          role, 
          id: '123456' 
        };
        
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        
        toast.success('Login successful!');
        
        if (role === 'patient') {
          navigate('/dashboard');
        } else {
          navigate('/caretaker-portal');
        }
      }
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-care-blue">
          {type === 'login' ? 'Login' : 'Create an Account'}
        </CardTitle>
        <CardDescription className="text-center">
          {type === 'login' 
            ? 'Enter your credentials to access your account' 
            : 'Fill in the information below to create your account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">I am a</Label>
            <select
              id="role"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              required
            >
              <option value="patient">Patient</option>
              <option value="caretaker">Caretaker</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-care-blue hover:bg-care-blue/90"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : type === 'login' ? 'Login' : 'Register'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        {type === 'login' ? (
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="/register" className="text-care-blue hover:underline">
              Register
            </a>
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="text-care-blue hover:underline">
              Login
            </a>
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
