
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw } from 'lucide-react';
import SectionManager from './SectionManager';
import { useContent } from '@/context/ContentContext';

interface ContentFilterProps {
  selectedSection: string;
  selectedLanguage: string;
  onSectionChange: (section: string) => void;
  onLanguageChange: (language: string) => void;
}

const ContentFilter: React.FC<ContentFilterProps> = ({
  selectedSection,
  selectedLanguage,
  onSectionChange,
  onLanguageChange,
}) => {
  const { sections, fetchContent, handleAddSection } = useContent();
  const languages = ['en', 'tr'];

  return (
    <div className="bg-muted/20 p-4 rounded-lg border mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="w-full md:w-auto">
          <Label htmlFor="section-filter" className="mb-2 block">Filter by Section</Label>
          <div className="flex gap-2">
            <Select 
              value={selectedSection} 
              onValueChange={onSectionChange}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map(section => (
                  <SelectItem key={section} value={section}>
                    {section.charAt(0).toUpperCase() + section.slice(1).replace(/_/g, ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <SectionManager
              sections={sections}
              onAddSection={handleAddSection}
            />
          </div>
        </div>
        
        <div className="w-full md:w-auto">
          <Label htmlFor="language-filter" className="mb-2 block">Filter by Language</Label>
          <Select 
            value={selectedLanguage} 
            onValueChange={onLanguageChange}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map(lang => (
                <SelectItem key={lang} value={lang}>
                  {lang.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="ml-auto">
          <Button 
            onClick={fetchContent}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Content
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentFilter;
