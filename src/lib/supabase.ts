
import { createClient } from '@supabase/supabase-js';

// Get environment variables from Supabase Secrets
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase URL and key exist
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anonymous Key. Please add these in your Supabase project settings under "Project Settings > API".');
}

// Create a Supabase client with proper fallbacks to prevent runtime errors
const supabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Provide dummy values to prevent the app from crashing
    // This will allow the app to render, but Supabase functionality won't work
    return createClient('https://placeholder-url.supabase.co', 'placeholder-key');
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = supabaseClient();

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
