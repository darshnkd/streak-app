'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import type { User } from 'firebase/auth';
import { LogOut } from 'lucide-react';

interface SettingsScreenProps {
  user: User;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function SettingsScreen({ user, darkMode, setDarkMode }: SettingsScreenProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">
        Settings
      </h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="text-foreground">{user.email}</span>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dark-mode-switch" className="font-semibold text-lg text-foreground">
                Dark Mode
              </Label>
              <p className="text-muted-foreground">
                Toggle dark/light theme
              </p>
            </div>
            <Switch
              id="dark-mode-switch"
              checked={darkMode}
              onCheckedChange={setDarkMode}
              aria-label="Toggle dark mode"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">App Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <span className="text-foreground">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Build</span>
              <span className="text-foreground">2024.07.01</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
