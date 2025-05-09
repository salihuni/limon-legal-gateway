
import React, { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import AddContentForm from './content/AddContentForm';
import ContentList from './content/ContentList';
import ContentFilter from './content/ContentFilter';
import { ContentProvider, useContent } from '@/context/ContentContext';

const AdminContentContainer: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>('home');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const { loading, handleAddNewContent, saving } = useContent();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8 min-h-[300px]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading content...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <FileText className="mr-2 h-5 w-5 text-limon-gold" />
        <h2 className="text-2xl font-bold">Manage Website Content</h2>
      </div>
      
      <ContentFilter 
        selectedSection={selectedSection}
        selectedLanguage={selectedLanguage}
        onSectionChange={setSelectedSection}
        onLanguageChange={setSelectedLanguage}
      />
      
      <ContentList 
        section={selectedSection}
        language={selectedLanguage}
      />
      
      <AddContentForm 
        saving={saving}
      />
    </div>
  );
};

const AdminContent: React.FC = () => {
  return (
    <ContentProvider>
      <AdminContentContainer />
    </ContentProvider>
  );
};

export default AdminContent;
