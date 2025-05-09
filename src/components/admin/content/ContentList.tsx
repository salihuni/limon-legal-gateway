
import React from 'react';
import ContentItem from './ContentItem';

interface ContentListProps {
  section: string;
  language: string;
  groupedContent: any;
  languages: string[];
  onContentChange: (section: string, key: string, lang: string, value: string) => void;
  onSaveContent: (section: string, key: string) => void;
  saving: boolean;
}

const ContentList: React.FC<ContentListProps> = ({
  section,
  language,
  groupedContent,
  languages,
  onContentChange,
  onSaveContent,
  saving
}) => {
  const filterContentBySection = (section: string) => {
    if (!groupedContent[section]) return {};
    return groupedContent[section];
  };

  const filteredContent = filterContentBySection(section);
  const hasContent = Object.keys(filteredContent).length > 0;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">
        {section.charAt(0).toUpperCase() + section.slice(1)} Content - {language.toUpperCase()}
      </h3>
      
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
              saving={saving}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md">
          <p className="text-gray-500">No content found for this section/language combination</p>
        </div>
      )}
    </div>
  );
};

export default ContentList;
