
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { LogOut } from 'lucide-react';
import AdminMessages from "@/components/admin/AdminMessages";
import AdminAppointments from "@/components/admin/AdminAppointments";
import AdminContent from "@/components/admin/AdminContent";
import AdminLogin from "@/components/admin/AdminLogin";
import { useAuth } from '@/lib/auth';

const AdminPage: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { success, error } = await signOut();
      
      if (error) throw new Error(error);
      
      toast({
        title: "Logged out successfully",
        variant: "default",
      });
      navigate('/admin');
    } catch (error: any) {
      console.error('Error logging out:', error);
      toast({
        title: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-limon-darkBlue"></div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-limon-darkBlue">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>

        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointments">
            <AdminAppointments />
          </TabsContent>
          
          <TabsContent value="messages">
            <AdminMessages />
          </TabsContent>
          
          <TabsContent value="content">
            <AdminContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
