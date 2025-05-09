
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';

interface ContentItemProps {
  contentKey: string;
  langValues: Record<string, any>;
  selectedLanguage: string;
  languages: string[];
  onContentChange: (key: string, lang: string, value: string) => void;
  onSave: (key: string) => void;
  saving: boolean;
}

const ContentItem: React.FC<ContentItemProps> = ({
  contentKey,
  langValues,
  selectedLanguage,
  languages,
  onContentChange,
  onSave,
  saving
}) => {
  return (
    <div className="border rounded-md p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium text-md">Key: <span className="font-bold">{contentKey}</span></h4>
        <Button 
          onClick={() => onSave(contentKey)}
          disabled={saving}
          size="sm"
          className="flex items-center gap-1"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>
      
      <div className="space-y-4">
        {languages.filter(lang => lang === selectedLanguage).map(lang => {
          const contentItem = langValues[lang];
          const value = contentItem?.value || '';
          
          return (
            <div key={lang} className="space-y-2">
              <Label className="capitalize">{lang}</Label>
              {value && value.length > 100 ? (
                <Textarea
                  value={value}
                  onChange={(e) => onContentChange(contentKey, lang, e.target.value)}
                  rows={4}
                />
              ) : (
                <Input
                  value={value}
                  onChange={(e) => onContentChange(contentKey, lang, e.target.value)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentItem;
