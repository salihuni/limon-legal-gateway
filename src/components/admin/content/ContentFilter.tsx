
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

interface ContentFilterProps {
  sections: string[];
  languages: string[];
  selectedSection: string;
  selectedLanguage: string;
  onSectionChange: (section: string) => void;
  onLanguageChange: (language: string) => void;
  onRefresh: () => void;
}

const ContentFilter: React.FC<ContentFilterProps> = ({
  sections,
  languages,
  selectedSection,
  selectedLanguage,
  onSectionChange,
  onLanguageChange,
  onRefresh
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="w-full md:w-auto">
        <Label htmlFor="section-filter">Filter by Section</Label>
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
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-auto">
        <Label htmlFor="language-filter">Filter by Language</Label>
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

      <div className="w-full">
        <Button 
          onClick={onRefresh}
          variant="outline"
          className="mt-6"
        >
          Refresh Content
        </Button>
      </div>
    </div>
  );
};

export default ContentFilter;
