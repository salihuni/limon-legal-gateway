
import React, { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X, Calendar } from 'lucide-react';
import { Appointment, fetchAppointments, updateAppointmentStatus } from '@/lib/supabase';
import { format } from 'date-fns';

const AdminAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    try {
      setLoading(true);
      const data = await fetchAppointments();
      setAppointments(data as Appointment[] || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "Failed to load appointments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      await updateAppointmentStatus(id, status);
      
      // Update local state
      setAppointments(appointments.map(appointment => 
        appointment.id === id ? { ...appointment, status } : appointment
      ));
      
      toast({
        title: `Appointment ${status}`,
        variant: "default",
      });
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast({
        title: "Failed to update appointment",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-limon-darkBlue"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-limon-gold" />
          Appointments ({appointments.length})
        </h2>
        <Button onClick={getAppointments}>Refresh</Button>
      </div>
      
      {appointments.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>List of appointment requests</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.name}</TableCell>
                  <TableCell>{appointment.email}</TableCell>
                  <TableCell>{appointment.phone}</TableCell>
                  <TableCell>{format(new Date(appointment.date), 'PP')}</TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {appointment.status === 'pending' && (
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleUpdateStatus(appointment.id!, 'confirmed')}
                          className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleUpdateStatus(appointment.id!, 'cancelled')}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No appointments found</p>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
