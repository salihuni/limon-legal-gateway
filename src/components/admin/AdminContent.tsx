
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";
import { ContentItem, deleteContent } from '@/lib/supabase';
import { FileText, Loader2 } from 'lucide-react';
import ContentFilter from './content/ContentFilter';
import ContentList from './content/ContentList';
import AddContentForm from './content/AddContentForm';

interface GroupedContent {
  [section: string]: {
    [key: string]: {
      [lang: string]: ContentItem;
    };
  };
}

const DEFAULT_SECTIONS = ['home', 'about', 'services', 'contact', 'footer'];
const LANGUAGES = ['en', 'tr'];

const AdminContent: React.FC = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [groupedContent, setGroupedContent] = useState<GroupedContent>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>(DEFAULT_SECTIONS[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(LANGUAGES[0]);
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
    
    // If selected section doesn't exist in content, select first available
    if (contentSections.length && !contentSections.includes(selectedSection)) {
      setSelectedSection(contentSections[0]);
    }
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

  const handleDeleteContent = async (section: string, key: string) => {
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
  
  const handleAddSection = async (section: string) => {
    if (!sections.includes(section)) {
      setSections(prev => [...prev, section]);
      setSelectedSection(section);
      
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

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8 min-h-[300px]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading content...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <FileText className="mr-2 h-5 w-5 text-limon-gold" />
        <h2 className="text-2xl font-bold">Manage Website Content</h2>
      </div>
      
      <ContentFilter 
        sections={sections}
        languages={LANGUAGES}
        selectedSection={selectedSection}
        selectedLanguage={selectedLanguage}
        onSectionChange={setSelectedSection}
        onLanguageChange={setSelectedLanguage}
        onRefresh={fetchContent}
        onAddSection={handleAddSection}
      />
      
      <ContentList 
        section={selectedSection}
        language={selectedLanguage}
        groupedContent={groupedContent}
        languages={LANGUAGES}
        onContentChange={handleContentChange}
        onSaveContent={saveContent}
        onDeleteContent={handleDeleteContent}
        saving={saving}
        onRenameKey={handleRenameKey}
        onBulkSave={handleBulkSave}
        onRefresh={fetchContent}
      />
      
      <AddContentForm 
        sections={sections}
        languages={LANGUAGES}
        onAddContent={handleAddNewContent}
        saving={saving}
      />
    </div>
  );
};

export default AdminContent;
