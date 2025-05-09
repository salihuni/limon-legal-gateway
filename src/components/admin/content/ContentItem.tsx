
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Save, Edit, Check, X, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
import { ContentPreview } from './ContentPreview';

interface ContentItemProps {
  contentKey: string;
  langValues: Record<string, any>;
  selectedLanguage: string;
  languages: string[];
  onContentChange: (key: string, lang: string, value: string) => void;
  onSave: (key: string) => void;
  onDelete: (key: string) => void;
  saving: boolean;
  onKeyChange?: (oldKey: string, newKey: string) => void;
}

const ContentItem: React.FC<ContentItemProps> = ({
  contentKey,
  langValues,
  selectedLanguage,
  languages,
  onContentChange,
  onSave,
  onDelete,
  saving,
  onKeyChange
}) => {
  const [isEditingKey, setIsEditingKey] = useState(false);
  const [newKey, setNewKey] = useState(contentKey);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const handleEditKey = () => {
    setIsEditingKey(true);
  };
  
  const handleSaveKey = () => {
    if (newKey && newKey !== contentKey && onKeyChange) {
      onKeyChange(contentKey, newKey);
    }
    setIsEditingKey(false);
  };
  
  const handleCancelEditKey = () => {
    setNewKey(contentKey);
    setIsEditingKey(false);
  };

  const handleDeleteConfirm = () => {
    onDelete(contentKey);
    setShowDeleteDialog(false);
  };
  
  const contentItem = langValues[selectedLanguage];
  const value = contentItem?.value || '';
  
  const isLongContent = value && value.length > 100;
  
  return (
    <>
      <Card className="mb-4 overflow-hidden">
        <div className="p-4 bg-muted/50 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            {isEditingKey ? (
              <div className="flex items-center gap-2">
                <Input 
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="w-48"
                  placeholder="Content key"
                />
                <Button size="icon" variant="ghost" onClick={handleSaveKey}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={handleCancelEditKey}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <h4 className="font-medium text-md">
                  <span className="font-bold">{contentKey}</span>
                </h4>
                {onKeyChange && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleEditKey}
                    className="h-6 w-6 p-0"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                )}
              </>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              {selectedLanguage}
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-1"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button 
              onClick={() => onSave(contentKey)}
              disabled={saving}
              size="sm"
              className="flex items-center gap-1"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
              className="flex items-center gap-1"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-4">
            {languages.filter(lang => lang === selectedLanguage).map(lang => {
              return (
                <div key={lang} className="space-y-2">
                  <Label className="capitalize">{lang}</Label>
                  {isLongContent ? (
                    <Textarea
                      value={value}
                      onChange={(e) => onContentChange(contentKey, lang, e.target.value)}
                      rows={isExpanded ? 8 : 4}
                      className="font-mono"
                    />
                  ) : (
                    <Input
                      value={value}
                      onChange={(e) => onContentChange(contentKey, lang, e.target.value)}
                    />
                  )}
                  
                  {isLongContent && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-xs"
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete the content with key "{contentKey}" in all languages. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {showPreview && (
        <ContentPreview 
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          contentKey={contentKey}
          value={value}
        />
      )}
    </>
  );
};

export default ContentItem;
