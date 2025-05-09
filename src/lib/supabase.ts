
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';
import { Database } from '../integrations/supabase/types';

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

// Functions to interact with Supabase - Messages table
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

export const fetchMessages = async (): Promise<Message[]> => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Message[];
};

// Functions for appointments table
export const submitAppointment = async (appointment: Appointment): Promise<{ success: boolean; error: any }> => {
  try {
    console.log('Submitting appointment:', appointment);
    const { error, data } = await supabase.from('appointments').insert([appointment]);
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Appointment submitted successfully:', data);
    return { success: true, error: null };
  } catch (error) {
    console.error('Error submitting appointment:', error);
    return { success: false, error };
  }
};

export const fetchAppointments = async (): Promise<Appointment[]> => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Appointment[];
};

export const updateAppointmentStatus = async (id: string, status: 'confirmed' | 'cancelled'): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating appointment status:', error);
    return false;
  }
};

// Functions for content table
export const fetchContent = async (): Promise<ContentItem[]> => {
  const { data, error } = await supabase
    .from('content')
    .select('*');
  
  if (error) throw error;
  return data as ContentItem[];
};

export const updateContent = async (item: ContentItem): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('content')
      .update({ 
        value: item.value,
        updated_at: new Date().toISOString()
      })
      .eq('id', item.id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating content:', error);
    return false;
  }
};

export const insertContent = async (items: Omit<ContentItem, 'id' | 'updated_at'>[]): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('content')
      .insert(items);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error inserting content:', error);
    return false;
  }
};
