
import React, { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { FileText } from 'lucide-react';
import ContentFilter from './content/ContentFilter';
import ContentList from './content/ContentList';
import AddContentForm from './content/AddContentForm';
import { ContentItem, fetchContent, updateContent, insertContent } from '@/lib/supabase';

interface GroupedContent {
  [section: string]: {
    [key: string]: {
      [lang: string]: ContentItem;
    };
  };
}

const SECTIONS = ['home', 'about', 'services'];
const LANGUAGES = ['en', 'tr'];

const AdminContent: React.FC = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [groupedContent, setGroupedContent] = useState<GroupedContent>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>(SECTIONS[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(LANGUAGES[0]);
  
  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    if (content.length > 0) {
      organizeContent();
    }
  }, [content]);

  const getContent = async () => {
    try {
      setLoading(true);
      const data = await fetchContent();
      setContent(data as ContentItem[] || []);
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
          await updateContent(item as ContentItem);
        } else {
          // Insert new content
          await insertContent([{
            section: item.section,
            key: item.key,
            lang: item.lang,
            value: item.value
          }]);
        }
      }
      
      toast({
        title: "Content saved successfully",
      });
      
      // Refresh content
      getContent();
      
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
      
      await insertContent(newItems);
      
      toast({
        title: "New content added successfully",
      });
      
      // Refresh content
      getContent();
      
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

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-limon-darkBlue"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <FileText className="mr-2 h-5 w-5 text-limon-gold" />
        <h2 className="text-2xl font-bold">Manage Content</h2>
      </div>
      
      <ContentFilter 
        sections={SECTIONS}
        languages={LANGUAGES}
        selectedSection={selectedSection}
        selectedLanguage={selectedLanguage}
        onSectionChange={setSelectedSection}
        onLanguageChange={setSelectedLanguage}
        onRefresh={getContent}
      />
      
      <ContentList 
        section={selectedSection}
        language={selectedLanguage}
        groupedContent={groupedContent}
        languages={LANGUAGES}
        onContentChange={handleContentChange}
        onSaveContent={saveContent}
        saving={saving}
      />
      
      <AddContentForm 
        sections={SECTIONS}
        languages={LANGUAGES}
        onAddContent={handleAddNewContent}
        saving={saving}
      />
    </div>
  );
};

export default AdminContent;
