
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ContentItem } from '@/lib/supabase';
import { toast } from "@/hooks/use-toast";

interface GroupedContent {
  [section: string]: {
    [key: string]: {
      [lang: string]: ContentItem;
    };
  };
}

interface ContentContextType {
  content: ContentItem[];
  groupedContent: GroupedContent;
  sections: string[];
  loading: boolean;
  saving: boolean;
  fetchContent: () => Promise<void>;
  handleContentChange: (section: string, key: string, lang: string, value: string) => void;
  saveContent: (section: string, key: string) => Promise<void>;
  deleteContent: (section: string, key: string) => Promise<void>;
  handleBulkSave: (section: string) => Promise<void>;
  handleAddNewContent: (section: string, key: string, values: Record<string, string>) => Promise<void>;
  handleRenameKey: (section: string, oldKey: string, newKey: string) => Promise<void>;
  handleAddSection: (section: string) => void;
}

const DEFAULT_SECTIONS = ['home', 'about', 'services', 'contact', 'footer'];
const LANGUAGES = ['en', 'tr'];

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [groupedContent, setGroupedContent] = useState<GroupedContent>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState<string[]>(DEFAULT_SECTIONS);

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if (content.length > 0) {
      organizeContent();
      extractSections();
    }
  }, [content]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('section, key');

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Failed to load content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const organizeContent = () => {
    const grouped: GroupedContent = {};

    content.forEach(item => {
      if (!grouped[item.section]) {
        grouped[item.section] = {};
      }
      
      if (!grouped[item.section][item.key]) {
        grouped[item.section][item.key] = {};
      }
      
      grouped[item.section][item.key][item.lang] = item;
    });

    setGroupedContent(grouped);
  };
  
  const extractSections = () => {
    const contentSections = [...new Set(content.map(item => item.section))];
    
    // Merge with default sections and remove duplicates
    const allSections = Array.from(new Set([...DEFAULT_SECTIONS, ...contentSections]));
    setSections(allSections);
  };

  const handleContentChange = (section: string, key: string, lang: string, value: string) => {
    setGroupedContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: {
          ...prev[section][key],
          [lang]: {
            ...prev[section][key][lang],
            value
          }
        }
      }
    }));
  };

  const saveContent = async (section: string, key: string) => {
    try {
      setSaving(true);
      
      const items = LANGUAGES.map(lang => {
        const item = groupedContent[section][key][lang];
        return {
          id: item?.id,
          section: item?.section || section,
          key: item?.key || key,
          lang,
          value: item?.value || ''
        };
      });

      for (const item of items) {
        if (item.id) {
          // Update existing content
          const { error } = await supabase
            .from('content')
            .update({ value: item.value })
            .match({ id: item.id });
            
          if (error) throw error;
        } else {
          // Insert new content
          const { error } = await supabase
            .from('content')
            .insert({
              section: item.section,
              key: item.key,
              lang: item.lang,
              value: item.value
            });
            
          if (error) throw error;
        }
      }
      
      toast({
        title: "Content saved successfully",
      });
      
      // Refresh content
      fetchContent();
      
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Failed to save content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteContent = async (section: string, key: string) => {
    try {
      setSaving(true);
      
      // Find all items with this section and key across all languages
      const itemsToDelete = content.filter(
        item => item.section === section && item.key === key
      );
      
      for (const item of itemsToDelete) {
        if (item.id) {
          const { error } = await supabase
            .from('content')
            .delete()
            .match({ id: item.id });
            
          if (error) throw error;
        }
      }
      
      toast({
        title: "Content deleted successfully",
      });
      
      // Refresh content
      fetchContent();
      
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: "Failed to delete content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleBulkSave = async (section: string) => {
    try {
      setSaving(true);
      
      const sectionContent = groupedContent[section];
      const updates = [];
      const insertions = [];
      
      for (const [key, langValues] of Object.entries(sectionContent)) {
        for (const [lang, contentItem] of Object.entries(langValues)) {
          if (contentItem.id) {
            updates.push({
              id: contentItem.id,
              value: contentItem.value
            });
          } else {
            insertions.push({
              section,
              key,
              lang,
              value: contentItem.value || ''
            });
          }
        }
      }
      
      // Execute updates in batches
      if (updates.length > 0) {
        const { error } = await supabase
          .from('content')
          .upsert(updates);
          
        if (error) throw error;
      }
      
      // Execute insertions
      if (insertions.length > 0) {
        const { error } = await supabase
          .from('content')
          .insert(insertions);
          
        if (error) throw error;
      }
      
      toast({
        title: `All content in ${section} section saved successfully`,
      });
      
      // Refresh content
      fetchContent();
      
    } catch (error) {
      console.error('Error bulk saving content:', error);
      toast({
        title: "Failed to save all content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddNewContent = async (section: string, key: string, values: Record<string, string>) => {
    if (!section || !key.trim()) {
      toast({
        title: "Please select a section and provide a key",
        variant: "destructive",
      });
      return;
    }

    // Check if any language value is empty
    const hasEmptyValue = Object.values(values).some(val => !val.trim());
    if (hasEmptyValue) {
      toast({
        title: "Please provide values for all languages",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      
      // Create array of content items for all languages
      const newItems = LANGUAGES.map(lang => ({
        section,
        key: key.trim(),
        lang,
        value: values[lang]
      }));
      
      const { error } = await supabase
        .from('content')
        .insert(newItems);
        
      if (error) throw error;
      
      toast({
        title: "New content added successfully",
      });
      
      // Refresh content
      fetchContent();
      
    } catch (error) {
      console.error('Error adding content:', error);
      toast({
        title: "Failed to add content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
  
  const handleRenameKey = async (section: string, oldKey: string, newKey: string) => {
    try {
      setSaving(true);
      
      // Get all content items with this section and key
      const itemsToUpdate = content.filter(item => 
        item.section === section && item.key === oldKey
      );
      
      // Update each item's key
      for (const item of itemsToUpdate) {
        const { error } = await supabase
          .from('content')
          .update({ key: newKey })
          .match({ id: item.id });
          
        if (error) throw error;
      }
      
      toast({
        title: "Content key renamed successfully",
      });
      
      // Refresh content
      fetchContent();
      
    } catch (error) {
      console.error('Error renaming content key:', error);
      toast({
        title: "Failed to rename content key",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
  
  const handleAddSection = (section: string) => {
    if (!sections.includes(section)) {
      setSections(prev => [...prev, section]);
      
      toast({
        title: `New section "${section}" added`,
        description: "You can now add content to this section"
      });
    } else {
      toast({
        title: "Section already exists",
        variant: "destructive",
      });
    }
  };

  return (
    <ContentContext.Provider value={{
      content,
      groupedContent,
      sections,
      loading,
      saving,
      fetchContent,
      handleContentChange,
      saveContent,
      deleteContent,
      handleBulkSave,
      handleAddNewContent,
      handleRenameKey,
      handleAddSection,
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
