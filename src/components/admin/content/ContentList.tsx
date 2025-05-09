
import React from 'react';
import ContentItem from './ContentItem';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import ContentOperations from './ContentOperations';

interface ContentListProps {
  section: string;
  language: string;
}

const ContentList: React.FC<ContentListProps> = ({
  section,
  language,
}) => {
  const { 
    groupedContent, 
    fetchContent, 
    handleContentChange, 
    saveContent,
    deleteContent,
    saving,
    handleRenameKey
  } = useContent();
  const languages = ['en', 'tr'];
  
  const filterContentBySection = (section: string) => {
    if (!groupedContent[section]) return {};
    return groupedContent[section];
  };

  const filteredContent = filterContentBySection(section);
  const hasContent = Object.keys(filteredContent).length > 0;

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
            onClick={fetchContent}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          
          <ContentOperations 
            section={section}
            hasContent={hasContent}
          />
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
              onContentChange={(key, lang, value) => handleContentChange(section, key, lang, value)}
              onSave={(key) => saveContent(section, key)}
              onDelete={(key) => deleteContent(section, key)}
              saving={saving}
              onKeyChange={(oldKey, newKey) => handleRenameKey(section, oldKey, newKey)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md bg-muted/30">
          <p className="text-gray-500">No content found for this section/language combination</p>
        </div>
      )}
    </div>
  );
};

export default ContentList;
