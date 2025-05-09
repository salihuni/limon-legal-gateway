
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

// Mock implementations for tables that don't exist yet
// These functions will work with our UI but won't actually persist data until we create the tables

// Mock appointments functionality
export const submitAppointment = async (appointment: Appointment): Promise<{ success: boolean; error: any }> => {
  try {
    console.log('Mock submitting appointment:', appointment);
    // This would insert into 'appointments' table, but we'll mock it since the table doesn't exist yet
    return { success: true, error: null };
  } catch (error) {
    console.error('Error in mock appointment submission:', error);
    return { success: false, error };
  }
};

export const fetchAppointments = async (): Promise<Appointment[]> => {
  console.log('Mock fetching appointments');
  // Return mock data
  return [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-1234',
      date: '2025-06-01T10:00:00',
      service: 'Consultation',
      status: 'pending',
      created_at: new Date().toISOString()
    }
  ];
};

export const updateAppointmentStatus = async (id: string, status: 'confirmed' | 'cancelled'): Promise<boolean> => {
  console.log(`Mock updating appointment ${id} status to ${status}`);
  // This would update the appointments table, but we'll mock it
  return true;
};

// Mock content functionality
export const fetchContent = async (): Promise<ContentItem[]> => {
  console.log('Mock fetching content items');
  // Return mock data
  return [
    {
      id: '1',
      section: 'home',
      lang: 'en',
      key: 'title',
      value: 'Welcome to Limon Law',
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      section: 'home',
      lang: 'tr',
      key: 'title',
      value: 'Limon Hukuk Bürosuna Hoş Geldiniz',
      updated_at: new Date().toISOString()
    }
  ];
};

export const updateContent = async (item: ContentItem): Promise<boolean> => {
  console.log('Mock updating content item:', item);
  // This would update the content table, but we'll mock it
  return true;
};

export const insertContent = async (items: Omit<ContentItem, 'id' | 'updated_at'>[]): Promise<boolean> => {
  console.log('Mock inserting content items:', items);
  // This would insert into the content table, but we'll mock it
  return true;
};
