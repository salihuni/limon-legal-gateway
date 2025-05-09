
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddContentFormProps {
  sections: string[];
  languages: string[];
  onAddContent: (section: string, key: string, values: Record<string, string>) => Promise<void>;
  saving: boolean;
}

const AddContentForm: React.FC<AddContentFormProps> = ({
  sections,
  languages,
  onAddContent,
  saving
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [newContentKey, setNewContentKey] = useState('');
  const [newContentValues, setNewContentValues] = useState<Record<string, string>>(
    languages.reduce((acc, lang) => ({ ...acc, [lang]: '' }), {})
  );

  const handleSubmit = async () => {
    if (activeSection) {
      await onAddContent(
        activeSection,
        newContentKey,
        newContentValues
      );
      
      // Reset form
      setNewContentKey('');
      setNewContentValues(
        languages.reduce((acc, lang) => ({ ...acc, [lang]: '' }), {})
      );
    }
  };

  return (
    <div className="mt-10 pt-6 border-t">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Add New Content
      </h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="content-section">Section</Label>
          <Select 
            value={activeSection || ''} 
            onValueChange={setActiveSection}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              {sections.map(section => (
                <SelectItem key={section} value={section}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="key">Content Key</Label>
          <Input 
            id="key"
            value={newContentKey}
            onChange={(e) => setNewContentKey(e.target.value)}
            placeholder="Enter content key (e.g. title, subtitle)"
          />
        </div>
        
        <div className="space-y-4">
          {languages.map(lang => (
            <div key={lang} className="space-y-2">
              <Label htmlFor={`new-${lang}`} className="capitalize">{lang} Value</Label>
              <Textarea
                id={`new-${lang}`}
                value={newContentValues[lang]}
                onChange={(e) => setNewContentValues(prev => ({
                  ...prev,
                  [lang]: e.target.value
                }))}
                placeholder={`Enter ${lang} content value`}
                rows={3}
              />
            </div>
          ))}
        </div>
        
        <Button 
          onClick={handleSubmit}
          disabled={saving || !activeSection || !newContentKey.trim()}
          className="w-full md:w-auto"
        >
          {saving ? "Adding..." : "Add Content"}
        </Button>
      </div>
    </div>
  );
};

export default AddContentForm;
