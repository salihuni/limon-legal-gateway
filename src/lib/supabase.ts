
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

// Content management functions
export const fetchContent = async (): Promise<{ data: ContentItem[] | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .order('section, key');
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching content:', error);
    return { data: null, error };
  }
};

export const updateContent = async (id: string, value: string): Promise<{ success: boolean; error: any }> => {
  try {
    const { error } = await supabase
      .from('content')
      .update({ value })
      .match({ id });
    
    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error('Error updating content:', error);
    return { success: false, error };
  }
};

export const createContent = async (contentItem: Omit<ContentItem, 'id' | 'updated_at'>): Promise<{ success: boolean; error: any }> => {
  try {
    const { error } = await supabase
      .from('content')
      .insert([contentItem]);
    
    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error('Error creating content:', error);
    return { success: false, error };
  }
};

export const deleteContent = async (id: string): Promise<{ success: boolean; error: any }> => {
  try {
    const { error } = await supabase
      .from('content')
      .delete()
      .match({ id });
    
    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting content:', error);
    return { success: false, error };
  }
};

export const fetchContentBySection = async (section: string, language: string): Promise<{ data: ContentItem[] | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('section', section)
      .eq('lang', language)
      .order('key');
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching content for section ${section}:`, error);
    return { data: null, error };
  }
};
