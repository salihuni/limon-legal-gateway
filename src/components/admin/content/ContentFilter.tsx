
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus, RefreshCw } from 'lucide-react';

interface ContentFilterProps {
  sections: string[];
  languages: string[];
  selectedSection: string;
  selectedLanguage: string;
  onSectionChange: (section: string) => void;
  onLanguageChange: (language: string) => void;
  onRefresh: () => void;
  onAddSection?: (section: string) => void;
}

const ContentFilter: React.FC<ContentFilterProps> = ({
  sections,
  languages,
  selectedSection,
  selectedLanguage,
  onSectionChange,
  onLanguageChange,
  onRefresh,
  onAddSection
}) => {
  const [newSection, setNewSection] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);
  
  const handleAddSection = () => {
    if (newSection && onAddSection) {
      onAddSection(newSection.toLowerCase().replace(/\s+/g, '_'));
      setNewSection('');
      setShowAddSection(false);
    }
  };

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
            
            {onAddSection && (
              <Popover open={showAddSection} onOpenChange={setShowAddSection}>
                <PopoverTrigger asChild>
                  <Button size="icon" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Add New Section</h4>
                    <div className="flex gap-2">
                      <Input
                        value={newSection}
                        onChange={(e) => setNewSection(e.target.value)}
                        placeholder="e.g. pricing, testimonials"
                      />
                      <Button 
                        onClick={handleAddSection}
                        disabled={!newSection}
                        size="sm"
                      >
                        Add
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Section names should be lowercase with underscores for spaces.</p>
                  </div>
                </PopoverContent>
              </Popover>
            )}
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
            onClick={onRefresh}
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
