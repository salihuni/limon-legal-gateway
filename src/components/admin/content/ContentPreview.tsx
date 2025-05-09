
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ContentPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  contentKey: string;
  value: string;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({
  isOpen,
  onClose,
  contentKey,
  value
}) => {
  // Function to determine if content is HTML
  const isHTML = (str: string) => {
    return /<[a-z][\s\S]*>/i.test(str);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Content Preview: {contentKey}</DialogTitle>
          <DialogDescription>
            How this content might appear on the website
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 border rounded-md p-4 bg-white">
          {isHTML(value) ? (
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: value }} />
          ) : (
            <div className="whitespace-pre-wrap">{value}</div>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
