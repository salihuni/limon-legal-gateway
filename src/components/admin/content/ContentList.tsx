
import React, { useState } from 'react';
import ContentItem from './ContentItem';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RefreshCw, Save, Trash2 } from 'lucide-react';
import { ContentItem as ContentItemType } from '@/lib/supabase';

interface ContentListProps {
  section: string;
  language: string;
  groupedContent: any;
  languages: string[];
  onContentChange: (section: string, key: string, lang: string, value: string) => void;
  onSaveContent: (section: string, key: string) => void;
  onDeleteContent: (section: string, key: string) => void;
  saving: boolean;
  onRenameKey?: (section: string, oldKey: string, newKey: string) => void;
  onBulkSave?: (section: string) => void;
  onRefresh: () => void;
}

const ContentList: React.FC<ContentListProps> = ({
  section,
  language,
  groupedContent,
  languages,
  onContentChange,
  onSaveContent,
  onDeleteContent,
  saving,
  onRenameKey,
  onBulkSave,
  onRefresh
}) => {
  const [confirmBulkSave, setConfirmBulkSave] = useState(false);
  const [confirmDeleteSection, setConfirmDeleteSection] = useState(false);
  
  const filterContentBySection = (section: string) => {
    if (!groupedContent[section]) return {};
    return groupedContent[section];
  };

  const filteredContent = filterContentBySection(section);
  const hasContent = Object.keys(filteredContent).length > 0;
  
  const handleRenameKey = (oldKey: string, newKey: string) => {
    if (onRenameKey) {
      onRenameKey(section, oldKey, newKey);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {section.charAt(0).toUpperCase() + section.slice(1)} Content - {language.toUpperCase()}
        </h3>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm" 
            onClick={onRefresh}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          
          {onBulkSave && (
            <Button 
              variant="default"
              size="sm"
              disabled={saving || !hasContent}
              onClick={() => setConfirmBulkSave(true)}
              className="flex items-center gap-1"
            >
              <Save className="h-4 w-4" />
              Save All
            </Button>
          )}
        </div>
      </div>
      
      {hasContent ? (
        <div className="space-y-6">
          {Object.entries(filteredContent).map(([key, langValues]) => (
            <ContentItem
              key={key}
              contentKey={key}
              langValues={langValues as Record<string, any>}
              selectedLanguage={language}
              languages={languages}
              onContentChange={(key, lang, value) => onContentChange(section, key, lang, value)}
              onSave={(key) => onSaveContent(section, key)}
              onDelete={(key) => onDeleteContent(section, key)}
              saving={saving}
              onKeyChange={handleRenameKey}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md bg-muted/30">
          <p className="text-gray-500">No content found for this section/language combination</p>
        </div>
      )}
      
      <AlertDialog open={confirmBulkSave} onOpenChange={setConfirmBulkSave}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save All Changes?</AlertDialogTitle>
            <AlertDialogDescription>
              This will save all changes made to content in the {section} section. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                if (onBulkSave) onBulkSave(section);
              }}
            >
              Save All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ContentList;
