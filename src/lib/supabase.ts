
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
  notes?: string | null;
  status?: 'pending' | 'confirmed' | 'cancelled' | string;
  created_at?: string;
}

export interface ContentItem {
  id?: string;
  section: string;
  lang: string;
  key: string;
  value: string;
  updated_at?: string;
}

// Functions to interact with Supabase
export const submitContactMessage = async (message: Message): Promise<{ success: boolean; error: any }> => {
  try {
    // Use proper error handling and logging
    console.log('Submitting contact message:', message);
    const { error, data } = await supabase.from('messages').insert([message]);
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Message submitted successfully:', data);
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

// Functions to fetch data from Supabase tables directly
export const fetchMessages = async () => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const fetchAppointments = async () => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const updateAppointmentStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
  const { error } = await supabase
    .from('appointments')
    .update({ status })
    .match({ id });
  
  if (error) throw error;
  return true;
};

export const fetchContent = async () => {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .order('section, key');
  
  if (error) throw error;
  return data;
};

export const updateContent = async (item: ContentItem) => {
  const { error } = await supabase
    .from('content')
    .update({ value: item.value })
    .match({ id: item.id });
  
  if (error) throw error;
  return true;
};

export const insertContent = async (items: Omit<ContentItem, 'id' | 'updated_at'>[]) => {
  const { error } = await supabase
    .from('content')
    .insert(items);
  
  if (error) throw error;
  return true;
};
