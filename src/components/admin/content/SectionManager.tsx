
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from 'lucide-react';

interface SectionManagerProps {
  sections: string[];
  onAddSection: (section: string) => void;
}

const SectionManager: React.FC<SectionManagerProps> = ({
  sections,
  onAddSection
}) => {
  const [newSection, setNewSection] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);
  
  const handleAddSection = () => {
    if (newSection) {
      onAddSection(newSection.toLowerCase().replace(/\s+/g, '_'));
      setNewSection('');
      setShowAddSection(false);
    }
  };

  return (
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
  );
};

export default SectionManager;
