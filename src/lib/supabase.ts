
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';

// Type definitions for our database tables
export interface Message {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

export interface Appointment {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  notes?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  created_at?: string;
}

// Functions to interact with Supabase
export const submitContactMessage = async (message: Message): Promise<{ success: boolean; error: any }> => {
  try {
    const { error } = await supabase.from('messages').insert([message]);
    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error('Error submitting contact message:', error);
    return { success: false, error };
  }
};

export const submitAppointment = async (appointment: Appointment): Promise<{ success: boolean; error: any }> => {
  try {
    const { error } = await supabase.from('appointments').insert([{
      ...appointment,
      status: 'pending' // Default status for new appointments
    }]);
    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error('Error submitting appointment:', error);
    return { success: false, error };
  }
};
