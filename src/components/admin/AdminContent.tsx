
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileText, Save, Plus } from 'lucide-react';

interface ContentItem {
  id?: string;
  section: string;
  lang: string;
  key: string;
  value: string;
}

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
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [newContentKey, setNewContentKey] = useState('');
  const [newContentValues, setNewContentValues] = useState<Record<string, string>>(
    LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: '' }), {})
  );

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if (content.length > 0) {
      organizeContent();
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
          id: item.id,
          section: item.section,
          key: item.key,
          lang: item.lang,
          value: item.value
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

  const handleAddNewContent = async () => {
    if (!activeSection || !newContentKey.trim()) {
      toast({
        title: "Please select a section and provide a key",
        variant: "destructive",
      });
      return;
    }

    // Check if any language value is empty
    const hasEmptyValue = Object.values(newContentValues).some(val => !val.trim());
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
        section: activeSection,
        key: newContentKey.trim(),
        lang,
        value: newContentValues[lang]
      }));
      
      const { error } = await supabase
        .from('content')
        .insert(newItems);
        
      if (error) throw error;
      
      toast({
        title: "New content added successfully",
      });
      
      // Reset form
      setNewContentKey('');
      setNewContentValues(
        LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: '' }), {})
      );
      
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
      
      <Accordion type="single" collapsible className="mb-8">
        {SECTIONS.map(section => (
          <AccordionItem key={section} value={section}>
            <AccordionTrigger 
              className="text-lg font-semibold capitalize"
              onClick={() => setActiveSection(section)}
            >
              {section} Section
            </AccordionTrigger>
            <AccordionContent>
              {groupedContent[section] ? (
                Object.keys(groupedContent[section]).map(key => (
                  <div key={key} className="mb-8 border-b pb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-md">Key: <span className="font-bold">{key}</span></h3>
                      <Button 
                        onClick={() => saveContent(section, key)}
                        disabled={saving}
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Save className="h-4 w-4" />
                        {saving ? "Saving..." : "Save"}
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {LANGUAGES.map(lang => {
                        const content = groupedContent[section][key][lang];
                        return (
                          <div key={lang} className="space-y-2">
                            <Label className="capitalize">{lang}</Label>
                            {content?.value && content.value.length > 100 ? (
                              <Textarea
                                value={content?.value || ''}
                                onChange={(e) => handleContentChange(section, key, lang, e.target.value)}
                                rows={4}
                              />
                            ) : (
                              <Input
                                value={content?.value || ''}
                                onChange={(e) => handleContentChange(section, key, lang, e.target.value)}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 py-2">No content found for this section</p>
              )}

              {/* Add new content form */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Content
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="key">Content Key</Label>
                    <Input 
                      id="key"
                      value={newContentKey}
                      onChange={(e) => setNewContentKey(e.target.value)}
                      placeholder="Enter content key (e.g. title, subtitle)"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {LANGUAGES.map(lang => (
                      <div key={lang} className="space-y-2">
                        <Label htmlFor={`new-${lang}`} className="capitalize">{lang} Value</Label>
                        <Input
                          id={`new-${lang}`}
                          value={newContentValues[lang]}
                          onChange={(e) => setNewContentValues(prev => ({
                            ...prev,
                            [lang]: e.target.value
                          }))}
                          placeholder={`Enter ${lang} content value`}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={handleAddNewContent}
                    disabled={saving || !newContentKey.trim()}
                    className="w-full md:w-auto"
                  >
                    {saving ? "Adding..." : "Add Content"}
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AdminContent;
