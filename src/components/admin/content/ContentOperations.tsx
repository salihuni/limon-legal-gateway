
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
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
import { useContent } from '@/context/ContentContext';

interface ContentOperationsProps {
  section: string;
  hasContent: boolean;
}

const ContentOperations: React.FC<ContentOperationsProps> = ({
  section,
  hasContent,
}) => {
  const [confirmBulkSave, setConfirmBulkSave] = useState(false);
  const { saving, handleBulkSave } = useContent();

  return (
    <>
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
                handleBulkSave(section);
                setConfirmBulkSave(false);
              }}
            >
              Save All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ContentOperations;
